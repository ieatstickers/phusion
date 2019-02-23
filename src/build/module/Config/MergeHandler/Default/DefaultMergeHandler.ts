import {AbstractMergeHandler} from "../AbstractMergeHandler";
import {MergeHandlerInterface} from "../MergeHandlerInterface";

export class DefaultMergeHandler extends AbstractMergeHandler implements MergeHandlerInterface
{
	public shouldMerge(): boolean
	{
		return true;
	}

	public getRegexPattern(): string
	{
		return '^default-.+\.yaml';
	}
}