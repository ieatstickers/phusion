
export class Numbers
{
  public static random(min: number = 0, max: number = 100)
  {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
