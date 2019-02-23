
import {PhusionInterface} from '../PhusionInterface';
import {PhusionAware} from "./Phusion/PhusionAware";

export abstract class AbstractModule extends PhusionAware
{
	constructor(phusion: PhusionInterface)
	{
		super();
		this.setPhusion(phusion);
	}

	protected getTimeInSecondsFromTimeString(timeString: string): number
	{
		let timeInSeconds: number = 0;

		let parts = timeString.split(':');

		for (let part of parts)
		{
			let suffix = part.substr(part.length - 1, 1);
			let number = parseInt(part);
			switch (suffix)
			{
				case ('w'):
					timeInSeconds += number * 604800;
					break;
				case ('d'):
					timeInSeconds += number * 86400;
					break;
				case ('h'):
					timeInSeconds += number * 3600;
					break;
				case ('m'):
					timeInSeconds += number * 60;
					break;
				default: // s
					timeInSeconds += number;
					break;
			}
		}

		return timeInSeconds;
	}
}
