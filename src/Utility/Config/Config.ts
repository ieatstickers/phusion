
import { Objects } from "../Objects/Objects";

export class Config
{
  private configObject: Object = {};
  
  protected constructor(configObject: Object)
  {
    this.configObject = configObject;
  }
  
  public static create(configObject: Object): Config
  {
    return new Config(configObject);
  }
  
  public getByPath(configPath: string): any
  {
    return Objects.getByKeyPath(configPath, this.configObject);
  }
  
  public toObject(): { [property: string]: any }
  {
    return this.configObject;
  }
}
