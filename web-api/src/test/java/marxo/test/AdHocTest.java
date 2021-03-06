package marxo.test;

import com.fasterxml.jackson.core.type.TypeReference;
import marxo.entity.MongoDbAware;
import marxo.entity.action.Action;
import marxo.entity.action.Content;
import marxo.entity.action.FacebookAction;
import marxo.entity.action.TrackableAction;
import marxo.entity.node.Event;
import marxo.entity.node.Node;
import marxo.entity.user.Tenant;
import marxo.entity.user.User;
import marxo.entity.workflow.Workflow;
import marxo.serialization.MarxoObjectMapper;
import marxo.tool.Loggable;
import marxo.tool.Reflections;
import org.bson.types.ObjectId;
import org.joda.time.DateTime;
import org.joda.time.Duration;
import org.joda.time.Seconds;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Test
public class AdHocTest implements MongoDbAware, Loggable {
	@Test
	public void regex() throws Exception {
		String text = "startNodeId";
		Pattern pattern = Pattern.compile("[A-Z]");
		Matcher matcher = pattern.matcher(text);
		StringBuffer sb = new StringBuffer();
		while (matcher.find()) {
			String captured = matcher.group();
			matcher.appendReplacement(sb, "_" + captured.toLowerCase());
		}
		matcher.appendTail(sb);
		System.out.println(sb.toString());
	}

	@Test
	public void copyFields() throws Exception {
		User user = new User();
		user.tenantId = new ObjectId();
		user.setName("Tester");
		user.setEmail("test@example.com");
		user.setPassword("secret");
		Field[] fields = User.class.getFields();
		for (Field field : fields) {
			field.setAccessible(true);
			System.out.printf("'%s': '%s'\n", field.getName(), field.get(user));
		}
	}

	@Test
	public void getDurationFromTwoDateTime() throws Exception {
		DateTime time1 = DateTime.now().plus(Seconds.seconds(5).toStandardDuration());
		DateTime time2 = DateTime.now().plus(Seconds.seconds(15).toStandardDuration());
		Duration duration = new Duration(time1.getMillis(), time2.getMillis());
		Assert.assertEquals(duration.toStandardSeconds().getSeconds(), 10);
	}

