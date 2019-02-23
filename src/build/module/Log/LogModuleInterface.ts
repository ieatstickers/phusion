export interface LogModuleInterface
{
	error(message: string): this;

	info(message: string): this;

	success(message: string): this;

	warning(message: string): this;
}