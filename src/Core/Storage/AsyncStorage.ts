import { LocalStorage } from "./LocalStorage";
import NativeAsyncStorage from "@react-native-async-storage/async-storage";

export class AsyncStorage
{
	public static clear(): Promise<boolean>
	{
		return new Promise((resolve, reject) => {
		  
		  if (this.isWeb())
      {
        LocalStorage.clear()
        return resolve(true);
      }
		  
      NativeAsyncStorage
        .clear()
        .then(() => {
          resolve(true);
        })
        .catch(reject);
    });
	}

	public static get(key: string): Promise<any>
	{
		return new Promise((resolve, reject) => {
		  
		  if (this.isWeb())
      {
        return resolve(LocalStorage.get(key));
      }
      
      return NativeAsyncStorage
        .getItem(key)
        .then((value) => {
          
          value = typeof value === 'undefined' ? null : value;
          
          if (typeof value === 'string')
          {
            try {
              value = JSON.parse(value);
            }
            catch (e) {}
          }
          
          return resolve(value);
        })
        .catch(reject);
    });
	}

	public static remove(key: string): Promise<boolean>
	{
		return new Promise((resolve, reject) => {
		  
		  if (this.isWeb())
      {
        LocalStorage.remove(key);
        return resolve(true);
      }
      
      NativeAsyncStorage
        .removeItem(key)
        .then(() => {
          resolve(true);
        })
        .catch(reject);
    });
	}

	public static set(
		key: string,
		value: any
	): Promise<boolean>
	{
		return new Promise((resolve, reject) => {
      if (this.isWeb())
      {
        LocalStorage.set(key, value);
        return resolve(true);
      }
      
      if (typeof value === 'object')
      {
        value = JSON.stringify(value);
      }
      
      NativeAsyncStorage
        .setItem(key, value)
        .then(() => {
          resolve(true);
        })
        .catch(reject);
    });
	}
	
	private static isWeb(): boolean
  {
    return Boolean(typeof document !== 'undefined');
  }
}
