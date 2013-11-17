package marxo.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Tenant extends BasicEntity {
	public String contact;
	public String email;
	@JsonProperty("tel")
	public String phoneNumber;
	public String fax;
	public String address;
	public FacebookData facebookData;
}
