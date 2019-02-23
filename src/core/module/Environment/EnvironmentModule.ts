
import {EnvironmentModuleInterface} from "./EnvironmentModuleInterface";
import {AbstractModule} from "../AbstractModule";
import {UserAgentInterface} from "./Entity/UserAgentInterface";
import {UserAgent} from "./Entity/UserAgent";

export class EnvironmentModule extends AbstractModule implements EnvironmentModuleInterface
{
	private environment: string;
	private userAgent: UserAgentInterface;
	private userAgentParserObject: any;

	public getDomain(): string
	{
		let url = window.location.hostname;
		let match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
		if (
			   match != null
			&& match.length > 2
			&& typeof match[2] === 'string'
			&& match[2].length > 0
		)
		{
			return match[2];
		}
		else {
			return url;
		}
	}

	public getEnv(): string
	{
		if (!this.environment)
		{
			let envString = this
				.getPhusion()
				.getConfig()
				.getByPath('phusion:module:environment:env');

			this.environment = envString;
		}

		return this.environment;
	}

	public getUserAgent(): UserAgentInterface
	{
		if (!this.userAgent)
		{
			let userAgentParserObject = this.getUserAgentParserObject();

			this.userAgent = new UserAgent(
				userAgentParserObject['browser']['name'],
				parseInt(userAgentParserObject['browser']['major']),
				userAgentParserObject['os']['name'] ? userAgentParserObject['os']['name'] : null,
				userAgentParserObject['os']['version'] ? parseFloat(userAgentParserObject['os']['version']) : null
			);
		}

		return this.userAgent;
	}

	public isDev(): boolean
	{
		return (this.getEnv() == 'dev');
	}

	public isProd(): boolean
	{
		return (this.getEnv() == 'prod');
	}

	private getUserAgentParserObject(): any
	{
		if (!this.userAgentParserObject)
		{
			let userAgentString = navigator.userAgent;
			let userAgentParser = require('user-agent-parser');
			this.userAgentParserObject = userAgentParser(userAgentString);
		}

		return this.userAgentParserObject;
	}
}
