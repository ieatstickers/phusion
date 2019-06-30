
## Strings  
  
 The `Strings` class provides utility functions for working with strings.     

### contains(haystack: string, needle: string): boolean  

Returns true, if the needle is present in the haystack.  
  
```javascript
let contains = Strings.contains('my test string', 'test');

console.log(contains); // true
```

### startsWith(string: string, prefix: string): boolean  

Returns true, if the strings starts with the prefix provided.  
  
```javascript
let startsWith = Strings.startsWith('my test string', 'my ');

console.log(startsWith); // true
```

### endsWith(string: string, suffix: string): boolean  

Returns true, if the strings ends with the suffix provided.  
  
```javascript
let endsWith = Strings.endsWith('my test string', ' string');

console.log(endsWith); // true
```

