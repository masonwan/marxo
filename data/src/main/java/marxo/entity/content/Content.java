package marxo.entity.content;

import marxo.entity.action.ActionChildEntity;
import marxo.exception.Errors;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "content")
public class Content extends ActionChildEntity {
	public Errors errors = new Errors();
	/*
	DAO
	 */

	public static Content get(ObjectId id) {
		return mongoTemplate.findById(id, Content.class);
	}
}
