package {{packageName}};

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import {{packageName}}.{{modelName}};

@Controller
@Path("/{{lowerModelName}}")
@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
public class {{modelName}}Controller {

	@Autowired
	private I{{modelName}}Service {{lowerModelName}}Service;

}