	@Test
	public void dataFromJson() throws Exception {
		MarxoObjectMapper marxoObjectMapper = new MarxoObjectMapper();
		String tenantsJson = "{\"name\":\"Marxo\",\"desc\":\"Marxo dev group\",\"contact\":\"Wilson Young\",\"email\":\"wilson@gmail.com\",\"tel\":\"(408) 888-8888\",\"fax\":\"(408) 888-8888\",\"addr\":\"One Washington Square, San Jose, CA 95112\",\"created_at\":\"2013-09-05T02:18:13.621Z\",\"updated_at\":\"2013-09-05T02:18:13.621Z\"}";
		Tenant tenant = marxoObjectMapper.readValue(tenantsJson, Tenant.class);

		String usersJson = "[{\"email\":\"test@example.com\",\"password\":\"B4driGpKjDrtdKaAoA8nUmm+D2Pl3kxoF5POX0sGSk4\",\"first_name\":\"Test\",\"last_name\":\"User\",\"created_at\":\"2013-09-05T02:18:13.621Z\",\"updated_at\":\"2013-09-05T02:18:13.621Z\"},{\"email\":\"yyfearth@gmail.com\",\"password\":\"2k96H29ECsJ05BJAkEGm6FC+UgjwVTc1qOd7SGG2uS8\",\"first_name\":\"Wilson\",\"last_name\":\"Young\",\"created_at\":\"2013-09-05T02:18:13.621Z\",\"updated_at\":\"2013-09-05T02:18:13.621Z\"},{\"email\":\"otaru14204@hotmail.com\",\"password\":\"XELXdnuv/p7QeCzPM7Pl7TLfd6o2NZSaPb/sGtYUg5Q\",\"first_name\":\"Leo\",\"last_name\":\"Chu\",\"created_at\":\"2013-09-05T02:18:13.621Z\",\"updated_at\":\"2013-09-05T02:18:13.621Z\"}]";
		List<User> users = marxoObjectMapper.readValue(usersJson, new TypeReference<List<User>>() {
		});

		String workflowsJson = "[{\"id\":\"655a3dd88b20999dd786d38b\",\"name\":\"Waterfall Development\",\"key\":\"waterfall_dev\",\"desc\":\"Workflow for Waterfall Development\",\"start_node_id\":\"ec21b6896dd7a39b2e4ae470\",\"nodes\":[{\"id\":\"ec21b6896dd7a39b2e4ae470\",\"name\":\"Requirement\",\"key\":\"requirement\",\"offset\":{\"x\":24,\"y\":41.5},\"actions\":[{\"id\":\"ec21b6896dd7a39b2e4ae471\",\"context_type\":\"CREATE_PAGE\",\"name\":\"Post Page or Form\",\"key\":\"create_page\"},{\"context_type\":\"POST_FACEBOOK\",\"name\":\"Post to Facebook\",\"key\":\"post_facebook\"},{\"context_type\":\"MAKE_SCHEDULE\",\"name\":\"Make Schedule\",\"key\":\"make_schedule\"},{\"context_type\":\"GENERATE_REPORT\",\"name\":\"Generate Report\",\"key\":\"generate_report\"}],\"created_at\":\"2013-11-12T01:31:52.328Z\",\"updated_at\":\"2013-11-12T01:31:52.328Z\"},{\"id\":\"c4ebf77d7d3564cc60d322e7\",\"name\":\"Design\",\"key\":\"design\",\"offset\":{\"x\":192,\"y\":41},\"actions\":[{\"context_type\":\"CREATE_PAGE\",\"name\":\"Post Page or Form\",\"key\":\"create_page\"},{\"context_type\":\"POST_FACEBOOK\",\"name\":\"Post to Facebook\",\"key\":\"post_facebook\"},{\"context_type\":\"SEND_EMAIL\",\"name\":\"Send Email\",\"key\":\"send_email\"},{\"context_type\":\"MAKE_SCHEDULE\",\"name\":\"Make Schedule\",\"key\":\"make_schedule\",\"start_type\":\"manual\"},{\"context_type\":\"GENERATE_REPORT\",\"name\":\"Generate Report\",\"key\":\"generate_report\"}],\"created_at\":\"2013-11-12T01:49:10.224Z\",\"updated_at\":\"2013-11-12T01:49:10.224Z\"},{\"id\":\"6842887a4153d55ed1c5b228\",\"name\":\"Implementation\",\"key\":\"implementation\",\"offset\":{\"x\":338.21875,\"y\":41.5},\"actions\":[{\"context_type\":\"CREATE_PAGE\",\"name\":\"Post Page or Form\",\"key\":\"create_page\"},{\"context_type\":\"POST_FACEBOOK\",\"name\":\"Post to Facebook\",\"key\":\"post_facebook\"},{\"context_type\":\"SEND_EMAIL\",\"name\":\"Send Email\",\"key\":\"send_email\"},{\"context_type\":\"MAKE_SCHEDULE\",\"name\":\"Make Schedule\",\"key\":\"make_schedule\",\"start_type\":\"manual\"},{\"context_type\":\"GENERATE_REPORT\",\"name\":\"Generate Report\",\"key\":\"generate_report\"}],\"created_at\":\"2013-11-12T01:49:46.366Z\",\"updated_at\":\"2013-11-12T01:49:46.366Z\"},{\"id\":\"142720933a58ebd2d70110c5\",\"name\":\"Testing\",\"key\":\"testing\",\"offset\":{\"x\":669,\"y\":41},\"actions\":[{\"context_type\":\"CREATE_PAGE\",\"name\":\"Post Page or Form\",\"key\":\"create_page\"},{\"context_type\":\"POST_FACEBOOK\",\"name\":\"Post to Facebook\",\"key\":\"post_facebook\"},{\"context_type\":\"SEND_EMAIL\",\"name\":\"Send Email\",\"key\":\"send_email\"},{\"context_type\":\"MAKE_SCHEDULE\",\"name\":\"Make Schedule\",\"key\":\"make_schedule\",\"start_type\":\"manual\"},{\"context_type\":\"GENERATE_REPORT\",\"name\":\"Generate Report\",\"key\":\"generate_report\"}],\"created_at\":\"2013-11-12T01:50:13.818Z\",\"updated_at\":\"2013-11-12T01:50:13.818Z\"},{\"id\":\"4387684971cf7d8ae0e5111c\",\"name\":\"Demo\",\"key\":\"demo\",\"offset\":{\"x\":814.21875,\"y\":41.5},\"actions\":[{\"context_type\":\"CREATE_PAGE\",\"name\":\"Post Page or Form\",\"key\":\"create_page\"},{\"context_type\":\"POST_FACEBOOK\",\"name\":\"Post to Facebook\",\"key\":\"post_facebook\"},{\"context_type\":\"SEND_EMAIL\",\"name\":\"Send Email\",\"key\":\"send_email\"},{\"context_type\":\"GENERATE_REPORT\",\"name\":\"Generate Report\",\"key\":\"generate_report\"}],\"created_at\":\"2013-11-12T01:50:56.436Z\",\"updated_at\":\"2013-11-12T01:50:56.436Z\"},{\"id\":\"9ddf5927f60bed963c753283\",\"name\":\"Integration\",\"key\":\"integration\",\"offset\":{\"x\":517.5625,\"y\":41.5},\"workflow_id\":\"655a3dd88b20999dd786d38b\",\"actions\":[{\"context_type\":\"POST_FACEBOOK\",\"name\":\"Post to Facebook\",\"key\":\"post_facebook\"},{\"context_type\":\"SEND_EMAIL\",\"name\":\"Send Email\",\"key\":\"send_email\"},{\"context_type\":\"MAKE_SCHEDULE\",\"name\":\"Make Schedule\",\"key\":\"make_schedule\",\"start_type\":\"manual\"}],\"created_at\":\"2013-11-12T03:42:32.728Z\",\"updated_at\":\"2013-11-12T03:42:32.728Z\"}],\"links\":[{\"id\":\"6d1378ca0858b307cc1145d2\",\"key\":\"requirement_to_design\",\"prev_node_id\":\"ec21b6896dd7a39b2e4ae470\",\"next_node_id\":\"c4ebf77d7d3564cc60d322e7\",\"conditional\":false,\"created_at\":\"2013-11-12T01:49:16.420Z\",\"updated_at\":\"2013-11-12T01:49:16.420Z\"},{\"id\":\"e89620d9fa1a49315e7af9b9\",\"key\":\"design_to_implementation\",\"prev_node_id\":\"c4ebf77d7d3564cc60d322e7\",\"next_node_id\":\"6842887a4153d55ed1c5b228\",\"conditional\":false,\"created_at\":\"2013-11-12T01:49:50.782Z\",\"updated_at\":\"2013-11-12T01:49:50.782Z\"},{\"id\":\"59623f83efccd3d9c190a521\",\"key\":\"testing_to_demo\",\"prev_node_id\":\"142720933a58ebd2d70110c5\",\"next_node_id\":\"4387684971cf7d8ae0e5111c\",\"conditional\":false,\"created_at\":\"2013-11-12T01:51:07.066Z\",\"updated_at\":\"2013-11-12T01:51:07.066Z\"},{\"id\":\"0c97f0018cbdbd3f465d6f30\",\"workflow_id\":\"655a3dd88b20999dd786d38b\",\"key\":\"implementation_to_integration\",\"prev_node_id\":\"6842887a4153d55ed1c5b228\",\"next_node_id\":\"9ddf5927f60bed963c753283\",\"conditional\":false,\"created_at\":\"2013-11-12T03:42:36.785Z\",\"updated_at\":\"2013-11-12T03:42:36.785Z\"},{\"id\":\"6eac0542472d22acd92dc757\",\"workflow_id\":\"655a3dd88b20999dd786d38b\",\"key\":\"integration_to_testing\",\"prev_node_id\":\"9ddf5927f60bed963c753283\",\"next_node_id\":\"142720933a58ebd2d70110c5\",\"conditional\":false,\"created_at\":\"2013-11-12T03:42:43.499Z\",\"updated_at\":\"2013-11-12T03:42:43.499Z\"}],\"created_at\":\"2013-11-12T01:29:33.302Z\",\"updated_at\":\"2013-11-12T01:29:33.302Z\"},{\"id\":\"50447afb4728cb2036cf9ca0\",\"name\":\"Demo Workflow\",\"key\":\"demo_workflow\",\"desc\":\"Demo Workflow for App Dev and Logo Desgin\",\"start_node_id\":\"50447afb4728cb2036cf9cb0\",\"nodes\":[{\"id\":\"50447afb4728cb2036cf9cb0\",\"name\":\"Post Idea\",\"key\":\"post_idea\",\"desc\":\"Post project idea\",\"created_at\":\"2013-06-27T00:23:31.747Z\",\"updated_at\":\"2013-06-27T00:23:31.747Z\",\"offset\":{\"x\":26,\"y\":43},\"actions\":[{\"id\":\"50447afb4728cb2036cf9f00\",\"context_type\":\"CREATE_PAGE\"},{\"id\":\"50447afb4728cb2036cf9f01\",\"context_type\":\"POST_FACEBOOK\"},{\"id\":\"50447afb4728cb2036cf9f02\",\"context_type\":\"GENERATE_REPORT\"}]},{\"id\":\"50447afb4728cb2036cf9cb1\",\"name\":\"Post Requirements\",\"key\":\"post_requirements\",\"desc\":\"Post requirements\",\"created_at\":\"2013-06-27T00:24:55.070Z\",\"updated_at\":\"2013-06-27T00:24:55.070Z\",\"offset\":{\"x\":334,\"y\":44},\"actions\":[{\"id\":\"50447afb4728cb2036cf9f03\",\"context_type\":\"CREATE_PAGE\"},{\"id\":\"50447afb4728cb2036cf9ce4\",\"context_type\":\"POST_FACEBOOK\"},{\"id\":\"50447afb4728cb2036cf9f05\",\"context_type\":\"GENERATE_REPORT\"}]},{\"id\":\"50447afb4728cb2036cf9cb2\",\"name\":\"Cancel Notification\",\"key\":\"cancel_notification\",\"desc\":\"Cancel project for less response than expected\",\"created_at\":\"2013-06-27T00:25:58.702Z\",\"updated_at\":\"2013-06-27T00:25:58.702Z\",\"offset\":{\"x\":334,\"y\":204},\"actions\":[{\"id\":\"50447afb4728cb2036cf9f06\",\"context_type\":\"POST_FACEBOOK\"}]},{\"id\":\"50447afb4728cb2036cf9cb3\",\"name\":\"Retrieve App Submissions\",\"key\":\"retrieve_app_submissions\",\"desc\":\"Retrieve app submissions\",\"created_at\":\"2013-06-27T00:32:46.817Z\",\"updated_at\":\"2013-06-27T00:32:46.817Z\",\"offset\":{\"x\":613,\"y\":44},\"actions\":[{\"id\":\"50447afb4728cb2036cf9f07\",\"context_type\":\"CREATE_PAGE\"},{\"id\":\"50447afb4728cb2036cf9f08\",\"context_type\":\"POST_FACEBOOK\"},{\"id\":\"50447afb4728cb2036cf9f09\",\"context_type\":\"GENERATE_REPORT\"}]},{\"id\":\"50447afb4728cb2036cf9cb4\",\"name\":\"Retrieve Logo Design\",\"key\":\"retrieve_logo_design\",\"desc\":\"Retrieve logo design\",\"created_at\":\"2013-06-27T00:35:36.856Z\",\"updated_at\":\"2013-06-27T00:35:36.856Z\",\"offset\":{\"x\":629,\"y\":282},\"actions\":[{\"id\":\"50447afb4728cb2036cf9f0a\",\"context_type\":\"CREATE_PAGE\"},{\"id\":\"50447afb4728cb2036cf9f0b\",\"context_type\":\"POST_FACEBOOK\"},{\"id\":\"50447afb4728cb2036cf9f0c\",\"context_type\":\"GENERATE_REPORT\"}]},{\"id\":\"50447afb4728cb2036cf9cb5\",\"name\":\"Email to Evaluators\",\"key\":\"email_to_evaluators\",\"desc\":\"Email to evaluators\",\"created_at\":\"2013-06-27T00:36:21.950Z\",\"updated_at\":\"2013-06-27T00:36:21.950Z\",\"offset\":{\"x\":1018,\"y\":44},\"actions\":[{\"id\":\"50447afb4728cb2036cf9f0d\",\"context_type\":\"CREATE_PAGE\"},{\"id\":\"50447afb4728cb2036cf9f0e\",\"context_type\":\"SEND_EMAIL\"},{\"id\":\"50447afb4728cb2036cf9f0f\",\"context_type\":\"GENERATE_REPORT\"}]},{\"id\":\"50447afb4728cb2036cf9cb6\",\"name\":\"Post and Vote\",\"key\":\"post_and_vote\",\"desc\":\"Post and vote\",\"created_at\":\"2013-06-27T00:36:47.097Z\",\"updated_at\":\"2013-06-27T00:36:47.097Z\",\"offset\":{\"x\":1043,\"y\":282},\"actions\":[{\"id\":\"50447afb4728cb2036cf9f10\",\"context_type\":\"CREATE_PAGE\"},{\"id\":\"50447afb4728cb2036cf9f11\",\"context_type\":\"POST_FACEBOOK\"},{\"id\":\"50447afb4728cb2036cf9f12\",\"context_type\":\"GENERATE_REPORT\"}]},{\"id\":\"50447afb4728cb2036cf9cb7\",\"name\":\"Post Final Result and Reward\",\"key\":\"post_final_result_and_reward\",\"desc\":\"Post final result and reward\",\"created_at\":\"2013-06-27T00:39:04.602Z\",\"updated_at\":\"2013-06-27T00:39:04.602Z\",\"offset\":{\"x\":1420,\"y\":183},\"actions\":[{\"id\":\"50447afb4728cb2036cf9f13\",\"context_type\":\"CREATE_PAGE\"},{\"id\":\"50447afb4728cb2036cf9f14\",\"context_type\":\"POST_FACEBOOK\"},{\"id\":\"50447afb4728cb2036cf9f15\",\"context_type\":\"SEND_EMAIL\"},{\"id\":\"50447afb4728cb2036cf9f16\",\"context_type\":\"GENERATE_REPORT\"}]}],\"links\":[{\"id\":\"50447afb4728cb2036cf9cc0\",\"key\":\"10_days_likes_gte_300\",\"prev_node_id\":\"50447afb4728cb2036cf9cb0\",\"next_node_id\":\"50447afb4728cb2036cf9cb1\",\"name\":\"10 Days & Likes >= 300\",\"created_at\":\"2013-06-27T00:27:31.946Z\",\"updated_at\":\"2013-06-27T00:27:31.946Z\"},{\"id\":\"50447afb4728cb2036cf9cc1\",\"key\":\"10_days_likes_lt_300\",\"prev_node_id\":\"50447afb4728cb2036cf9cb0\",\"next_node_id\":\"50447afb4728cb2036cf9cb2\",\"name\":\"10 Days & Likes < 300\",\"created_at\":\"2013-06-27T00:28:58.636Z\",\"updated_at\":\"2013-06-27T00:28:58.636Z\"},{\"id\":\"50447afb4728cb2036cf9cc2\",\"key\":\"post_req_to_retrieve_app\",\"prev_node_id\":\"50447afb4728cb2036cf9cb1\",\"next_node_id\":\"50447afb4728cb2036cf9cb3\",\"created_at\":\"2013-06-27T00:33:01.670Z\",\"updated_at\":\"2013-06-27T00:33:01.670Z\"},{\"id\":\"50447afb4728cb2036cf9cc3\",\"key\":\"post_req_to_retrieve_logo\",\"prev_node_id\":\"50447afb4728cb2036cf9cb1\",\"next_node_id\":\"50447afb4728cb2036cf9cb4\",\"created_at\":\"2013-06-27T00:35:45.912Z\",\"updated_at\":\"2013-06-27T00:35:45.912Z\"},{\"id\":\"50447afb4728cb2036cf9cc4\",\"key\":\"retrieve_app_to_evaluate\",\"prev_node_id\":\"50447afb4728cb2036cf9cb3\",\"next_node_id\":\"50447afb4728cb2036cf9cb5\",\"name\":\"15 Days & > 80% Response\",\"created_at\":\"2013-06-27T00:37:24.163Z\",\"updated_at\":\"2013-06-27T00:37:24.163Z\"},{\"id\":\"50447afb4728cb2036cf9cc5\",\"key\":\"retrieve_logo_to_post_and_vote\",\"prev_node_id\":\"50447afb4728cb2036cf9cb4\",\"next_node_id\":\"50447afb4728cb2036cf9cb6\",\"name\":\"10 Days & Submissions >= 3\",\"created_at\":\"2013-06-27T00:37:43.706Z\",\"updated_at\":\"2013-06-27T00:37:43.706Z\"},{\"id\":\"50447afb4728cb2036cf9cc6\",\"name\":\"(fallback)\",\"key\":\"faild_to_evaluate\",\"desc\":\"Manual trigger back if failed to evaluate\",\"prev_node_id\":\"50447afb4728cb2036cf9cb5\",\"next_node_id\":\"50447afb4728cb2036cf9cb3\",\"created_at\":\"2013-06-27T00:37:51.943Z\",\"updated_at\":\"2013-06-27T00:37:51.943Z\"},{\"id\":\"50447afb4728cb2036cf9cc7\",\"name\":\"(fallback)\",\"key\":\"failed_to_vote\",\"desc\":\"Manual trigger back if failed to vote\",\"prev_node_id\":\"50447afb4728cb2036cf9cb6\",\"next_node_id\":\"50447afb4728cb2036cf9cb4\",\"created_at\":\"2013-06-27T00:38:05.360Z\",\"updated_at\":\"2013-06-27T00:38:05.360Z\"},{\"id\":\"50447afb4728cb2036cf9cc8\",\"key\":\"evaluate_to_post_final\",\"prev_node_id\":\"50447afb4728cb2036cf9cb5\",\"next_node_id\":\"50447afb4728cb2036cf9cb7\",\"created_at\":\"2013-06-27T00:39:22.841Z\",\"updated_at\":\"2013-06-27T00:39:22.841Z\"},{\"id\":\"50447afb4728cb2036cf9cc9\",\"key\":\"post_and_vote_to_post_final\",\"prev_node_id\":\"50447afb4728cb2036cf9cb6\",\"next_node_id\":\"50447afb4728cb2036cf9cb7\",\"created_at\":\"2013-06-27T00:39:26.674Z\",\"updated_at\":\"2013-06-27T00:39:26.674Z\"}],\"created_at\":\"2013-06-27T00:22:20.272Z\",\"updated_at\":\"2013-06-27T00:22:20.272Z\"},{\"id\":\"50447afb4728cb2036cf9ca1\",\"key\":\"test_wf\",\"name\":\"Test Workflow\",\"desc\":\"The test workflow\",\"created_at\":\"2013-03-21T15:22:53.649Z\",\"updated_at\":\"2013-03-21T15:22:53.649Z\",\"nodes\":[{\"id\":\"507f81413d070321728fde10\",\"key\":\"post_idea\",\"name\":\"Post Idea\",\"desc\":\"Post software project ideas\",\"workflow_id\":\"50447afb4728cb2036cf9ca1\",\"actions\":[],\"created_at\":\"2013-03-21T15:22:53.649Z\",\"updated_at\":\"2013-03-21T15:22:53.649Z\"},{\"id\":\"507f81413d070321728fde11\",\"key\":\"post_cancel\",\"name\":\"Post Cancel\",\"desc\":\"Post cancel notification\",\"workflow_id\":\"50447afb4728cb2036cf9ca1\",\"actions\":[],\"created_at\":\"2013-03-21T15:22:53.649Z\",\"updated_at\":\"2013-03-21T15:22:53.649Z\"},{\"id\":\"507f81413d070321728fde12\",\"key\":\"post_req\",\"name\":\"Post Requirement\",\"desc\":\"Post project requirement\",\"workflow_id\":\"50447afb4728cb2036cf9ca1\",\"actions\":[],\"created_at\":\"2013-03-21T15:22:53.649Z\",\"updated_at\":\"2013-03-21T15:22:53.649Z\"},{\"id\":\"507f81413d070321728fde13\",\"key\":\"submit_design\",\"name\":\"Submit Design\",\"desc\":\"Retrieve theme design submissions & e-mail to stackholders\",\"workflow_id\":\"50447afb4728cb2036cf9ca1\",\"actions\":[],\"created_at\":\"2013-03-21T15:22:53.649Z\",\"updated_at\":\"2013-03-21T15:22:53.649Z\"},{\"id\":\"507f81413d070321728fde14\",\"key\":\"notification\",\"name\":\"Notification\",\"desc\":\"Notification\",\"workflow_id\":\"50447afb4728cb2036cf9ca1\",\"actions\":[],\"created_at\":\"2013-03-21T15:22:53.649Z\",\"updated_at\":\"2013-03-21T15:22:53.649Z\"},{\"id\":\"507f81413d070321728fde15\",\"key\":\"post_result\",\"name\":\"Post Result\",\"desc\":\"Post & e-mail result everyone\",\"workflow_id\":\"50447afb4728cb2036cf9ca1\",\"actions\":[],\"created_at\":\"2013-03-21T15:22:53.649Z\",\"updated_at\":\"2013-03-21T15:22:53.649Z\"}],\"links\":[{\"id\":\"507f81413d070321728fde22\",\"key\":\"post_req_to_submit_design\",\"workflow_id\":\"50447afb4728cb2036cf9ca1\",\"prev_node_id\":\"507f81413d070321728fde12\",\"next_node_id\":\"507f81413d070321728fde13\",\"created_at\":\"2013-03-21T15:22:53.649Z\",\"updated_at\":\"2013-03-21T15:22:53.649Z\"},{\"id\":\"507f81413d070321728fde24\",\"key\":\"pass_to_post\",\"desc\":\"Post & e-mail to everyone if pass rate > 50%\",\"workflow_id\":\"50447afb4728cb2036cf9ca1\",\"prev_node_id\":\"507f81413d070321728fde13\",\"next_node_id\":\"507f81413d070321728fde15\",\"created_at\":\"2013-03-21T15:22:53.649Z\",\"updated_at\":\"2013-03-21T15:22:53.649Z\"},{\"id\":\"507f81413d070321728fde20\",\"key\":\"to_cancel\",\"name\":\"Like < 300\",\"desc\":\"Cancel if like count < 300\",\"workflow_id\":\"50447afb4728cb2036cf9ca1\",\"prev_node_id\":\"507f81413d070321728fde10\",\"next_node_id\":\"507f81413d070321728fde11\",\"created_at\":\"2013-03-21T15:22:53.649Z\",\"updated_at\":\"2013-03-21T15:22:53.649Z\"},{\"id\":\"507f81413d070321728fde21\",\"key\":\"continue_to_req\",\"name\":\"Like >= 300\",\"desc\":\"Continue to post requirement if like count >= 300\",\"workflow_id\":\"50447afb4728cb2036cf9ca1\",\"prev_node_id\":\"507f81413d070321728fde10\",\"next_node_id\":\"507f81413d070321728fde12\",\"created_at\":\"2013-03-21T15:23:22.429Z\",\"updated_at\":\"2013-03-21T15:23:22.429Z\"},{\"id\":\"507f81413d070321728fde23\",\"key\":\"not_pass_to_notify\",\"name\":\"Pass rate <= 50%\",\"desc\":\"Notification if pass rate <= 50%\",\"workflow_id\":\"50447afb4728cb2036cf9ca1\",\"prev_node_id\":\"507f81413d070321728fde13\",\"next_node_id\":\"507f81413d070321728fde14\",\"created_at\":\"2013-03-21T15:24:07.134Z\",\"updated_at\":\"2013-03-21T15:24:07.134Z\"}],\"node_ids\":[\"507f81413d070321728fde10\",\"507f81413d070321728fde11\",\"507f81413d070321728fde12\",\"507f81413d070321728fde13\",\"507f81413d070321728fde14\",\"507f81413d070321728fde15\"],\"link_ids\":[\"507f81413d070321728fde20\",\"507f81413d070321728fde21\",\"507f81413d070321728fde22\",\"507f81413d070321728fde23\",\"507f81413d070321728fde24\"]}]";
		List<Workflow> workflows = marxoObjectMapper.readValue(usersJson, new TypeReference<List<Workflow>>() {
		});

		String projectsJson = "";
		List<Workflow> projects = marxoObjectMapper.readValue(usersJson, new TypeReference<List<Workflow>>() {
		});
	}

