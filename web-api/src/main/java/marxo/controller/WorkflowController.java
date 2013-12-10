package marxo.controller;

import com.google.common.base.Strings;
import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;
import marxo.entity.Task;
import marxo.entity.link.Link;
import marxo.entity.node.Node;
import marxo.entity.workflow.Workflow;
import marxo.entity.workflow.WorkflowChildEntity;
import marxo.entity.workflow.WorkflowPredicate;
import marxo.exception.EntityInvalidException;
import marxo.exception.EntityNotFoundException;
import marxo.exception.ValidationException;
import marxo.tool.StringTool;
import org.bson.types.ObjectId;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;
import java.util.regex.Pattern;

@SuppressWarnings("ALL")
@Controller
@RequestMapping("workflow{:s?}")
public class WorkflowController extends TenantChildController<Workflow> {
	@Autowired
	NodeController nodeController;
	@Autowired
	LinkController linkController;

	@Override
	public void preHandle() {
		super.preHandle();
		criteria.and("isProject").is(isProject());
	}

	protected boolean isProject() {
		return false;
	}

	@Override
	public Workflow read(@PathVariable String idString) throws Exception {
		Workflow workflow = super.read(idString);

		Criteria subCriteria = Criteria.where("workflowId").is(workflow.id).and("tenantId").is(user.tenantId);
		List<Node> nodes = mongoTemplate.find(Query.query(subCriteria), Node.class);
		List<Link> links = mongoTemplate.find(Query.query(subCriteria), Link.class);
		WorkflowPredicate<WorkflowChildEntity> workflowPredicate = new WorkflowPredicate<>(workflow.id);
		Iterable<Node> workflowNodes = Iterables.filter(nodes, workflowPredicate);
		workflow.setNodes(Lists.newArrayList(workflowNodes));
		Iterable<Link> workflowLinks = Iterables.filter(links, workflowPredicate);
		workflow.setLinks(Lists.newArrayList(workflowLinks));

		return workflow;
	}

	@Override
	public Workflow update(@Valid @PathVariable String idString, @Valid @RequestBody Workflow workflow) throws Exception {
		ObjectId objectId = stringToObjectId(idString);

		Workflow oldWorkflow = mongoTemplate.findById(objectId, entityClass);
		if (oldWorkflow == null) {
			throw new EntityNotFoundException(entityClass, objectId);
		}

		if (!oldWorkflow.status.equals(workflow.status)) {
			switch (workflow.status) {
				case STARTED:
					Task task = new Task(workflow.id);
					task.save();
					break;
				case PAUSED:
				case STOPPED:
					mongoTemplate.remove(Query.query(Criteria.where("workflowId").is(workflow.id)), Task.class);
					logger.debug(String.format("%s is %s. Remove all associated tasks", workflow, workflow.status));
					break;
				case IDLE:
				case FINISHED:
				case ERROR:
				case WAITING:
				case MONITORING:
					throw new IllegalArgumentException(String.format("You cannot change a project's status to %s", workflow.status));
			}

			try {
				workflow.id = oldWorkflow.id;
				workflow.createUserId = oldWorkflow.createUserId;
				workflow.createTime = oldWorkflow.createTime;
				workflow.updateUserId = user.id;
				workflow.updateTime = DateTime.now();
				workflow.save();
			} catch (ValidationException ex) {
				for (int i = 0; i < ex.reasons.size(); i++) {
					logger.error(ex.reasons.get(i));
				}
				throw new EntityInvalidException(objectId, ex.reasons);
			}
		}

		return workflow;
	}

	/*
	Sub-resources
	 */

	private void setSubResourceCriteria(Criteria criteria) {
		Criteria criteria1 = Criteria.where("tenantId").is(user.tenantId);
		Criteria criteria2 = Criteria.where("tenantId").exists(false);
		criteria.orOperator(criteria1, criteria2);
	}

	/*
	Node
	 */

	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	@ResponseStatus(HttpStatus.OK)
	// todo: implemented created and modified search APIs
	public List<Workflow> search() {
		String name = request.getParameter("name");
		boolean hasName = !Strings.isNullOrEmpty(name);

		List<Workflow> workflows;

		if (hasName) {
			String escapedName = StringTool.escapePatternCharacters(name);
			Pattern pattern = Pattern.compile(".*" + escapedName + ".*", Pattern.CASE_INSENSITIVE);
			criteria.and("name").regex(pattern);
		}

		workflows = mongoTemplate.find(getDefaultQuery(criteria).with(defaultSort), entityClass);

		return workflows;
	}

	@RequestMapping(value = "/{workflowIdString:[\\da-fA-F]{24}}/node{:s?}", method = RequestMethod.GET)
	@ResponseBody
	@ResponseStatus(HttpStatus.OK)
	public List<Node> readAllNodes(@PathVariable String workflowIdString) throws Exception {
		ObjectId workflowId = new ObjectId(workflowIdString);

		Criteria criteria = Criteria.where("workflowId").is(workflowId);
		setSubResourceCriteria(criteria);
		nodeController.criteria = criteria;

		return nodeController.search();
	}

	@RequestMapping(value = "/{workflowIdString:[\\da-fA-F]{24}}/node{:s?}", method = RequestMethod.POST)
	@ResponseBody
	@ResponseStatus(HttpStatus.CREATED)
	public Node createNode(@PathVariable String workflowIdString, @Valid @RequestBody Node node, HttpServletResponse response) throws Exception {
		Assert.isTrue(node.workflowId.equals(new ObjectId(workflowIdString)));

		ObjectId workflowId = new ObjectId(workflowIdString);

		Criteria criteria = Criteria.where("workflowId").is(workflowId);
		setSubResourceCriteria(criteria);
		nodeController.criteria = criteria;

		return nodeController.create(node, response);
	}

