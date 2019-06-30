
  
## Event

The Event class allows custom events to be registered and subsequently triggered, with the ability to pass data into each event.


### on(eventName: string, callback: Function)
Registers a callback function to run whenever an event is dispatched with the name provided.
```javascript
Event.on('myCustomEvent', function(data) {
  console.log(data); // { exampleData: "Example data value" }
});
```

### dispatch(eventName: string, data: any = null)

Dispatches an event with the given event name and data. Any callbacks registered for this event name with be called.

```javascript

var eventData = { 
  exampleData: "Example data value" 
};

Event.dispatch('myCustomEvent', eventData);
```



