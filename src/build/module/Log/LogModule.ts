
import {AbstractModule} from "../AbstractModule";
import {LogModuleInterface} from "./LogModuleInterface";

export class LogModule extends AbstractModule implements LogModuleInterface
{
	private chalk: any;

	public error(message: string): this
	{
		let prefix = this.getLogPrefix();
		let chalk = this.getChalk();
		global.console.log(prefix + chalk.red(message));
		return this;
	}

	public info(message: string): this
	{
		let prefix = this.getLogPrefix();
		let chalk = this.getChalk();
		global.console.log(prefix + chalk.blue(message));
		return this;
	}

	public success(message: string): this
	{
		let prefix = this.getLogPrefix();
		let chalk = this.getChalk();
		global.console.log(prefix + chalk.green(message));
		return this;
	}

	public warning(message: string): this
	{
		let prefix = this.getLogPrefix();
		let chalk = this.getChalk();
		global.console.log(prefix + chalk.yellow(message));
		return this;
	}

	public getLogPrefix()
	{
		let chalk = this.getChalk();
		let date = new Date();
		let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
		let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
		let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

		let timeString = hours + ':'
			+ minutes + ':'
			+ seconds;

		return chalk.white('[') + chalk.grey(timeString) + chalk.white('] ');
	}

	private getChalk(): any
	{
		if (!this.chalk)
		{
			this.chalk = require('chalk');
		}

		return this.chalk;
	}
}