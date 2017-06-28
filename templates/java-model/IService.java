package {{packageName}}.service;

import java.util.List;

import {{packageName}}.{{modelName}};

public interface I{{modelName}}Service {

	List<{{modelName}}> get{{modelName}}s();
	void save{{modelName}}({{modelName}} {{lowerModelName}});

}
