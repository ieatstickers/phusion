

export class Event
{
	public static dispatch(eventName: string, data: any = null)
	{
		let event = new CustomEvent(eventName, { detail: data });
		window.dispatchEvent(event);
	}

	public static on(eventName: string, callback: Function)
	{
		// Listen for the event.
		window.addEventListener(eventName, function (event)
		{
			return callback(event['detail']);
		}, false);
	}
}

