/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */
(function(framework, fp, window) {
    'use strict';

    /**
     * @module   object.core
     *
     * @requires core
     * @requires collection.core
     * @requires string.core
     *
     * <p>An object/clone/copy/inheritance helper.</p>
     */
    fp.ensure(
        'object.core',
    [
        'core',
        'collection.core',
        'string.core'
    ]);

    var attr    = fp.getAttr,
        alias   = attr(fp, 'alias'),
        create  = attr(fp, 'create'),
        def     = attr(fp, 'define'),
        require = attr(fp, 'require'),

        /*
         * # Module Exports
         */

        exports = {},

        /*
         * # Module Definition
         */

        kModuleName = 'Object',

        /**
         * @class {static} o2.Object
         *
         * <p>A helper class for <strong>JavaScript</strong> <code>Object</code>
         * inheritance.</p>
         */
        me = create(kModuleName),

        /*
         * # Aliases
         */

        /*
         * core
         */
        frameworkName = require('name'),

        /*
         * string.core
         */
        kString = 'String',
        format  = require(kString, 'format'),
        concat  = require(kString, 'concat'),

        /*
         * collection.core
         */
        toArray = require('Collection', 'toArray'),

        /*
         * native/shim
         */
        JSON = window.JSON,

        /*
         * # Common Constants
         */

        kNoJsonSupport = concat(frameworkName,
            ': {0}: No JSON support. quitting'),
        kFunction      = 'function',
        kObject        = 'object';

    /**
     * @function {static} o2.Object.copy
     *
     * <p>Copies members from <strong>base</strong> to
     * <strong>child</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var base = {lorem : 1};
     * var child = {ipsum : 2};
     * o2.Object.copy(child, base);
     * // child is now {lorem : 1, ipsum : 2}
     * </pre>
     *
     * @param {Object} child
     * @param {Object} base
     *
     * @see o2.Collection.union
     */
    exports.copy = def(me, 'copy', function(child, base) {
        var key = null;

        for (key in base) {
            if (base.hasOwnProperty(key)) {
                child[key] = base[key];
            }
        }
    });

    /**
     * @function {static} o2.Object.copyMethods
     * <p>Copies <strong>base</strong>'s methods, to
     * <strong>child</strong>.  </p>
     * <p>Note that the methods are copied by ref. Therefore any change in
     * <strong>base</strong> object's methods will be directly reflected to
     * the <strong>child</strong> object.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var child = {lorem : 1};
     * var base = {ipsum : function() {}};
     * o2.Object.copyMethods(child, base);
     * // child is now {lorem : 1, ipsum : function() {}}
     * </pre>
     *
     * @param {Object} child - the child <strong>object</strong> to copy
     * methods to.
     * @param {Object} base - the base <strong>object</strong> to copy
     * methods from.
     */
    exports.copyMethods = def(me, 'copyMethods', function(child, base) {
        var key   = null,
            value = null;

        for (key in base) {
            if (base.hasOwnProperty(key)) {
                value = base[key];

                if (typeof value === kFunction) {
                    child[key] = value;
                }
            }
        }
    });

    /**
     * @function {static} o2.Object.copyPrototype
     *
     * <p>Copies every propery in <strong>base.prototype</strong>, to
     * <strong>child.prototype</strong>.</p>
     * <p>This is similar to extending <strong>child</strong>
     * to <strong>base</strong>.</p>
     * <p>Note that the methods are copied by ref. Therefore any change in
     * <strong>base</strong> object's prototype methods will be directly
     * reflected to the <strong>child</strong> object's protoype.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var Child = function() {};
     * Child.prototype.method1 = function() {};
     * var Base = function() {};
     * Base.prototype.method2 = function() {};
     * o2.Object.copyPrototype(Child, Base);
     * // Child.prototype has both method1 and method2 now.
     * </pre>
     *
     * @param {Object} child - the child <strong>object</strong> to copy
     * methods to.
     * @param {Object} base - the base <strong>object</strong> to copy
     * methods from.
     */
    exports.copyPrototype = def(me, 'copyPrototype', function(child, base) {
        var baseProto  = base.prototype,
            childProto = child.prototype,
            key        = null;

        if (!childProto) {return;}
        if (!baseProto ) {return;}

        for (key in baseProto) {
            if (baseProto.hasOwnProperty(key)) {
                childProto[key] = baseProto[key];
            }
        }
    });

    /**
     * @function {static} o2.Object.extend
     *
     * <p>A simple way of extending objects.<p>
     * <p>Although the so called "object-oriented <strong>JavaScript</strong>"
     * is rarely useful and is against the <strong>functional</strong> nature of
     * the language, this helper method may be handy at times.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * function Fruit() {}
     * Fruit.prototype.grow = function() {};
     * Fruit.prototype.name = 'fruit';
     *
     * function Apple() {}
     * Apple.prototype.name = 'Steve';
     *
     * o2.Object.extend(Apple, Fruit, new Fruit());
     *
     * var fruit = new Fruit();
     * var apple = new Apple();
     *
     * log(typeof apple.grow); // function
     * log(apple.constructor); // Apple
     * log(apple.parent);      // {grow: function(){}, name : 'fruit'}
     * log(apple.name);        // 'Steve'
     * log(apple.parent.name); // 'fruit'
     * </pre>
     *
     * @param {Function} childConstructor - the child object.
     * @param {Function} baseConstructor - the <code>Object</code> to extend.
     * @param {Object} baseConstructed - base object initialized to a default
     * state.
     */
    exports.extend = def(me, 'extend', function(childConstructor,
                baseConstructor, baseConstructed) {
        var Junction = function(){};

        childConstructor.prototype             = new Junction();
        Junction.prototype                     = baseConstructed;
        childConstructor.prototype.constructor = childConstructor;
        childConstructor.prototype.parent      = baseConstructor.prototype;
    });

    /**
     * @function {static} o2.Object.toArray
     *
     * <p>Converts a given <code>Object</code> to an <code>Array</code>.</p>
     *
     * @param {Object} obj - the <code>Object</code> to convert to an
     * <code>Array</code>.
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var obj = {lorem : 1, ipsum : 2};
     * var ar = o2.Object.toArray(obj);
     * // ar will be [1, 2]
     * </pre>
     *
     * @return the converted <code>Array</code>.
     *
     * @see o2.Collection.toArray
     */
    exports.toArray = def(me, 'toArray', function(obj) {
        return toArray(obj);
    });

    /**
     * o2.Object.toJsonString
     *
     * <p>Converts the <code>Object</code> to a <strong>JSON</strong>
     * <code>String</code>, if <strong>JSON</strong> is supported.
     * you can use 3rdparty/json2/json2.js to add cross-browser
     * <strong>JSON</strong> support.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var obj = {lorem : 1};
     * var str = o2.Object.toJsonString(obj);
     * // str will be '{"lorem":1}' (a serialized String literal)
     * </pre>
     *
     * @param {Object} obj - the <code>Object</code> to convert to a
     * <strong>JSON</strong> <code>String</code>.
     *
     * @return the converted <strong>JSON</strong> <code>String</code>.
     */
    exports.toJsonString = def(me, 'toJsonString', function(obj) {
        var kMethodName = 'Object.toJsonString';

        if (JSON) {
            return JSON.stringify(obj);
        }

        throw format(kNoJsonSupport, kMethodName);
    });

    /**
     * @function {static} o2.Object.stringify
     *
     * <p>An <strong>alias</strong> to {@link o2.Object.toJsonString}.</p>
     *
     * @see o2.Object.toJsonString
     */
    exports.stringify = alias(me, 'stringify', 'toJsonString');

    /**
     * @function {static} o2.Object.touch
     *
     * <p>Executes the delegate by passing the <strong>obj</strong> to it as a
     * parameter, then returns the <strong>obj</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var obj = {lorem : '1'};
     * o2.Object.touch(obj, function(o) {
     *   o.lorem = '3';
     * });
     * // now obj is {lorem : '3'}
     * </pre>
     *
     * @param {Object} obj - the <code>Object</code> to touch.
     * @param {Function} delegate - the delegate to execute
     * on <strong>obj</strong>.
     *
     * @return <code>null</code> if <strong>obj</strong> is falsy or it's a
     * primitive type; returns the <strong>obj</strong> itself (after applying
     * delagate to it) otherwise.
     */
    exports.touch = def(me,'touch', function(obj, delegate) {
        if (!obj                  ) {return null;}
        if (typeof obj !== kObject) {return null;}

        delegate(obj);

        return obj;
    });
}(this.o2, this.o2.protecteds, this));

