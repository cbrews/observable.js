# Observable.js
A instantiable javascript class with a simple observer pattern interface.  Built on top of https://github.com/cbrews/oo.js.
## API
#### `Observable.on(event, fn)`
Attach a function to an event string.
 * **Parameters:**
   * `event` — `string` - The event name
   * `fn` — `function` - The function callback for this event
 * **Returns:** `object` — Reference to the added event (for detaching, if needed)

#### `Observable.detach(event, fn_ref)`
Removes an event based on the returned function reference from on(). Returns a bool based on whether or not a reference was found and removed.
 * **Parameters:**
   * `event` — `string` - The event name
   * `fn_ref` — `object` - The callback reference returned by Observable.on()
 * **Returns:** `bool` - Whether or not the callback was found and detached successfully

#### `Observable.mute(event)`
Silence all callbacks fired for a given event.
 * **Parameters:** `event` — `string` - The event name to mute all callbacks for
 * **Returns:** `this` 

#### `Observable.unmute(event)`
Unsilence all callbacks fired for a given event.
 * **Parameters:** `event` — `string` - The event name to unmute all callbacks for
 * **Returns:** `this` 

#### `Observable.dispatch(event, args)`
Trigger all an event's callbacks, with parameters.
 * **Parameters:**
   * `event` — `string` - The event name which to dispatch.
   * `args` — `object` - An object with arguments to pass with the dispatch
 * **Returns:** `this`
