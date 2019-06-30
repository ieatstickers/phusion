
## Time  
  
 The `Time` class provides utility functions for working with time.     

### timeStringToSeconds(timeString: string): number  

A time string supports weeks, days, hours, minutes and seconds. 

##### Example time strings:

1 week: ***"1w"***

3 days:   ***"3d"***

6 hours:   ***"6h"***

30 minutes:   ***"30m"***

10 seconds:   ***"10s"***

1 week and 3 days: ***"1w:3d"***

12 hours, 30 minutes and 20 seconds: ***"12h:30m:20s"***  
  
```javascript
let seconds = Time.timeStringToSeconds('5m');

console.log(seconds); // 300
```
