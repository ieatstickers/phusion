
export interface UserAgentInterface
{
	getBrowserName(): string;

	getMajorBrowserVersion(): number;

	getOsName(): string;

	getOsVersion(): number;

	isChrome(): boolean;

	isEdge(): boolean;

	isFirefox(): boolean;

	isOpera(): boolean;

	isIE(): boolean;

	isMac(): boolean;

	isMobile(): boolean;

	isWindows(): boolean;

	isIos(): boolean;

	isAndroid(): boolean;
}
