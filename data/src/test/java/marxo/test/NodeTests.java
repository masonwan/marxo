package marxo.test;

import marxo.entity.action.Action;
import marxo.entity.action.PostFacebookAction;
import marxo.entity.node.Node;
import marxo.entity.user.Tenant;
import org.bson.types.ObjectId;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.util.Map;

@SuppressWarnings({"uncheck", "unchecked"})
public class NodeTests extends BasicDataTests {
	@Test
	public void wireNode() throws Exception {
		Node node = new Node();
		Action action1 = new PostFacebookAction();
		Action action2 = new PostFacebookAction();
		node.addAction(action1);
		node.addAction(action2);

		Assert.assertEquals(node.getActions().size(), 2);

		Assert.assertEquals(node.getCurrentActionId(), action1.id);
		Assert.assertEquals(node.getCurrentAction().getNextAction().id, action2.id);
	}

	@Test
	public void nodeWire() throws Exception {
		Tenant tenant = new Tenant();

		Node node = new Node();
		node.setTenant(tenant);

		Action action1 = new PostFacebookAction();
		node.addAction(action1);

		Action action2 = new PostFacebookAction();
		node.addAction(action2);

		Action action3 = new PostFacebookAction();
		node.addAction(action3);

		insertEntities(
				tenant,
				node
		);

		node = Node.get(node.id);

		Assert.assertNotNull(node.getCurrentAction());
		Assert.assertEquals(node.getCurrentAction().id, action1.id);

		Assert.assertEquals(node.getCurrentAction().getNextAction().id, action2.id);
		Assert.assertEquals(node.getCurrentAction().getNextAction().getNextAction().id, action3.id);
		Assert.assertNull(node.getCurrentAction().getNextAction().getNextAction().getNextAction());

		Map<ObjectId, Action> actionMap = node.getActionMap();
		Assert.assertNotNull(actionMap);
		Assert.assertEquals(actionMap.size(), 3);

		for (Action action : node.getActions()) {
			Assert.assertEquals(action.tenantId, tenant.id);
		}
	}
}
