
export class Promises
{
	public static all(promises: {[key: string]: Promise<any>}): Promise<{[key: string]: any}>
  {
    return new Promise((resolve, reject) => {
      const promiseArray = [];
      const keyMap = {};
      let currentIndex = 0;
  
      // For each key
      for (let key of Object.keys(promises))
      {
        // Add promise to array
        promiseArray.push(promises[key]);
        // Add key to keyMap
        keyMap[currentIndex] = key;
        // Increment current index
        ++currentIndex;
      }
  
      Promise
        .all(promiseArray)
        .then((responses) => {
      
          const responsesByKey = {};
      
          // For each response
          for (let index in responses)
          {
            // Find key
            // Set response on responsesByKey
            responsesByKey[keyMap[index]] = responses[index];
          }
      
          // Resolve
          return resolve(responsesByKey);
        })
        .catch(reject);
    })
  }
}
