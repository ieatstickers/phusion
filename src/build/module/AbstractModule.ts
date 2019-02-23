import {ModuleContainer} from "./ModuleContainer";

export abstract class AbstractModule
{
	protected moduleContainer: ModuleContainer;

	public constructor(moduleContainer: ModuleContainer)
	{
		this.moduleContainer = moduleContainer;
	}

	protected getModuleContainer(): ModuleContainer
	{
		return this.moduleContainer;
	}

}