import {AbstractMergeHandler} from "../AbstractMergeHandler";
import {MergeHandlerInterface} from "../MergeHandlerInterface";

export class EnvironmentMergeHandler extends AbstractMergeHandler implements MergeHandlerInterface
{
	private env: string;

	public shouldMerge(): boolean
	{
		return (typeof this.getEnv() !== 'undefined');
	}

	public getRegexPattern(): string
	{
		let env = this.getEnv();
		return '^' + env + '-.+.yaml';
	}

	private getEnv(): string
	{
		if (!this.env)
		{
			this.env = global.process.env.ENV;
		}

		return this.env;
	}
}