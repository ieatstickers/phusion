
import {ConfigModuleInterface} from "./module/Config/ConfigModuleInterface";
import {HttpModuleInterface} from "./module/Http/HttpModuleInterface";
import {LocalStorageModuleInterface} from "./module/LocalStorage/LocalStorageModuleInterface";
import {EventModuleInterface} from "./module/Event/EventModuleInterface";
import {CookieModuleInterface} from "./module/Cookie/CookieModuleInterface";
import {EnvironmentModuleInterface} from "./module/Environment/EnvironmentModuleInterface";
import {SessionStorageModuleInterface} from "./module/SessionStorage/SessionStorageModuleInterface";
import {Config} from "./module/Config/Entity/Config";

export interface PhusionInterface
{
	getApp(): any;
	setApp(app: any): this;
	getConfig(): Config;
	getConfigModule(): ConfigModuleInterface;
	getCookieModule(): CookieModuleInterface;
	getEnvironmentModule(): EnvironmentModuleInterface;
	getEventModule(): EventModuleInterface
	getHttpModule(): HttpModuleInterface;
	getLocalStorageModule(): LocalStorageModuleInterface;
	getSessionStorageModule(): SessionStorageModuleInterface;
}
