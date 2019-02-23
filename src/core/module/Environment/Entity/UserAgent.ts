
import {UserAgentInterface} from "./UserAgentInterface";

export class UserAgent implements UserAgentInterface
{
	private browserName: string;
	private browserMajorVersion: number;
	private osName: string;
	private osVersion: number;

	public constructor(
		browserName: string,
		browserMajorVersion: number,
		osName: string,
		osVersion: number
	)
	{
		this.browserName = browserName;
		this.browserMajorVersion = browserMajorVersion;
		this.osName = osName;
		this.osVersion = osVersion;
	}

	public getBrowserName(): string
	{
		return this.browserName;
	}

	public getMajorBrowserVersion(): number
	{
		return this.browserMajorVersion;
	}

	public getOsName(): string
	{
		return this.osName;
	}

	public getOsVersion(): number
	{
		return this.osVersion;
	}

	public isChrome(): boolean
	{
		// Created an extra check for Edge browser as it's getting a false positive
		let regex = new RegExp('^.*(Chrome|chrome)(?!.*(Edge|edge)).*$', 'g');
		if (regex.test(navigator.userAgent))
		{
			regex = new RegExp('Chrome|chrome');
			return regex.test(this.browserName);
		}
		return false;
	}

	public isEdge(): boolean
	{
		// Created an extra check for Edge browser as it's getting a false positive
		let regex = new RegExp('^.*(Edge|edge).*$', 'g');
		return regex.test(navigator.userAgent);
	}

	public isFirefox(): boolean
	{
		let regex = new RegExp('Firefox|firefox');
		return regex.test(this.browserName);
	}

	public isOpera(): boolean
	{
		let regex = new RegExp('Opera|opera');
		return regex.test(this.browserName);
	}

	public isIE(): boolean
	{
		return "ActiveXObject" in window
	}

	public isMac(): boolean
	{
		let regex = new RegExp('Mac OS');
		return regex.test(this.osName);
	}

	public isMobile(): boolean
	{
		return (this.isIos() || this.isAndroid());
	}

	public isIos(): boolean
	{
		let regex = new RegExp('iPhone');
		let regexTwo = new RegExp('iOS');
		return (regex.test(this.osName) || regexTwo.test(this.osName));
	}

	public isAndroid(): boolean
	{
		let regex = new RegExp('Android');
		return regex.test(this.osName);
	}

	public isWindows(): boolean
	{
		let regex = new RegExp('Windows|windows');
		return regex.test(this.osName);
	}

}
