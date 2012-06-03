/**
 * @module   supports.core
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-06-02 22:47:21.699341
 * -->
 *
 * <p>An object support checker.</p>
 */
(function(framework, document) {
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
    var kModuleName = 'Supports';

    /**
     * @class {static} o2.Supports
     *
     * <p>Checks support for various objects and properties like
     * <strong>DOM</strong> and <strong>cookie</strong>s.</p>
     */
    var me = create(kModuleName);

    /*
     * Aliases
     */

    var myName = require('name');

    /*
     *
     */
    var isDomSupported = document.getElementById &&
        document.createElement && document.getElementsByTagName;

    /*
     * Common Constants
     */
    var kEmpty            = '';
    var kTestCookiePrefix = 'tst';

    /**
     * @function {static} o2.Supports.ajax
     *
     * <p>Checks whether <strong>AJAX</strong> (At least XmlHttpRequest Level 1)
     * is supported.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isAjaxSupported = o2.Supports.ajax();
     * </pre>
     *
     * @return <code>true</code> if <strong>AJAX</strong> is supported,
     * <code>false</code> otherwise.
     *
     * @throws Exception - if <code>o2.Ajax</code> does not exist.
     */
    exports.ajax = def(me, 'ajax', function() {
        return !!require('Ajax', 'createXhr')();
    });

    /**
     * @function {static} o2.Supports.cookie
     *
     * <p>Checks for <strong>cookie</strong> support.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isCookieSupported = o2.Supports.cookie();
     * </pre>
     *
     * @return <code>true</code> if <strong>cookie</strong>s are supported,
     * <code>false</code> otherwise.
     *
     * @throws Exception - if <code>o2.Cookie</code> does not exist.
     */
    exports.cookie = def(me, 'cookie', function() {
        var testCookieName = [myName, kTestCookiePrefix].join(kEmpty);
        var value = null;

        var kCookie = 'Cookie';
        var save    = require(kCookie, 'save');
        var read    = require(kCookie, 'read');
        var remove  = require(kCookie, 'remove');

        save(testCookieName, testCookieName, 1);

        try {
            value = read(testCookieName);
        } catch(ignore) {
        }

        if (value) {
            remove(testCookieName);

            return true;
        }

        return false;
    });

    /**
     * @function {static} o2.Supports.dom
     *
     * <p>Checks whether <strong>DOM</strong> is adequately supported.
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var isDomSupported = o2.Supports.dom();
     * </pre>
     *
     * @return <code>true</code> if <strong>DOM</strong> is supported,
     * <code>false</code> otherwise.
     */
    exports.dom = def(me, 'dom', function() {
        return isDomSupported;
    });
}(this.o2, this.document));
