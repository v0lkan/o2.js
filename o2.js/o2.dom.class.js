/**
 * @module   dom.class
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
 * <p>A utility package to add/remove/modify <code>class</code>es.</p>
 */
(function(framework, UNDEFINED) {
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
    var kModuleName = 'Dom';

    /*
     * Dom (class)
     */
    var me = create(kModuleName);

    /*
     * Aliases
     */

    var $ = require('$');

    var concat = require('String', 'concat');

    /*
     * Common Constants
     */
    var kBeginOrBlank = '(\\s|^)';
    var kBlank        = ' ';
    var kEndOrBlank   = '(\\s|$)';

    /**
     * @function {static} o2.Dom.createClassNameRegExp
     *
     * <p>Creates a regular expression that will match a given
     * <strong>CSS</strong> class name.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var reg = o2.Dom.createClassNameRegExp('testClass');
     * </pre>
     *
     * @param {String} c - The name of the class.
     *
     * @returns a <code>RegExp</code> that matches the given class name.
     */
    exports.createClassNameRegExp = def(me, 'createClassNameRegExp',
                function(c) {
        return new RegExp(concat(kBeginOrBlank, c, kEndOrBlank));
    });

    /*
     *
     */
    var createClassNameRegExp = require(me, 'createClassNameRegExp');

    /**
     * @function {static} o2.Dom.hasClass
     *
     * <p>Checks whether an <strong>element</strong> has the given
     * <strong>className</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * if (o2.Dom.hasClass('container', 'active')) {
     *      doStuff();
     * }
     * </pre>
     *
     * @param {DomNode} el - either the <strong>element</strong>, or the
     * <strong>id</strong> of it.
     * @param {String} c - the <strong>className</strong> to test.
     *
     * @return <code>true</code> if <strong>el</strong> has the
     * <code>className</code> <strong>c</strong>, <code>false</code> otherwise.
     */
    exports.hasClass = def(me, 'hasClass', function(el, c) {
        el = $(el);

        if (!el) {
            return false;
        }

        return createClassNameRegExp(c).test(el.className);
    });

    /*
     *
     */
    var hasClass = require(me, 'hasClass');

    /**
     * @function {static} o2.Dom.addClass
     *
     * <p>Add a class to the given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.addClass('container', 'active');
     * </pre>
     *
     * @param {DomNode} el - either the <strong>element</strong>, or the
     * <strong>id</strong> of it.
     * @param {String} c - the <strong>className</strong> to add.
     */
    exports.addClass = def(me, 'addClass', function(el, c) {
        el = $(el);

        if (!el) {
            return;
        }

        if (hasClass(el, c)) {
            return;
        }

        el.className += concat(kBlank, c);
    });

    /*
     *
     */
    var addClass = require(me, 'addClass');

    /**
     * @function {static} o2.Dom.removeClass
     *
     * <p>Removes a <strong>class</strong> name from the given node.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.removeClass('container', 'active');
     * </pre>
     *
     * @param {DomNode} el - either the <strong>element</strong>, or the
     * <strong>id</strong> of it.
     * @param {String} c - the className to remove.
     */
    exports.removeClass = def(me, 'removeClass', function(el, c) {
        el = $(el);

        if (!el) {
            return;
        }

        if (!hasClass(el, c)) {
            return;
        }

        el.className = el.className.replace(createClassNameRegExp(c), kBlank);
    });

    /*
     *
     */
    var removeClass = require(me, 'removeClass');

    /**
     * @function {static} o2.Dom.toggleClass
     *
     * <p>Toggles the <strong>CSS</strong> <code>className</code> of a given
     * element.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * o2.Dom.toggleClass('container', 'active');
     * </pre>
     *
     * @param {Object} el - the <strong>DOM</strong> element to toggle or its
     * <code>String</code> id.
     * @param {String} c - the class name to toggle.
     * @param {Boolean} state - (Optional, defaults to <code>undefined</code>),
     * if <code>true</code> add class <strong>c</strong> to
     * <strong>el</strong>, if <code>true</code> removes class
     * <strong>c</strong> from <strong>el</strong>. If the parameter is not
     * given, the class is toggled (i.e. added if the class does not exist,
     * and removed if the class exists).
     */
    exports.toggleClass = def(me, 'toggleClass', function(el, c, state) {
        if (state !== UNDEFINED) {
            if (state) {
                addClass(el, c);

                return;
            }

            removeClass(el, c);

            return;
        }

        if (hasClass(el, c)) {
            removeClass(el, c);

            return;
        }

        addClass(el, c);
    });
}(this.o2, this));
