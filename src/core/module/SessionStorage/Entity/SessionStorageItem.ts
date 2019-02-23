
import * as Moment from 'moment';

export class SessionStorageItem
{
	private created:Moment.Moment;
	private expiry:Moment.Moment;
	private key: string;
	private value:any;


	public getCreated(): Moment.Moment
	{
		return this.created;
	}

	public setCreated(created:Moment.Moment): this
	{
		this.created = created;
		return this;
	}

	public getExpiry(): Moment.Moment
	{
		return this.expiry;
	}

	public setExpiry(date:Moment.Moment): this
	{
		this.expiry = date;
		return this;
	}

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

	public getKey(): string
	{
		return this.key;
	}

	public setKey(key:string): this
	{
		this.key = key;
		return this;
	}

	public getValue(): any
	{
		return this.value;
	}

	public setValue(value:string): this
	{
		this.value = value;
		return this;
	}
}
