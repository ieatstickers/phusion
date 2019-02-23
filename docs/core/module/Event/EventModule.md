
  
## Event Module

The Event Module allows custom events to be registered and subsequently triggered, with the ability to pass data into each event.

### dispatch(eventName: string, data: any = null): EventModule

Dispatches an event with the given event name and data. Any callbacks registered for this event name with be called.

```javascript
var eventModule = phusion.getEventModule();

var eventData = { 
  exampleData: "Example data value" 
};

eventModule.dispatch('myCustomEvent', eventData);
```

### on(eventName: string, callback: Function): EventModule
Registers a callback function to run whenever an event is dispatched with the name provided.
```javascript
var eventModule = phusion.getEventModule();

eventModule.on('myCustomEvent', function(data) {
  console.log(data); // { exampleData: "Example data value" }
});
```



