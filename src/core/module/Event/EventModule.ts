
import {AbstractModule} from "../AbstractModule";
import {EventModuleInterface} from "./EventModuleInterface";

export class EventModule extends AbstractModule implements EventModuleInterface
{
	public dispatch(eventName: string, data: any = null): this
	{
		let event = new CustomEvent(eventName, { detail: data });
		window.dispatchEvent(event);

		return this;
	}

	public on(eventName: string, callback: Function): this
	{
		// Listen for the event.
		window.addEventListener(eventName, function (event)
		{
			return callback(event['detail']);
		}, false);

		return this;
	}
}

