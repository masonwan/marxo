package marxo.entity.node;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.restfb.DefaultFacebookClient;
import com.restfb.FacebookClient;
import com.restfb.Parameter;
import com.restfb.exception.FacebookException;
import com.restfb.types.FacebookType;
import marxo.entity.FacebookStatus;
import marxo.entity.content.FacebookContent;
import marxo.entity.workflow.RunStatus;
import marxo.validation.Errors;
import org.springframework.data.annotation.Transient;

@JsonIgnoreProperties(value = {"tenantDao", "contentDao"})
public class PostFacebook extends Action {
	@Transient
	protected FacebookContent content;

	@Override
	public FacebookContent getContent() {
		return (content == null) ? (content = (FacebookContent) super.getContent()) : content;
	}

	@Override
	public boolean act() {
		try {
			FacebookClient facebookClient = new DefaultFacebookClient(getTenant().facebookData.accessToken);
			getContent().publishMessageResponse = facebookClient.publish("me/feed", FacebookType.class, Parameter.with("message", getContent().message));
			content.postId = content.publishMessageResponse.getId();
			logger.debug(String.format("Submit Facebook post [%s]", content.publishMessageResponse));
		} catch (FacebookException e) {
			logger.debug(String.format("[%s] %s", e.getClass().getSimpleName(), e.getMessage()));
			content.errorMessage = e.getMessage();
			// todo: put a notification under the tenant domain.pa
			return false;
		} finally {
			content.save();
		}

		status = RunStatus.FINISHED;

		return super.act();
	}

	@Override
	public boolean validate(Errors errors) {
		if (tenantId == null) {
			errors.add(String.format("%s [%s] has no tenant", this, id));
		}

		if (getTenant().facebookData == null) {
			errors.add(String.format("%s [%s] has no tenant", this, id));
		}

		if (getTenant().facebookData.status == FacebookStatus.DISCONNTECTED) {
			errors.add(String.format("%s Tenant [%s] has no Facebook access", this, getTenant()));
		}

		return super.validate(errors);
	}
}
