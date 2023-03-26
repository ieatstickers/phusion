
export class CustomEventApi
{
  public static dispatch(eventName: string, data: any = null)
  {
    const event = new CustomEvent(eventName, { detail: data });
    window.dispatchEvent(event);
  }
  
  public static on(eventName: string, callback: (data: any) => void): () => void
  {
    const eventListener = function (event) {
      return callback(event['detail']);
    };
    
    window.addEventListener(eventName, eventListener, false);
    
    return () => {
      window.removeEventListener(eventName, eventListener)
    };
  }
}

