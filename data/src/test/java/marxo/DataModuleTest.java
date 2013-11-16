package marxo;

import marxo.dao.TenantDao;
import marxo.dao.WorkflowDao;
import marxo.dev.AdvancedGenerator;
import marxo.entity.*;
import org.joda.time.DateTime;
import org.joda.time.Duration;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.testng.annotations.Test;

import java.util.List;

public class DataModuleTest {
	@Test
	public void canGenerateSampleData() throws Exception {
		AdvancedGenerator.main(new String[0]);
		ApplicationContext applicationContext = new ClassPathXmlApplicationContext("mongo-configuration.xml");
		MongoTemplate mongoTemplate = applicationContext.getBean(MongoTemplate.class);
		assert mongoTemplate.getDb().getName().toLowerCase().equals("marxo");

		Class[] classes = new Class[]{
				Tenant.class,
				User.class,
				Workflow.class,
				Node.class,
				Link.class,
		};

		for (Class aClass : classes) {
			List<Class> list = mongoTemplate.findAll(aClass);
			long count = list.size();
			String message = "Collection " + aClass + " has only " + count + " record(s)";
			assert count >= 2 : message;
			System.out.println(message);
		}
	}

	@Test
	public void testPrefixCriteria() throws Exception {
		ApplicationContext applicationContext = new ClassPathXmlApplicationContext("classpath*:mongo-configuration.xml");
		MongoTemplate mongoTemplate = (MongoTemplate) applicationContext.getBean("mongoTemplate");
		List<Workflow> workflows = mongoTemplate.find(Query.query(new Criteria()), Workflow.class);
		System.out.println(workflows);
		assert workflows != null;
	}

	@Test
	public void testAutowired() throws Exception {
		ApplicationContext applicationContext = new ClassPathXmlApplicationContext("mongo-configuration.xml");
		MongoTemplate mongoTemplate = applicationContext.getBean(MongoTemplate.class);
		TenantDao tenantDao = new TenantDao();
		List<Tenant> tenants = tenantDao.find();
		WorkflowDao workflowDao = new WorkflowDao(tenants.get(0).id);
		List<Workflow> workflows = workflowDao.find();
		assert workflowDao.count() != 0;
	}

	@Test
	public void testJodaTime() throws Exception {
		DateTime dateTime1 = new DateTime("2013-11-09");
		DateTime dateTime2 = new DateTime("2013-11-10");
		Duration duration = new Duration(dateTime1.getMillis(), dateTime2.getMillis());
		System.out.println(duration);
	}

	@Test
	public void testChainedQuery() throws Exception {
		ApplicationContext applicationContext = new ClassPathXmlApplicationContext("mongo-configuration.xml");
		MongoTemplate mongoTemplate = applicationContext.getBean(MongoTemplate.class);
		Criteria criteria = Criteria.where("name").regex(".*").and("isProject").is(true).and("id").regex("\\d");
		List<Workflow> workflows = mongoTemplate.find(Query.query(criteria), Workflow.class);
	}
}