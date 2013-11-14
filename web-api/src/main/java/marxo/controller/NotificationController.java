package marxo.controller;

import marxo.dao.NotificationDao;
import marxo.entity.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("notification{:s?}")
public class NotificationController extends TenantChildController<Notification> {
	@Override
	public void preHandle() {
		super.preHandle();
		dao = new NotificationDao(user.tenantId);
	}
}
