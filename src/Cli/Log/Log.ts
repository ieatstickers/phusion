
export class Log
{
	private static chalk: any;

	public static error(message: string)
	{
		let prefix = this.getLogPrefix();
		let chalk = this.getChalk();
		global.console.log(prefix + chalk.red(message));
	}

	public static info(message: string)
	{
		let prefix = this.getLogPrefix();
		let chalk = this.getChalk();
		global.console.log(prefix + chalk.blue(message));
	}

	public static success(message: string)
	{
		let prefix = this.getLogPrefix();
		let chalk = this.getChalk();
		global.console.log(prefix + chalk.green(message));
	}

	public static warning(message: string)
	{
		let prefix = this.getLogPrefix();
		let chalk = this.getChalk();
		global.console.log(prefix + chalk.yellow(message));
	}

	public static getLogPrefix()
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

	private static getChalk(): any
	{
		if (!this.chalk)
		{
			this.chalk = require('chalk');
		}

		return this.chalk;
	}
}