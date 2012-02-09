/**
 * @module supports
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-09 08:47:36.155587
 * -->
 *
 * <p>An object support checker.</p>
 */

(function(framework, document) {
    'use strict';

    var use = framework.require;

    /*
     * Aliases
     */
    var myName = use(framework.name);

    var isDomSupported = document.getElementById && document.createElement &&
        document.getElementsByTagName;

    /*
     * Common Constants
     */
    var kTestCookiePrefix = 'tst';
    var kEmpty = '';

    /**
     * @class {static} o2.Supports
     *
     * <p>Checks support for various objects and properties like
     * <strong>DOM</strong>
     * and <strong>cookie</strong>s.</p>
     */
    var me = framework.Supports = {};

    /**
     * @function {static} o2.Supports.cookie
     *
     * <p>Checks for <strong>cookie</strong> support.</p>
     *
     * @return <code>true</code> if <strong>cookie</strong>s are supported,
     * <code>false</code> otherwise.
     */
    me.cookie = function() {
        var testCookieName = [myName, kTestCookiePrefix].join(kEmpty);
        var cookie = me.Cookie;
        var value = null;

        cookie.save(testCookieName, testCookieName, 1);

        try {
            value = cookie.read(testCookieName);
        } catch(ignore) {
        }

        if (value) {
            cookie.remove(testCookieName);

            return true;
        }

        return false;
    };

    /**
     * @function {static} o2.Supports.dom
     *
     * <p>Checks whether <strong>DOM</strong> is adequately supported.
     *
     * @return <code>true</code> if <strong>DOM</strong> is supported,
     * <code>false</code> otherwise.
     */
    me.dom = function() {
        return isDomSupported;
    };

    /**
     * @function {static} o2.Supports.ajax
     *
     * <p>Checks whether <strong>AJAX</strong> is supported.
     *
     * @return <code>true</code> if <strong>AJAX</strong> is supported,
     * <code>false</code> otherwise.
     */
    me.ajax = function() {
        return !!me.Ajax.createXhr();
    };
}(this.o2, this.document));
