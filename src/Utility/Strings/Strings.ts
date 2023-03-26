
export class Strings
{
  private static readonly RANDOM_STRING_AVAILABLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  private static readonly PASSWORD_AVAILABLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$-_.+!*\'(),,';
  
  public static random(length: number = 10, blacklistedStrings?: Array<string>): string
  {
    let string;
    
    while (!string || (blacklistedStrings && blacklistedStrings.length && blacklistedStrings.includes(string)))
    {
      string = this.generateRandomString(length, this.RANDOM_STRING_AVAILABLE_CHARS);
    }
    
    return string;
  }
  
  public static password(length: number): string
  {
    return this.generateRandomString(length, this.PASSWORD_AVAILABLE_CHARS);
  }
  
  public static initialCaps(string: string): string
  {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  private static generateRandomString(
    length: number = 10,
    availableCharacters: string = this.RANDOM_STRING_AVAILABLE_CHARS
  ): string
  {
    let result = '';
    const charactersLength = availableCharacters.length;
    for ( let i = 0; i < length; i++ ) {
      result += availableCharacters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
