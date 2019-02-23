
import {PhusionInterface} from '../../PhusionInterface';

export interface PhusionAwareInterface
{
	getPhusion(): PhusionInterface;
	setPhusion(phusion: PhusionInterface): this;
}
