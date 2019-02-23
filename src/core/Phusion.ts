
import {ConfigModule} from "./module/Config/ConfigModule";
import {ConfigModuleInterface} from "./module/Config/ConfigModuleInterface";
import {PhusionInterface} from "./PhusionInterface";
import {HttpModuleInterface} from "./module/Http/HttpModuleInterface";
import {HttpModule} from "./module/Http/HttpModule";
import {LocalStorageModuleInterface} from "./module/LocalStorage/LocalStorageModuleInterface";
import {LocalStorageModule} from "./module/LocalStorage/LocalStorageModule";
import {EventModuleInterface} from "./module/Event/EventModuleInterface";
import {EventModule} from "./module/Event/EventModule";
import {CookieModuleInterface} from "./module/Cookie/CookieModuleInterface";
import {CookieModule} from "./module/Cookie/CookieModule";
import {EnvironmentModuleInterface} from "./module/Environment/EnvironmentModuleInterface";
import {EnvironmentModule} from "./module/Environment/EnvironmentModule";
import {SessionStorageModule} from "./module/SessionStorage/SessionStorageModule";
import {SessionStorageModuleInterface} from "./module/SessionStorage/SessionStorageModuleInterface";
import {Config} from "./module/Config/Entity/Config";

export class Phusion implements PhusionInterface
{
	protected app: any;
	protected applicationConfigObject: Object = {};
	protected configModule;
	protected cookieModule;
	protected environmentModule;
	protected eventModule;
	protected httpModule;
	protected localStorageModule;
	protected sessionStorageModule;

	public constructor(applicationConfig: Object = {})
	{
		this.applicationConfigObject = applicationConfig;
	}

	public getApp(): any
	{
		return this.app;
	}

	public setApp(app: any): this
	{
		this.app = app;

		return this;
	}

	public getConfig(): Config
	{
		return this.getConfigModule().getConfig();
	}

	public getConfigModule(): ConfigModuleInterface
	{
		if (!this.configModule)
		{
			this.configModule = new ConfigModule(this.applicationConfigObject, this);
		}

		return this.configModule;
	}

	public getCookieModule(): CookieModuleInterface
	{
		if (!this.cookieModule)
		{
			this.cookieModule = new CookieModule(this);
		}

		return this.cookieModule;
	}

	public getEnvironmentModule(): EnvironmentModuleInterface
	{
		if (!this.environmentModule)
		{
			this.environmentModule = new EnvironmentModule(this);
		}

		return this.environmentModule;
	}

	public getEventModule(): EventModuleInterface
	{
		if (!this.eventModule)
		{
			this.eventModule = new EventModule(this);
		}

		return this.eventModule;
	}

	public getHttpModule(): HttpModuleInterface
	{
		if (!this.httpModule)
		{
			this.httpModule = new HttpModule(this);
		}

		return this.httpModule;
	}

	public getLocalStorageModule(): LocalStorageModuleInterface
	{
		if (!this.localStorageModule)
		{
			this.localStorageModule = new LocalStorageModule(this);
		}

		return this.localStorageModule;
	}

	public getSessionStorageModule(): SessionStorageModuleInterface
	{
		if (!this.sessionStorageModule)
		{
			this.sessionStorageModule = new SessionStorageModule(this);
		}

		return this.sessionStorageModule;
	}
}
