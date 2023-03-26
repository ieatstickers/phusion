
export class UserAgent
{
	private static provider: any = require('ua-parser-js')(navigator.userAgent);

	public static getBrowserName(): string
	{
		return this.provider['browser']['name'];
	}

	public static getMajorBrowserVersion(): number
	{
		return parseInt(this.provider['browser']['major'])
	}

	public static getOsName(): string
	{
		return this.provider['os']['name'] ? this.provider['os']['name'] : null
	}

	public static getOsVersion(): number
	{
		return this.provider['os']['version'] ? parseFloat(this.provider['os']['version']) : null;
	}

	public static isChrome(): boolean
	{
		// Created an extra check for Edge browser as it's getting a false positive
		let regex = new RegExp('^.*(Chrome|chrome)(?!.*(Edge|edge)).*$', 'g');
		if (regex.test(navigator.userAgent))
		{
			regex = new RegExp('Chrome|chrome');
			return regex.test(UserAgent.getBrowserName());
		}
		return false;
	}
  
  public static isChromiumEdge(): boolean
  {
    const regex = new RegExp('^.*(Edg\\/).*$', 'g');
    return regex.test(navigator.userAgent);
  }
  
  public static isLegacyEdge(): boolean
  {
    const regex = new RegExp('^.*(Edge\\/).*$', 'g');
    return regex.test(navigator.userAgent);
  }

	public static isFirefox(): boolean
	{
		const regex = new RegExp('Firefox|firefox');
		return regex.test(UserAgent.getBrowserName());
	}

	public static isSafari(): boolean
	{
		const regex = new RegExp('Safari|safari');
		return regex.test(UserAgent.getBrowserName());
	}

	public static isOpera(): boolean
	{
		const regex = new RegExp('Opera|opera');
		return regex.test(UserAgent.getBrowserName());
	}

	public static isIE(): boolean
	{
		return "ActiveXObject" in window
	}

	public static isMac(): boolean
	{
		const regex = new RegExp('Mac OS');
		return regex.test(UserAgent.getOsName());
	}

	public static isMobile(): boolean
	{
		return (UserAgent.isIos() || UserAgent.isAndroid());
	}

	public static isIos(): boolean
	{
		const regex = new RegExp('iPhone');
		const regexTwo = new RegExp('iOS');
		return (regex.test(UserAgent.getBrowserName()) || regexTwo.test(UserAgent.getOsName()));
	}

	public static isAndroid(): boolean
	{
		const regex = new RegExp('Android');
		return regex.test(UserAgent.getOsName());
	}

	public static isWindows(): boolean
	{
		const regex = new RegExp('Windows|windows');
		return regex.test(UserAgent.getOsName());
	}

}
