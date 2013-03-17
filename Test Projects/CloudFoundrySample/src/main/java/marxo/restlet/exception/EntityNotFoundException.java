package marxo.restlet.exception;

import marxo.restlet.RestletException;

import javax.ws.rs.core.Response;

public class EntityNotFoundException extends RestletException {
	public EntityNotFoundException() {
		errorType = "EntityNotFound";
		status = Response.Status.NOT_FOUND;
	}
}