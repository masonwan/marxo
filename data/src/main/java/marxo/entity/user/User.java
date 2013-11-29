package marxo.entity.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.bson.types.ObjectId;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

/**
 * Note that it implements Serializable since it seems that Spring Security will serialize it. And it pops out warning even it's fully serializable without the interface.
 */
public class User extends TenantChildEntity implements Serializable {
	public final static Pattern emailPattern = Pattern.compile("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
	@JsonIgnore
	protected String password;
	protected String email;
	public UserType type = UserType.UNKNOWN;
	@JsonProperty("oauth")
	public Map<String, String> oAuthData = new HashMap<>();

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
		this.key = email;
	}

	public boolean checkPassword(String password) {
		return this.password.equals(password);
	}

	public static User get(ObjectId id) {
		return mongoTemplate.findById(id, User.class);
	}
}