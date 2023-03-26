
export class Time
{
  /**
   * timeString either expects a string in the following format:
   * colon (:) delimited string e.g. 5w:3d:2h:4m:3s
   * can be any combination of w | d | h | m | s
   * e.g. '1w', '2d', '2m:30s', '4w:3d'
   */
  public static timeStringToSeconds(timeString: string): number
  {
    let timeInSeconds: number = 0;
    
    const parts = timeString.split(':');
    
    for (const part of parts)
    {
      const suffix = part.charAt(part.length - 1);
      const number = parseInt(part);
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
        case ('s'):
          timeInSeconds += number;
          break;
        default:
          throw new Error("Invalid time string: " + timeString);
      }
    }
    
    return timeInSeconds;
  }
  
  public static timeStringToMilliseconds(timeString: string): number
  {
    return this.timeStringToSeconds(timeString) * 1000;
  }
  
  public static wait(ms: number): Promise<void>
  {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        return resolve();
      }, ms);
    });
  }
}
