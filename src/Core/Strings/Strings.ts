
export class Strings
{
	public static contains(haystack: string, needle: string): boolean
	{
		return haystack.indexOf(needle) >= 0;
	}

	public static startsWith(string: string, prefix: string): boolean
	{
		return string.indexOf(prefix) === 0;
	}

	public static endsWith(string: string, suffix: string): boolean
	{
		return string.indexOf(suffix, string.length - suffix.length) >= 0;
	}
}