
import { Numbers } from "../Numbers/Numbers";
import { Objects } from '../Objects/Objects';

export class Arrays
{
	public static clone(array: Array<any>): Array<any>
	{
		if(!Array.isArray(array)) throw new Error("Cannot clone array -  must be of type 'array'.");

		const clone = [];

		for (const arrayItem of array)
		{
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
	
	public static randomItem(array: Array<any>): any
  {
    return array[Numbers.random(0, array.length - 1)];
  }
}
