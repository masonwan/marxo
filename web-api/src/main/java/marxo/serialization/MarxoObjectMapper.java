package marxo.serialization;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.bson.types.ObjectId;

import java.util.Date;

public class MarxoObjectMapper extends ObjectMapper {
	public MarxoObjectMapper() {
		super();
		SimpleModule simpleModule = new SimpleModule();

		simpleModule.addSerializer(ObjectId.class, new ObjectIdSerializer());
		simpleModule.addDeserializer(ObjectId.class, new ObjectIdDeserializer());

		simpleModule.addSerializer(Date.class, new DateSerializer());

		registerModule(simpleModule);
	}
}
