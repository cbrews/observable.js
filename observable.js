Class = require("oo.js");

/**
 * @class Observable
 * @author Chris Brousseau <brousseau.chris@gmail.com>
 */
module.exports = Class.extend({
    /**
     * @method init
     * @overview initializes an internal _events object for event management
     * @ignore
     */
    init: function(){
        this._events = {};
    },

    /**
     * @method _initEventContainer
     * @overview [INTERNAL] Template for the event management object
     * @ignore
     */
    _initEventContainer: function(){
        return {
            active: true,
            callbacks: []
        }
    },

    /**
     * @method on
     * @overview Attach a function to an event string
     * @param {string} event - the event name
     * @param {function} fn - the function callback for this event
     * @returns reference to the added event (for detaching, if needed)
     */
    on: function(event, fn){
        if(this._events[event] == null){
            this._events[event] = this._initEventContainer();
        }
        var n = this._events[event].callbacks.push(fn);
        return fn;
    },

    /**
     * @method detach
     * @overview Removes an event based on the returned function reference from on(). Returns a bool based on whether or not a reference was found and removed
     * 
     * @param {string} event - the event name
     * @param {function} fn_ref - the callback reference returned by Observable.on()
     * @return bool
     */
    detach: function(event, fn_ref){
        if(this._events[event] && fn_ref){
            var idx = this._events[event].callbacks.indexOf(fn_ref);
            if(idx > -1){
                this._events[event].callbacks.splice(idx, 1);
                return true;
            }
        }
        return false;
    },

    /**
     * @method mute
     * @overview silence all callbacks fired for a given event
     * @param {string} event - the event name to mute all callbacks for
     * @return this
     */
    mute: function(event){
        if(this._events[event]){
            this._events[event].active = false;
        }
        return this;
    },

    /**
     * @method unmute
     * @overview unsilence all callbacks fired for a given event
     * @param {string} event - the event name to unmute all callbacks for
     * @return this
     */
    unmute: function(event){
        if(this._events[event]){
            this._events[event].active = true;
        }
        return this;
    },

    /**
     * @method dispatch
     * @overview trigger all an event's callbacks, with parameters
     * @return this
     */
    dispatch: function(event, args){
        if(this._events[event] && this._events[event].active){
            this._events[event].callbacks.forEach(function(fn){
                fn(args);
            });
        }
        return this;
    }
});
