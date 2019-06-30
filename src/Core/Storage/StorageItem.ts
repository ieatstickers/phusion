
import * as Moment from 'moment';

export class StorageItem
{
	public created: Moment.Moment;
	public expiry: Moment.Moment;
	public key: string;
	public value:any;

	public isExpired(): boolean
	{
		if (!this.expiry)
		{
			return false;
		}

		let expiryUnix = this.expiry.valueOf();
		let nowUnix = Moment().valueOf();
		return (nowUnix > expiryUnix);
	}
}
