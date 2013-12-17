package marxo.controller;

import com.mongodb.WriteResult;
import marxo.entity.Task;
import marxo.entity.action.Action;
import marxo.entity.workflow.RunStatus;
import marxo.entity.workflow.Workflow;
import marxo.exception.EntityNotFoundException;
import org.bson.types.ObjectId;
import org.joda.time.DateTime;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("action{:s?}")
public class ActionController extends EntityController<Action> {
	@Override
	public Action read(@PathVariable String idString) throws Exception {
		ObjectId objectId = stringToObjectId(idString);

		Criteria criteria = Criteria
				.where("tenantId").is(user.tenantId)
				.and("_id").is(objectId);
		Action action = mongoTemplate.findOne(Query.query(criteria), entityClass);

		if (action == null) {
			throw new EntityNotFoundException(entityClass, objectId);
		}

		return action;
	}

	@RequestMapping(value = "/{idString:[\\da-fA-F]{24}}/status", method = RequestMethod.PUT)
	@ResponseBody
	@ResponseStatus(HttpStatus.OK)
	public RunStatus updateStatus(@PathVariable String idString, @RequestBody RunStatus status) throws Exception {
		ObjectId objectId = stringToObjectId(idString);

		Update update = Update.update("status", status);
		WriteResult result = mongoTemplate.updateFirst(newDefaultQuery(objectId), update, Workflow.class);
		throwIfError(result);

		if (result.getN() == 0) {
			throw new EntityNotFoundException(Workflow.class, objectId);
		}

		if (status.equals(RunStatus.FINISHED)) {
			Action action = Action.get(objectId);
			Task.reschedule(action.workflowId, DateTime.now());
		}

		return status;
	}
}
