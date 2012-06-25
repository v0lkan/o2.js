/**
 * @module   ajaxcontroller.core
 * @requires ajaxstate.core
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-06-03 00:12:56.288837
 * -->
 *
 * <p>An AJAX controller that implements the <strong>Observer
 * Pattern</strong>.</p>
 */
(function(framework) {
    'use strict';

    var _         = framework.protecteds;
    var attr      = _.getAttr;
    var construct = attr(_, 'construct');
    var proto     = attr(_, 'proto');
    var require   = attr(_, 'require');

    var exports = {};

    /*
     * Module Name
     */
    var kModuleName = 'AjaxController';

    /*
     * Aliases
     */

    var nill = require('nill');

    var state = require('AjaxState');

    /**
     * @class o2.AjaxController
     * @implements Observer
     *
     * <p>An AJAX <code>Controller</code>. Registers itself to {@link
     * AjaxState} <code>Observable</code> upon construction.</p>
     *
     * <p>Implements the <code>Observer</code> interface.</p>
     */

    /**
     * @constructor o2.AjaxController.AjaxController
     *
     * <p>See
     * http://download.oracle.com/javase/1.4.2/docs/api/java/util/Observer.html
     * </p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var request = o2.Ajax.get('/api.php', {
     *      name   : 'Volkan Özçelik',
     *      action : 'add'
     * }, {
     *      oncomplete  : function(text, xml, xhr, status) {},
     *      onerror     : function(statusCode, statusText, xhr) {},
     *      onaborted   : function(xhr) {},
     *      onexception : function(exception, xhr) {}
     * });
     *
     * // The request will time out after 5 seconds and then ontimeout
     * // will be called.
     * var controller = new o2.AjaxController(requrest, {
     *      timeout   : 5000,
     *      ontimeout : function() {
     *      }
     * });
     * </pre>
     *
     * @param {XmlHttpRequest} xhr - the original XmlHttpRequest
     * @param {Object} args - an associative array in the form
     * {timeout:[timeoutInMilliSeconds], ontimeout: [function]}
     * both attributes are optional.
     */
    exports.AjaxController = construct(kModuleName, function(xhr, args) {
        this.xhr = xhr;
        this.timeout = (args && args.timeout) || null;
        this.ontimeout = (args && args.ontimeout) || nill;
        this.isDeleted = false;

        // Register self.
        state.addObserver(this);
    });

    /*
     *
     */
    var me = exports.AjaxController;

    /**
     * @function {virtual} o2.AjaxController.update
     *
     * <p>Implementation of the <code>Observer.update</code> interface
     * method.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var controller = new o2.AjaxController(xhr, params);
     *
     * ...
     *
     * // Timeout the AJAX request immediately.
     * controller.update({isTimedOut : true});
     * </pre>
     *
     * <p>{@link o2.JsonpController} overrides this implementation.</p>
     *
     * @param {Object} data - parameters passed from the <code>Observable</code>
     * to this <code>Observer</code>.
     */
    exports.update = proto(me, 'update', function(data) {
        if (!data.isTimedOut) {
            return;
        }

        // Unregister self from the observable.
        this.unregister();

        // Abort the request.
        this.xhr.abort();

        // Execute callback.
        this.ontimeout();
    });

    /**
     * @function {virtual} o2.AjaxController.unregister
     *
     * <p>Unregisters the object from the observer.</p>
     * <p>Call this when the <strong>AJAX</strong> request completes.</p>
     *
     * <p>{@link o2.JsonpController} overrides this implementation.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var controller = new o2.AjaxController(xhr, params);
     *
     * ...
     *
     * // The o2.AjaxState no longer listens to this Controller.
     * controller.unregister();
     * </pre>
     *
     */
    exports.unregister = proto(me, 'unregister', function() {
        if (this.isDeleted) {
            return;
        }

        state.deleteObserver(this);
    });
}(this.o2, this));
