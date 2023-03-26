
import {Arrays} from '../Arrays/Arrays';

export class Objects
{
  public static getByKeyPath(keyPath: string, object: Object, delimiter: string = ':'): any
  {
    if (!object) return null;
    
    // Split path into array of keys
    const keysArray = keyPath.split(delimiter);
    
    // Get the total number of keys
    const keyCount = keysArray.length;
    
    let count = 1;
    
    // For each key
    for (const key of keysArray)
    {
      if (!object.hasOwnProperty(key)) return null;
      
      // If this is the last key to be accessed
      if (count == keyCount)
      {
        // Return it
        return object[key];
      }
  
      // If the key doesn't exist
      if (!object[key])
      {
        return null;
      }
  
      // Adjust object pointer for next key iteration
      object = object[key];
  
      // Increment count
      count++;
    }
  };
  
  public static setByKeyPath(keyPath: string, value: any, target: Object): any
  {
    return this.setByPath(keyPath.split(':'), value, target);
  }
  
  private static setByPath(keys: Array<string>, value: any, object: Object): any
  {
    const key = keys.shift();
    
    if (keys.length)
    {
      object[key] = this.setByPath(keys, value, object[key] ? object[key] : {});
    }
    else
    {
      object[key] = value;
    }
    
    return object;
  }
  
  public static merge(target: Object, ...sourceObjects: Array<Object>): any
  {
    // If no sources passed in, return target
    if (!sourceObjects.length)
    {
      return target;
    }
    
    // Get first source item
    const source = sourceObjects.shift();
    
    // Assign functions that need to be used inside "forEach" function below
    const merge = this.merge.bind(this);
    const isMergebleObject = (function(item) {
      return item !== null && typeof item === 'object' && !Array.isArray(item);
    }).bind(this);
    
    // If target and source are both mergeble
    if (isMergebleObject(target) && isMergebleObject(source))
    {
      // For each object key in source object
      Object.keys(source).forEach(function (key: string)
      {
        // If value at current key is a mergeable object
        if (isMergebleObject(source[key]))
        {
          // If key doesn't exist on target
          if (!target[key])
          {
            // Set to empty object
            target[key] = {};
          }
          
          // Deep merge target value and source value
          merge(target[key], source[key]);
        }
        // Else, if value is not a mergable object
        else
        {
          // Set value
          target[key] = source[key];
        }
      });
    }
    
    return merge(target, ...sourceObjects);
  };
  
  public static clone(object: Object): any
  {
    if(typeof object !== 'object')
    {
      throw new Error("Cannot clone object. Source object must be of type 'object'.");
    }
    
    return this.hydrate(Object.create(object), object);
  }
  
  public static hydrate(
    dest: Object,
    source: Object,
    mutators: Object = {},
    excludeNullValues: boolean = false,
    excludeMethods: boolean = true
  )
  {
    if(typeof dest !== 'object' || typeof source !== 'object')
    {
      throw new Error("Cannot hydrate object. Source and destination object must both be of type 'object'.");
    }
    
    for (const property in source)
    {
      const propertyValue = source[property];
      
      if (typeof propertyValue == "function" && excludeMethods) continue;
      
      if (source[property] == null)
      {
        if (excludeNullValues) continue;
        dest[property] = null
      }
      // If a mutator is present
      else if (mutators.hasOwnProperty(property) && typeof mutators[property] == 'function')
      {
        dest[property] = mutators[property](source[property]);
      }
      // If property value is an array
      else if (Array.isArray(propertyValue))
      {
        // Clone array
        dest[property] = Arrays.clone(propertyValue);
      }
      // If value is an object
      else if (typeof propertyValue == 'object')
      {
        dest[property] = this.clone(propertyValue);
      }
      else
      {
        dest[property] = propertyValue;
      }
    }
    
    return dest;
  }
  
}
