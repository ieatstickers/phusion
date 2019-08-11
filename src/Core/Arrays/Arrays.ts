
import {Objects} from '../Objects/Objects';

export class Arrays
{
	public static clone(array: Array<any>): Array<any>
	{
		if(!Array.isArray(array))
		{
			throw new Error("Cannot clone array -  must be of type 'array'.");
		}

		let clone = [];

		for (let key in array)
		{
			let arrayItem = array[key];

			// If array item is an array
			if (Array.isArray(arrayItem))
			{
				// Clone the array
				clone.push(this.clone(arrayItem));
			}
			// If value is an object
			else if (typeof arrayItem == 'object')
			{
				clone.push(Objects.clone(arrayItem));
			}
			else
			{
				clone.push(arrayItem);
			}
		}

		return clone;
	}
}