	@RequestMapping(value = "/{workflowIdString:[\\da-fA-F]{24}}/node{:s?}/{nodeIdString:[\\da-fA-F]{24}}", method = RequestMethod.GET)
	@ResponseBody
	@ResponseStatus(HttpStatus.OK)
	public Node readNode(@PathVariable String workflowIdString, @PathVariable String nodeIdString) throws Exception {
		ObjectId workflowId = new ObjectId(workflowIdString);

		Criteria criteria = Criteria.where("workflowId").is(workflowId);
		setSubResourceCriteria(criteria);
		nodeController.criteria = criteria;

		return nodeController.read(nodeIdString);
	}

	@RequestMapping(value = "/{workflowIdString:[\\da-fA-F]{24}}/node{:s?}/{nodeIdString:[\\da-fA-F]{24}}", method = RequestMethod.PUT)
	@ResponseBody
	@ResponseStatus(HttpStatus.OK)
	public Node updateNode(@PathVariable String workflowIdString, @PathVariable String nodeIdString, @Valid @RequestBody Node node) throws Exception {
		Assert.isTrue(node.workflowId.equals(new ObjectId(workflowIdString)));

		ObjectId workflowId = new ObjectId(workflowIdString);

		Criteria criteria = Criteria.where("workflowId").is(workflowId);
		setSubResourceCriteria(criteria);
		nodeController.criteria = criteria;

		return nodeController.update(nodeIdString, node);
	}

	@RequestMapping(value = "/{workflowIdString:[\\da-fA-F]{24}}/node{:s?}/{nodeIdString:[\\da-fA-F]{24}}", method = RequestMethod.DELETE)
	@ResponseBody
	@ResponseStatus(HttpStatus.OK)
	public Node deleteNode(@PathVariable String workflowIdString, @PathVariable String nodeIdString) throws Exception {
		ObjectId workflowId = new ObjectId(workflowIdString);

		Criteria criteria = Criteria.where("workflowId").is(workflowId);
		setSubResourceCriteria(criteria);
		nodeController.criteria = criteria;

		return nodeController.delete(nodeIdString);
	}

	/*
	Link
	 */

	@RequestMapping(value = "/{workflowIdString:[\\da-fA-F]{24}}/link{:s?}", method = RequestMethod.GET)
	@ResponseBody
	@ResponseStatus(HttpStatus.OK)
	public List<Link> readAllLinks(@PathVariable String workflowIdString) throws Exception {
		ObjectId workflowId = new ObjectId(workflowIdString);

		Criteria criteria = Criteria.where("workflowId").is(workflowId);
		setSubResourceCriteria(criteria);
		linkController.criteria = criteria;

		return linkController.search();
	}

	@RequestMapping(value = "/{workflowIdString:[\\da-fA-F]{24}}/link{:s?}", method = RequestMethod.POST)
	@ResponseBody
	@ResponseStatus(HttpStatus.CREATED)
	public Link createLink(@PathVariable String workflowIdString, @Valid @RequestBody Link link, HttpServletResponse response) throws Exception {
		Assert.isTrue(link.workflowId.equals(new ObjectId(workflowIdString)));

		ObjectId workflowId = new ObjectId(workflowIdString);

		Criteria criteria = Criteria.where("workflowId").is(workflowId);
		setSubResourceCriteria(criteria);
		linkController.criteria = criteria;
		link = linkController.create(link, response);

		return link;
	}

	@RequestMapping(value = "/{workflowIdString:[\\da-fA-F]{24}}/link{:s?}/{linkIdString:[\\da-fA-F]{24}}", method = RequestMethod.GET)
	@ResponseBody
	@ResponseStatus(HttpStatus.OK)
	public Link readLink(@PathVariable String workflowIdString, @PathVariable String linkIdString) throws Exception {
		ObjectId workflowId = new ObjectId(workflowIdString);

		Criteria criteria = Criteria.where("workflowId").is(workflowId);
		setSubResourceCriteria(criteria);
		linkController.criteria = criteria;

		return linkController.read(linkIdString);
	}

	@RequestMapping(value = "/{workflowIdString:[\\da-fA-F]{24}}/link{:s?}/{linkIdString:[\\da-fA-F]{24}}", method = RequestMethod.PUT)
	@ResponseBody
	@ResponseStatus(HttpStatus.OK)
	public Link updateLink(@PathVariable String workflowIdString, @PathVariable String linkIdString, @Valid @RequestBody Link link) throws Exception {
		Assert.isTrue(link.workflowId.equals(new ObjectId(workflowIdString)));

		ObjectId workflowId = new ObjectId(workflowIdString);

		Criteria criteria = Criteria.where("workflowId").is(workflowId);
		setSubResourceCriteria(criteria);
		linkController.criteria = criteria;

		return linkController.update(linkIdString, link);
	}

	@RequestMapping(value = "/{workflowIdString:[\\da-fA-F]{24}}/link{:s?}/{linkIdString:[\\da-fA-F]{24}}", method = RequestMethod.DELETE)
	@ResponseBody
	@ResponseStatus(HttpStatus.OK)
	public Link deleteLink(@PathVariable String workflowIdString, @PathVariable String linkIdString) throws Exception {
		ObjectId workflowId = new ObjectId(workflowIdString);

		Criteria criteria = Criteria.where("workflowId").is(workflowId);
		setSubResourceCriteria(criteria);
		linkController.criteria = criteria;

		return linkController.delete(linkIdString);
	}
}