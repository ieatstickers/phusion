
import {UserAgentInterface} from "./Entity/UserAgentInterface";

export interface EnvironmentModuleInterface
{
	getDomain(): string;
	getEnv(): string;
	isDev(): boolean;
	isProd(): boolean;
	getUserAgent(): UserAgentInterface;
}
