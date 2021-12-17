


export class Observers
{
  public static onResize(
    elements: HTMLElement | Array<HTMLElement>,
    callback: (
      resizeData: {
        target: HTMLElement,
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
    const resizeObserver = new ResizeObserver((entries) => {
      callback({
        target: entries.target,
        width: entries.contentRect.width,
        height: entries.contentRect.height,
        top: entries.contentRect.top,
        bottom: entries.contentRect.bottom,
        left: entries.contentRect.left,
        right: entries.contentRect.right,
        x: entries.contentRect.x,
        y: entries.contentRect.y
      })
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
