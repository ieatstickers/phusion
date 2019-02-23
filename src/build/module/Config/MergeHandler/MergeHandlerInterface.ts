
export interface MergeHandlerInterface
{
	getRegexPattern(): string;

	shouldMerge(): boolean;
}