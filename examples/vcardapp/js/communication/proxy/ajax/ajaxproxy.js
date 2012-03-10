/*
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 *
 *  lastModified: 2012-03-10 08:09:06.723901
 * -->
 */
(function(app) {
    'use strict';

    /**
     *
     */
    var me = app.AjaxProxy = {};

    /*
     * Aliases
     */
    var merge = o2.CollectionHelper.merge;
    var get   = o2.Ajax.get;

    /*
     * Callbacks
     */
    var cb                              = app.AjaxCallback;
    var handleShowVCardRequestComplete  = cb.handleShowVCardRequestComplete;
    var handleShowVCardRequestError     = cb.handleShowVCardRequestError;
    var handleShowVCardRequestException = cb.handleShowVCardRequestException;

    var ac  = app.config;
    var acc = ac.constants;

    /*
     * Api
     */
    var kApiUrl = acc.api.URL;

    /*
     * Parameters
     */
    var getVCardParams = ac.serviceParameter.getVCard;

    /**
     *
     */
    me.sendShowVCardRequrest = function(parameters) {
        var params = {};

        merge(params, getVCardParams);
        merge(params, parameters);

        get(kApiUrl, params, {
            oncomplete  : handleShowVCardRequestComplete,
            onerror     : handleShowVCardRequestError,
            onexception : handleShowVCardRequestException
        });

    };
}(this.VCardApp));