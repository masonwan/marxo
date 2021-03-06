package marxo.entity.action;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import marxo.entity.node.Event;
import marxo.entity.node.Node;
import marxo.entity.node.NodeChildEntity;
import marxo.entity.workflow.Workflow;
import marxo.exception.Errors;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

@JsonTypeInfo(
		use = JsonTypeInfo.Id.NAME,
		include = JsonTypeInfo.As.PROPERTY,
//		defaultImpl = TrackableAction.class,
		property = "type",
		visible = true
)
@JsonSubTypes({
		@JsonSubTypes.Type(value = FacebookAction.class, name = "FACEBOOK"),
		@JsonSubTypes.Type(value = TwitterAction.class, name = "TWITTER"),
		@JsonSubTypes.Type(value = EmailAction.class, name = "EMAIL"),
		@JsonSubTypes.Type(value = PageAction.class, name = "PAGE"),
		@JsonSubTypes.Type(value = WaitAction.class, name = "WAIT"),
		@JsonSubTypes.Type(value = TriggerAction.class, name = "TRIGGER"),
})
@Document(collection = "action")
public abstract class Action extends NodeChildEntity {

	/*
	Type
	 */

	public static enum Type {
		DEFAULT,
		FACEBOOK,
		TWITTER,
		EMAIL,
		PAGE,
		WAIT,
		TRIGGER,
	}

	Type type = Type.DEFAULT;

	public Type getType() {
		return type;
	}

	@Override
	public void wire() {
		if (content != null) {
			content.setAction(this);
		}
		if (event != null) {
			event.setAction(this);
		}
		super.wire();
	}

	/*
	Next action
	 */

	public ObjectId nextActionId;

	@Transient
	@JsonIgnore
	protected Action nextAction;

	public Action getNextAction() {
		if (nextActionId == null) {
			return nextAction = null;
		}
		return (nextAction == null) ? (nextAction = mongoTemplate.findById(nextActionId, Action.class)) : nextAction;
	}

	public void setNextAction(Action nextAction) {
		this.nextAction = nextAction;
		this.nextActionId = nextAction.id;
	}

	/*
	Event
	 */

	@DBRef
	@JsonProperty("event")  // For some reason, this must be declared in order to be parsed by ObjectMapper.
	protected Event event;

	public Event getEvent() {
		return event;
	}

	public void setEvent(Event event) {
		this.event = event;
		if (event != null) {
			event.setAction(this);
		}
	}

	/*
	Content
	 */

	@DBRef
	protected Content content;

	public Content getContent() {
		return content;
	}

	public void setContent(Content content) {
		this.content = content;
		if (content != null) {
			content.setAction(this);
		}
	}

	/*
	Error
	 */

	public Errors errors = new Errors();

	/**
	 * @return whether it should continue.
	 */
	public abstract boolean act(Workflow workflow, Node node);

	@Override
	public boolean validate(Errors errors) {
		if (nodeId == null) {
			errors.add(String.format("%s [%s] has no node", this, id));
		}

		return super.validate(errors);
	}

	/*
	DAO
	 */

	@Override
	public void save() {
		super.save();
		if (event != null) {
			event.save();
		}
		if (content != null) {
			content.save();
		}
	}

	@Override
	public void remove() {
		if (content != null) {
			content.remove();
		}
		if (event != null) {
			event.remove();
		}

		super.remove();
	}

	public static Action get(ObjectId id) {
		return mongoTemplate.findById(id, Action.class);
	}

	public static void remove(ObjectId id) {
		mongoTemplate.findAndRemove(Query.query(Criteria.where("_id").is(id)), Action.class);
	}

	public static List<Action> get(List<ObjectId> actionIds) {
		return mongoTemplate.find(Query.query(Criteria.where("_id").in(actionIds)), Action.class);
	}
}
