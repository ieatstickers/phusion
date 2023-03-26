
export class CookieApi
{
  public static get(key: string): string
  {
    const allCookies = CookieApi.getAll();
    return allCookies[key] || null;
  }
  
  public static getAll(): { [name: string]: string }
  {
    const documentCookieString = document.cookie;
    
    // Get array of cookie strings (one per cookie)
    const cookieStrings = documentCookieString.split(';');
    
    // Initialise a new object to store them key => value
    const cookies = {};
    
    // For each cookie string
    for (const cookieString of cookieStrings)
    {
      const [cookieKey, cookieValue] = cookieString.split('=');
      
      // Store in object under its key
      cookies[cookieKey] = cookieValue;
    }
    
    return cookies;
  }
  
  public static set(
    options: {
      key: string,
      value: string,
      expiry?: number,
      domain?: string,
      path?: string,
      sameSite?: 'Lax' | 'Strict' | 'None',
      secure?: boolean
    }
  ): void
  {
    // Build cookie string
    let cookieString = options.key + '=' + options.value;
    
    // If a domain was passed in
    if (options.domain)
    {
      cookieString += ';domain=' + options.domain;
    }
    
    // If a path was passed in
    if (options.path)
    {
      cookieString += ';path=' + options.path;
    }
    
    // If an expiry was passed in
    if (options.expiry)
    {
      const expiryDate = new Date();
      expiryDate.setTime(options.expiry);
      const expiryDateString = expiryDate.toUTCString();
      
      // Add expiry to cookie string
      cookieString += ';expires=' + expiryDateString;
    }
    
    if (options.sameSite)
    {
      cookieString += `;SameSite=${options.sameSite}`;
    }
    
    if (options.secure === true)
    {
      cookieString += ';Secure';
    }
    
    // Set cookie string
    document.cookie = cookieString;
  }
  
  public static remove(key: string, domain?: string, path?: string): void
  {
    return this.set({
      key: key,
      value: null,
      expiry: 0,
      domain: domain,
      path: path
    });
  }
}
