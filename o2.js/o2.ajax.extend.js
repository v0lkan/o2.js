/**
 * @module   ajax.extend
 * @requires ajax.core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-02-09 09:46:47.145838
 * -->
 *
 * <p>An AJAX controller that implements the <strong>Observer
 * Pattern</strong>.</p>
 */
(function(framework) {
    'use strict';

    var use = framework.require;

    /*
     * Aliases
     */
    var me = use(framework.Ajax);

    /*
     * Caches
     */
    var getCache = {};
    var postCache = {};

    /*
     * Common Constants
     */
    var kDelimeter = ',';

    /*
     *
     */
    function prepareToken(url, parameters) {
        var ar = [];
        var key = null;

        ar.push(url);

        for (key in parameters) {
            if (parameters.hasOwnProperty(key)) {
                ar.push(key);
                ar.push(parameters[key]);
            }
        }

        return ar.join(kDelimeter);
    }

   /**
    * @function {static} o2.Ajax.getSingle
    *
    * <p>Sends a single <strong>AJAX</strong> <strong>GET</strong> request,
    * and discards further requests until a response comes from the first
    * request.</p>
    *
    * <p>Two requests that have identical <strong>URL</strong>s and parameter
    * name-value pairs, are considered uniqe. This method, ensures that no two
    * unique <strong>GET</strong> requests will be fired without waiting for the
    * other.</p>
    *
    * @param {String} url - the URL to send the request.
    * @param {Object} parameters - parameters collection as a name/value
    * pair object ({}).
    * @param {Object} callbacks - An object of the form
    * {oncomplete: fn(responseText, responseXml), onerror: fn(status,
    * statusText), onaborted: fn(xhr),
    * onexception: fn(exception, originalXhr)}.
    * Any of these callbacks are optional.
    *
    * @return the active <code>XMLHttpRequest</code> object.
    *
    * @see o2.Ajax.get
    */
    me.getSingle = function(url, parameters, callbacks) {
        var token = prepareToken(url, parameters);

        var request = getCache[token];

        if (request && !request.isComplete) {
            return getCache[token];
        }

        delete getCache[token];

        getCache[token] = me.get(url, parameters, callbacks);

        return getCache[token];
    };

   /**
    * @function {static} o2.Ajax.postSingle
    *
    * <p>Sends a single <strong>AJAX</strong> <strong>POST</strong> request,
    * and discards further requests until a response comes from the first
    * request.</p>
    *
    * <p>Two requests that have identical <strong>URL</strong>s and parameter
    * name-value pairs, are considered uniqe. This method, ensures that no two
    * unique <strong>POST</strong> requests will be fired without waiting for the
    * other.</p>
    *
    * @param {String} url - the URL to send the request.
    * @param {Object} parameters - parameters collection as a name/value
    * pair object ({}).
    * @param {Object} callbacks - An object of the form
    * {oncomplete: fn(responseText, responseXml), onerror: fn(status,
    * statusText), onaborted: fn(xhr),
    * onexception: fn(exception, originalXhr)}.
    * Any of these callbacks are optional.
    *
    * @return the active <code>XMLHttpRequest</code> object.
    *
    * @see o2.Ajax.post
    */
    me.postSingle = function(url, parameters, callbacks) {
        var token = prepareToken(url, parameters);

        var request = postCache[token];

        if (request && !request.isComplete) {
            return;
        }

        delete postCache[token];

        postCache[token] = me.post(url, parameters, callbacks);
    };
}(this.o2));
