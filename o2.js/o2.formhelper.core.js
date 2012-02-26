/**
 * @module   formhelper
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-26 18:01:14.768561
 * -->
 *
 * <p>A <strong>HTML</strong> form helper module.</p>
 */
(function(framework) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var create    = attr(_, 'create');
    var def       = attr(_, 'define');
    var require   = attr(_, 'require');

    /**
     * @class {static} o2.FormHelper
     *
     * <p>A static <strong>HTML<strong> form helper.</p>
     */
    var me = create('FormHelper');

    /*
     * Aliases
     */
    var $ = require('$');

    /**
     * @function {static} o2.FormHelper.preventMultipleSubmit
     *
     * <p>Prevents the form to re-submit itself when the submit button
     * is pressed more than once.</p>
     *
     * @param {Object} form - A <strong>DOM</strong> reference to the form
     * object or its <code>String</code> id.
     */
    def(me, 'preventMultipleSubmit', function(form) {
        form = $(form);

        if (!form) {
            return;
        }

        form.onsubmit = function() {
            form.onsubmit = function() {
                return false;
            };

            return true;
        };
    });
}(this.o2));
