


export class Observers
{
  public static onResize(
    elements: Element | Array<Element>,
    callback: (
      resizeData: {
        target: Element,
        height: number,
        width: number,
        top: number,
        bottom: number,
        left: number,
        right: number,
        x: number,
        y: number
      }
    ) => void
  ): () => void
  {
    // @ts-ignore
    const resizeObserver = new ResizeObserver((resizeObserverEntries) => {
      for (const resizeObserverEntry of resizeObserverEntries)
      {
        callback({
          target: resizeObserverEntry.target,
          width: resizeObserverEntry.contentRect.width,
          height: resizeObserverEntry.contentRect.height,
          top: resizeObserverEntry.contentRect.top,
          bottom: resizeObserverEntry.contentRect.bottom,
          left: resizeObserverEntry.contentRect.left,
          right: resizeObserverEntry.contentRect.right,
          x: resizeObserverEntry.contentRect.x,
          y: resizeObserverEntry.contentRect.y
        })
      }
    });
  
    const elementsArray = Array.isArray(elements) ? elements : [elements];
    
    for (const element of elementsArray)
    {
      resizeObserver.observe(element);
    }
    
    return () => {
      resizeObserver.disconnect();
    }
  }
}