	@Test
	public void useJsonTypeInfo() throws Exception {
		MarxoObjectMapper marxoObjectMapper = new MarxoObjectMapper();
		TrackableAction trackableAction = new FacebookAction();
		String json = marxoObjectMapper.writeValueAsString(trackableAction);
		Action action = marxoObjectMapper.readValue(json, Action.class);
		Assert.assertTrue(action instanceof TrackableAction);

		logger.info(Reflections.getObjectDump(action));
	}

	@Test
	public void printAllProperties() throws Exception {
		Properties properties = System.getProperties();
		for (Object o : properties.keySet()) {
			logger.info(String.format("[%s] : %s", o, properties.get(o)));
		}
	}

	@Test
	public void checkDataConsistency() throws Exception {

		List<Workflow> workflows = mongoTemplate.findAll(Workflow.class);

		for (Workflow workflow : workflows) {
			for (Node node : workflow.getNodes()) {
				Assert.assertEquals(node.workflowId, workflow.id);
				for (Action action : node.getActions()) {
					Assert.assertEquals(action.workflowId, workflow.id);
					Assert.assertEquals(action.getNode().workflowId, workflow.id);

					Event event = action.getEvent();
					if (event != null) {
						Assert.assertEquals(event.workflowId, workflow.id);
						Assert.assertEquals(event.getNode().workflowId, workflow.id);
						Assert.assertEquals(event.getAction().getNode().workflowId, workflow.id);
					}

					if (action instanceof TrackableAction) {
						TrackableAction trackableAction = (TrackableAction) action;

						Event trackEvent = trackableAction.getEvent();
						if (trackEvent != null) {
							Assert.assertEquals(trackEvent.workflowId, workflow.id);
							Assert.assertEquals(trackEvent.getNode().workflowId, workflow.id);
							Assert.assertEquals(trackEvent.getAction().getNode().workflowId, workflow.id);
						}

						Content content = trackableAction.getContent();
						if (content != null) {
							Assert.assertEquals(content.workflowId, workflow.id);
							Assert.assertEquals(content.getNode().workflowId, workflow.id);
							Assert.assertEquals(content.getAction().getNode().workflowId, workflow.id);
						}
					}
				}
			}
		}
	}
}
