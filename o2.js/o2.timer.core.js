/**
 * @module   timer.core
 * @requires core
 * @requires string.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-06-02 22:47:21.699341
 * -->
 *
 * <p>A static class for timeout related operations.</p>
 */
(function(framework, window, UNDEFINED) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

    var exports = {};

    /*
     * Module Name
     */
    var kModuleName = 'Timer';

    /**
     * @class {static} o2.Timer
     *
     * <p>A class for executing repeated timed actions.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * // A unique id for the timer.
     * var kCheckId = 'my_timer';
     *
     * // Auto start timer with id kCheckId to repeat doStuff approximately
     * // every 500 milliseconds, please note that this is an approximation.
     * // for further details see John Resig's excellent article on this:
     * // http://ejohn.org/blog/how-javascript-timers-work/
     * o2.Timer.set(kCheckId, doStuff, 500, {start: true, repeat: true});
     *
     * // Stops the timer (i.e. doStuff will not be executed further).
     * o2.Timer.stop(kCheckId);
     *
     * // Restarts the timer (i.e. doStuff will be periodically executed again).
     * o2.Timer.start(kCheckId);
     * </pre>
     */
    var me = create(kModuleName);

    /*
     * Aliases
     */
    var concat = require('String', 'concat');

    var clearInterval = attr(window, 'clearInterval');
    var clearTimeout  = attr(window, 'clearTimeout');
    var setInterval   = attr(window, 'setInterval');
    var setTimeout    = attr(window, 'setTimeout');

    /*
     * Common Constants
     */
    var kPrefix = 't';

    /*
     * A collection of timers.
     */
    var timers = {};

    /**
     * @function {static} o2.Timer.start
     *
     * <p>Starts/restarts the timer with the given id.
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Timer.start('myTimer');
     * </pre>
     *
     * @param {String} id - the id of the timer to start.
     */
    exports.start = def(me, 'start', function(id) {
        var timerId = concat(kPrefix, id);
        var meta    = timers[timerId];

        if (!meta) {
            return;
        }

        if (meta.shouldRepeat) {
            clearInterval(meta.id);

            meta.id = setInterval(function() {
                meta.delegate();
            }, meta.timeout);

            return;
        }

        clearTimeout(meta.id);

        meta.id = setTimeout(function() {
            meta.delegate();
        }, meta.timeout);
    });

    /*
     *
     */
    var start = require(kModuleName, 'start');

    /**
     * @function {static} o2.Timer.stop
     *
     * <p>Stops the timer with the given id.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Timer.stop('myTimer');
     * </pre>
     *
     * @param {String} id - the id of the timer to stop.
     */
    exports.stop = def(me, 'stop', function(id) {
        var timerId = concat(kPrefix, id);
        var meta    = timers[timerId];

        if (!meta) {
            return;
        }

        if (meta.shouldRepeat) {
            clearInterval(meta.id);

            return;
        }

        clearTimeout(meta.id);
    });

    /*
     *
     */
    var stop = require(kModuleName, 'stop');

    /**
     * @function {static} o2.Timer.set
     *
     * <p>Sets and optionally starts a new timer.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Timer.set('myTimer', function() {
     *      console.log('hello');
     * }, 1000, {repeat : true});
     * </pre>
     *
     * @param {String} id - a unique identifier for the timer.
     * @param {Function} delegate - action to be done when the timer ticks.
     * @param {Integer} timeout - interval of the timer in milliseconds.
     * @param {Object} option - optional configuration in the form
     * <code>{start: true, repeat: true}</code>, if <strong>start</strong>
     * is <code>true</code> timer will start after being set; otherwise
     * it should be explicitly started using the
     * {@link o2.Timer.start} method. If <strong>repeat</strong> is
     * <code>false</code> the delegate will be executed only once, othwerwise
     * it will be executed at each interval until {@link o2.Timer.stop}
     * is called.
     */
    exports.set = def(me, 'set', function(id, delegate, timeout, options) {
        var timerId = concat(kPrefix, id);

        if (timers[timerId]) {
            stop(timerId);

            delete timers[timerId];
        }

        options = options || {};

        if (options.start === UNDEFINED) {
            options.start = true;
        }

        options.repeat = !!options.repeat;
        options.start = !!options.start;

        timers[timerId] = {
            delegate : delegate,
            timeout : timeout,
            id : null,
            shouldRepeat : options.repeat
        };

        if (options.start) {
            start(id);
        }
    });
}(this.o2, this));
