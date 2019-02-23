
import {ConfigModuleInterface} from "./Config/ConfigModuleInterface";
import {FileSystemModuleInterface} from "./FileSystem/FileSystemModuleInterface";
import {LogModuleInterface} from "./Log/LogModuleInterface";
import {ConfigModule} from "./Config/ConfigModule";
import {FileSystemModule} from "./FileSystem/FileSystemModule";
import {LogModule} from "./Log/LogModule";

export class ModuleContainer
{
	protected configModule: ConfigModuleInterface;
	protected fileSystemModule: FileSystemModuleInterface;
	protected logModule: LogModuleInterface;

	public getConfigModule(): ConfigModuleInterface
	{
		if (!this.configModule)
		{
			this.configModule = new ConfigModule(this);
		}

		return this.configModule;
	}

	public getFileSystemModule(): FileSystemModuleInterface
	{
		if (!this.fileSystemModule)
		{
			this.fileSystemModule = new FileSystemModule(this);
		}

		return this.fileSystemModule;
	}

	public getLogModule(): LogModuleInterface
	{
		if (!this.logModule)
		{
			this.logModule = new LogModule(this);
		}

		return this.logModule;
	}
}