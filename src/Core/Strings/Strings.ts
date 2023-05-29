
export class Strings
{
  private static readonly RANDOM_STRING_AVAILABLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  private static readonly PASSWORD_AVAILABLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$-_.+!*\'(),,';
  
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
  
  public static random(length: number = 10, blacklistedStrings?: Array<string>): string
  {
    let string;
    
    while (!string || (blacklistedStrings && blacklistedStrings.length && blacklistedStrings.includes(string)))
    {
      string = this.generateRandomString(length, this.RANDOM_STRING_AVAILABLE_CHARS);
    }
    
    return string;
  }
  
  public static password(length: number)
  {
    return this.generateRandomString(length, this.PASSWORD_AVAILABLE_CHARS);
  }
  
  public static initialCaps(string: string)
  {
    const words = string.split(' ');
    
    return words.reduce((result, word, index) => {
      result += word.charAt(0).toUpperCase() + word.slice(1);
      if (index < words.length - 1) result += ' ';
      return result;
    }, '');
  }
  
  private static generateRandomString(
    length: number = 10,
    availableCharacters: string = this.RANDOM_STRING_AVAILABLE_CHARS
  )
  {
    let result = '';
    let charactersLength = availableCharacters.length;
    for ( let i = 0; i < length; i++ ) {
      result += availableCharacters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
