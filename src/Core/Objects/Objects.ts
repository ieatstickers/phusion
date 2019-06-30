
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

	public static merge(target: Object, ...sourceObjects: Array<Object>): Object
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
			return typeof item === 'object' && !Array.isArray(item);
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

}