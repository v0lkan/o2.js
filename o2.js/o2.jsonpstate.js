/**
 * @module   jsonpstate
 * @requires ajaxstate
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-01-26 08:27:37.092224
 * -->
 *
 * <p>A <strong>Model</strong> for controlling <strong>JSONP</strong> timeouts
 * etc. A {@link JsonpController} should be registered to this
 * <strong>model</strong>.
 */
(function(framework) {
    'use strict';

    /*
     * Aliases
     */
    var me    = framework;
    var clone = framework.MethodHelper.bind;

    /*
     * Base Class
     */
    var base          = framework.AjaxState;
    var baseProtected = base.protecteds;

    /*
     * Common Constants
     */
    var kFunction = 'function';

    /**
     * @class {static} o2.JsonpState
     * @extends o2.AjaxState
     *
     * <p>Implements all public methods of {@link AjaxState} for
     * <strong>JSONP</strong> requests.</p>
     */
    me.JsonpState = {

        // Note that JsonpState uses its own configutarion and state context:
        protecteds : {

            /*
             *
             */
            config : {
                LISTEN_TIMEOUT : 1001
            },

            /*
             *
             */
            state : {
                listenTimeoutId : null
            },

            /*
             *
             */
            observers : []
        }
    };

    function copy(root, base) {
        var key = null;

        for (key in base) {
            if (base.hasOwnProperty(key)) {
                if (typeof base[key] === kFunction) {
                    root[key] = clone(root, base[key]);
                }
            }
        }
    }

    var myState      = me.JsonpState;
    var myProtecteds = myState.protecteds;

    copy(myState     , base);
    copy(myProtecteds, baseProtected);
}(this.o2));
