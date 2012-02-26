/**
 * @module   eventhandler.core
 * @requires core
 * @requires eventhandler.constants
 * @requires stringhelper.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-26 18:07:49.576353
 * -->
 *
 * <p>A cross-browser event management object.</p>
 */
(function(framework, window, document) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

    /*
     * EventHandler (core)
     */
    var me = create('EventHandler');

    /*
     * Aliases
     */

    var $      = require('$');
    var myName = require('name');
    var nill   = require('nill');

    var kStringHelper = 'StringHelper';
    var concat        = require(kStringHelper, 'concat');
    var format        = require(kStringHelper, 'format');

    /*
     * Common Constants
     */
    var kCallbackNotDefined = format('{0}: Callback is not defined!', myName);
    var kOn                 = 'on';

    /*
     * Feature Tests
     */
    var isAddEventListener = !!document.addEventListener;
    var isAttachEvent      = !!document.attachEvent;
    var windowEventHandle  = window.event;

    if (isAddEventListener) {

        /**
         * @function {static} o2.EventHandler.addEventListener
         *
         * <p>Adds a new event listener to the <strong>DOM</strong> Node.</p>
         *
         * @param {DomNode} node - the <strong>DOM</strong> object (or its
         * <code>String</code> id) the evet shall be attached.
         * @param {String} evt - the name of the event (like "click",
         * "mousemove"...)
         * @param {Function} fn - a reference to the on[event] callback action.
         *
         * @throws exception - if <strong>fn</strong> callback is not defined.
         */
        def(me, 'addEventListener', function(node, evt, fn) {
            var obj = $(node);

            if (!obj) {
                return;
            }

            if (!fn) {
                throw kCallbackNotDefined;
            }

            // `false` disables event capturing.
            //
            // Event capturing is not very useful, since its
            // implementation vastly deviates among vendors.
            //
            // See:
            // http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-flow
            obj.addEventListener(evt, fn, false);
        });

        /**
         * @function {static} o2.EventHandler.removeEventListener
         *
         * <p>Removes an already-added new event listener from the DOM Node.</p>
         *
         * @param {DomNode} node - the DOM object (or its <code>String</code>
         * reference) the evet shall be removed.
         * @param {String} evt - the name of the event (like "click",
         * "mousemove"...)
         * @param {Function} fn - a reference to the on[event] callback action.
         *
         * @throws Exception - if <strong>fn</strong> callback is not defined.
         */
        def(me, 'removeEventListener', function(node, evt, fn) {
            var obj = $(node);

            if (!obj) {
                return;
            }

            if (!fn) {
                throw kCallbackNotDefined;
            }

            obj.removeEventListener(evt, fn, false);
        });
    } else if (isAttachEvent) {
        def(me, 'addEventListener', function(node, evt, fn) {
            var obj = $(node);

            if (!obj) {
                return;
            }

            if (!fn) {
                throw kCallbackNotDefined;
            }

            obj.attachEvent(concat(kOn, evt), fn);
        });

        def(me, 'removeEventListener', function(node, evt, fn) {
            var obj = $(node);

            if (!obj) {
                return;
            }

            if (!fn) {
                throw kCallbackNotDefined;
            }

            obj.detachEvent(concat(kOn, evt), fn);
        });
    } else {
        def(me, 'addEventListener', function(node, evt, fn) {
            var obj = $(node);

            if (!obj) {
                return;
            }

            if (!fn) {
                throw kCallbackNotDefined;
            }

            obj[concat(kOn, evt)] = fn;
        });

        def(me, 'removeEventListener', function(node, evt, fn) {
            var obj = $(node);

            if (!obj) {
                return;
            }

            if (!fn) {
                throw kCallbackNotDefined;
            }

            obj[concat(kOn, evt)] = nill;
        });
    }

    /*
     *
     */
    var addEventListener = require('EventHandler', 'addEventListener');

    /**
     * @function {static} o2.EventHandler.addEventListeners
     *
     * <p>Adds a set of event handlers the the <strong>eventName</strong> of
     * the given <strong>collection</strong>.</p>
     *
     * @param {Object} collection - an <code>Object</code> or an
     * <code>Array</code> of <strong>DOM</strong> nodes, or their
     * <strong>id</strong>s.
     * @param {String} eventName - the name of the <strong>event</strong> to
     * attach to.
     * @param {Function} handler - the common event handling
     * <strong>callback</strong>.
     *
     * @throws Exception - if the <strong>handler</strong> callback is not
     * defined.
     */
    def(me, 'addEventListeners', function(collection, eventName, handler) {
        if (!collection) {
            return;
        }

        var listen = addEventListener;
        var key = null;

        for (key in collection) {
            if (collection.hasOwnProperty(key)) {
                listen(collection[key], eventName, handler);
            }
        }
    });

    if (windowEventHandle) {

        /**
         * @function {static} o2.EventHandler.getEventObject
         *
         * <p>Gets the actual event object.</p>
         *
         * @param {Event} evt - the actual <code>DOM Event</code> object used
         * internally in {@link EventHandler.addEventListener}
         *
         * @return the actual <code>DOM Event</code> object.
         */
        def(me, 'getEventObject', function() {
           return windowEventHandle;
        });

        /**
         * @function {static} o2.EventHandler.getTarget
         *
         * <p>Gets the originating source of the event.</p>
         *
         * @param {Event} evt - the actual <code>DOM Event</code> object used
         * internally in {@link EventHandler.addEventListener}
         *
         * @return the actual <strong>DOM</strong> target of the event object.
         */
        def(me, 'getTarget' = function() {
            return windowEventHandle.srcElement;
        });
    } else {
        def(me, 'getEventObject', function(evt) {
           return evt;
        });

        def(me, 'getTarget', function(evt) {
            return evt ? evt.target : null;
        });
    }

    /*
     *
     */
    var getEventObject = require('EventHandler', 'getEventObject');

    /**
     * @function {static} o2.EventHandler.getKeyCode
     *
     * <p>Gets the key code of the key-related event (keydown, keyup, keypress
     * etc.).</p>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link o2.EventHandler.addEventListener}
     *
     * @return the <strong>unicode</strong> key code associated
     * with the event as an <code>Integer</code>, if found; <code>0</code>
     * otherwise.
     */
    def(me, 'getKeyCode', function(evt) {
        var e = getEventObject(evt);

        if (!e) {
            return 0;
        }

        // For a cross-event (i.e. keydown, keyup, keypress)
        // result we normalize the code.
        // ref: http://www.quirksmode.org/js/keys.html

        // for @ input
        // onkeypress : {which: 50, keyCode: 50, charCode: 0 , value  '2' }
        // onkeydown  : {which: 64, keyCode: 0 , charCode: 64, value: '@' }

        return e.charCode || e.keyCode || 0;
    });

    /*
     *
     */
    var getMouseCoordinates = function(evt) {
        var e = getEventObject(evt);

        if (!e) {
            return {x : 0, y : 0};
        }

        var posx = 0;
        var posy = 0;

        if (e.pageX) {
            getMouseCoordinates = function(e) {
                if (!e) {
                    return {x : 0, y : 0};
                }

                posx = e.pageX || 0;
                posy = e.pageY || 0;

                return {x : posx, y : posy};
            };

            return getMouseCoordinates(evt);
        }

        if(e.clientX) {
            getMouseCoordinates = function(e) {
                if (!e) {
                    return {x : 0, y : 0};
                }

                var clientX = e.clientX || 0;
                var clientY = e.clientY || 0;
                var wd = document;

                posx = clientX + wd.body.scrollLeft +
                    wd.documentElement.scrollLeft;
                posy = clientY + wd.body.scrollTop +
                    wd.documentElement.scrollTop;

                return {x : posx, y : posy};
            };

            return getMouseCoordinates(evt);
        }

        // The current event object has neither pageX, nor clientX defined.
        return {x : 0, y : 0};
    };

    /**
     * @function {static} o2.EventHandler.getMouseCoordinates
     *
     * <p>Gets the current mouse coordinates.</p>
     *
     * @param {Event} evt - the actual <code>DOM Event</code> object used
     * internally in {@link o2.EventHandler.addEventListener}
     *
     * @return the coordinates in the form of
     * <code>{x: mouseX, y: mouseY}</code>
     * where <code>x</code> is the distance from the top of the screen, and
     * <code>y</code> is the distance from the left of the screen.
     */
    def(me, 'getMouseCoordinates', function(evt) {
        return getMouseCoordinates(evt);
    });

    if (windowEventHandle) {

        /**
         * @function {static} o2.EventHandler.preventDefault
         *
         * <p>Prevents the default action. When this method is called inside an
         * even handling callback, the default action associated with that
         * event is not triggered. Like, if it is an <code>onclick</code>
         * event on a link, then the browser does not go to the
         * <code>href</code> of that link.</p>
         *
         * @param {Event} evt - the actual <code>DOM Event</code> object used
         * internally in {@link EventHandler.addEventListener}
         */
        def(me, 'preventDefault', function() {
            windowEventHandle.returnValue = false;

            return false;
        });
    } else {
        def(me, 'preventDefault', function(evt) {
            if (!evt) {
                return false;
            }

            if (evt.preventDefault) {
                evt.preventDefault();
            }

            return false;
        });
    }

    if (windowEventHandle) {

        /**
         * @function {static} o2.EventHandler.stopPropagation
         *
         * <p>Stops the propagation of the event upwards in the DOM
         * hierarchy.</p>
         *
         * <p>Note that "change" event does not bubble.</p>
         *
         * <p>Also, events: change, submit, reset, focus, blur do not bubble
         * in Internet Explorer.</p>
         *
         * <p>According to specification, "focus" and "blur" should not bubble,
         * while "change", "submit", "reset" should.</p>
         *
         * <p>This behavior implemented properly in all web browsers but IE.</p>
         *
         * <p>See {@link
         * http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-flow}
         * for details.</p>
         *
         * @param {Event} evt - the actual <code>DOM Event</code> object used
         * internally in {@link EventHandler.addEventListener}
         */
        def(me, 'stopPropagation', function() {
            windowEventHandle.cancelBubble = true;
        });
    } else {
        def(me, 'stopPropagation', function(evt) {
            if (!evt) {
                return;
            }

            evt.stopPropagation();
        });
    }
}(this.o2, this, this.document));
