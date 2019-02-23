
import {PhusionAwareInterface} from './PhusionAwareInterface';
import {PhusionInterface} from './../../PhusionInterface';

export class PhusionAware implements PhusionAwareInterface
{
	private phusion: PhusionInterface;

	public getPhusion(): PhusionInterface
	{
		return this.phusion;
	}

	public setPhusion(phusion: PhusionInterface): this
	{
		this.phusion = phusion;

		return this;
	}
}
