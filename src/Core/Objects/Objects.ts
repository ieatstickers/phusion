
import {Arrays} from '../Arrays/Arrays';

export class Objects
{
	public static getByKeyPath(keyPath: string, object: Object, delimiter: string = ':'): any
	{
		if (!object)
		{
			return null;
		}

		// Split path into array of keys
		let keysArray = keyPath.split(delimiter);

		// Get the total number of keys
		let keyCount = keysArray.length;

		let count = 1;

		// For each key
		for (let key of keysArray)
		{
			// If key exists
			if (object.hasOwnProperty(key))
			{
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
			} else
			{
				return null;
			}
		}
	};

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
		let merge = this.merge.bind(this);
		let isMergebleObject = (function(item) {
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

	public static clone(object: Object): Object
	{
		if(typeof object !== 'object')
		{
			throw new Error("Cannot clone object. Source object must be of type 'object'.");
		}

		return this.hydrate(Object.create(object), object);
	}

	public static hydrate(dest: Object, source: Object, mutators: Object = {})
	{
		if(typeof dest !== 'object' || typeof source !== 'object')
		{
			throw new Error("Cannot hydrate object. Source and destination object must both be of type 'object'.");
		}

		for (let property in source)
		{
			let propertyValue = source[property];

			// If a mutator is present
			if (mutators.hasOwnProperty(property) && typeof mutators[property] == 'function')
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