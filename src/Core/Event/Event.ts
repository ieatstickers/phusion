

export class Event
{
  public static dispatch(eventName: string, data: any = null)
  {
    let event = new CustomEvent(eventName, { detail: data });
    window.dispatchEvent(event);
  }
  
  public static on(eventName: string, callback: Function)
  {
    const eventListener = function (event)
    {
      return callback(event['detail']);
    };
    
    // Listen for the event
    window.addEventListener(eventName, eventListener, false);
    
    // Return unsubscriber
    return window.removeEventListener.bind(undefined, eventName, eventListener);
  }
}

