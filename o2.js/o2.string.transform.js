/**
 * @module   string.transform
 * @requires core
 *
 * <!--
 *  This program is distributed under
 *  the terms of the MIT license.
 *  Please see the LICENSE file for details.
 * -->
 *
 * <p>This package is responsible for simple <code>String</code> transformation
 * operations.</p>
 */
(function(framework, fp) {
    'use strict';

    // Ensure that dependencies have been loaded.
    fp.ensure('string.transform', ['core']);

    var attr   = fp.getAttr,
        create = attr(fp, 'create'),
        def    = attr(fp, 'define'),

        /*
         * Module Exports
         */
        exports = {},

        /*
         * Module Name
         */
        kModuleName = 'String',

        /*
         * String (transform)
         */
        me = create(kModuleName),

        /*
         * Common Regular Expressions
         */
        kAllCapsRegExp            = /([A-Z])/g,
        kCamelCaseRegExp          = /(\-[a-z])/g,
        kLineBreakToNewLineRegExp = /<br\s*\/?>/g,
        kNewLineToLineBreakRegExp = /\r\n|\n|\r/g,
        //kRemoveTagsRegExp       = /<[\/]?([a-zA-Z0-9]+)[^><]*>/ig;

        /*
         * Common Text
         */
        kBr               = '<br />',
        kDash             = '-',
        kEllipsis         = '&hellip;',
        kEmpty            = '',
        kJsonNotSupported = 'JSON support cannot be found!',
        kNewLine          = '\n',
        kUnderscore       = '_',

        /*
         * <p>Maximum length, after which the string is truncated with an
         * ellipsis (...)</p>
         */
        kTruncationLength = 100;

    /**
     * @function {static} o2.String.br2nl
     *
     * <p>Replaces HTML [br /] tags with new line.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var replaced = o2.String.br2nl('hello<br />world.');
     * </pre>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */
    exports.br2nl = def(me, 'br2nl', function(str) {
        return str.replace(kLineBreakToNewLineRegExp, kNewLine);
    });

    /**
     * @function {static} o2.String.nl2br
     *
     * <p>Replaces new lines [\n] with HTML [br /] tags.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var replaced = o2.String.nl2br('hello\nworld.');
     * </pre>
     *
     * @param {String} str - the <code>String</code> to format.
     *
     * @return the formatted <code>String</code>.
     */
    exports.nl2br = def(me, 'nl2br', function(str) {
        return str.replace(kNewLineToLineBreakRegExp, kBr);
    });

    /**
     * @function {static} o2.String.toCamelCase
     *
     * <p>Converts the input to camel case.</p>
     * <p>i.e. if input is 'lorem-ipsum', the output is 'loremIpsum'.</p>
     * <p>This is especially useful for converting <code>CSS</code> classes
     * to their <strong>DOM</strong> style representations.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var camelized = o2.String.toCamelCase('font-family');
     * </pre>
     *
     * @param {String} input - the <code>String</code> to convert.
     *
     * @return the formatted String.
     */
    exports.toCamelCase = def(me, 'toCamelCase', function(input) {
        return input.replace(kCamelCaseRegExp, function(match) {
            return match.toUpperCase().replace(kDash, kEmpty);
        });
    });

    /**
     * @function {static} o2.String.toDashedFromCamelCase
     *
     * <p>Converts a <code>String</code> of the form 'loremIpsum' to
     * 'lorem-ipsum'.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var dashed = o2.String.toDashedFromCamelCase('fontFamily');
     * </pre>
     *
     * @param {String} input - the <code>String</code> to convert.
     *
     * @return the formatted <code>String</code>.
     */
    exports.toDashedFromCamelCase = def(me, 'toDashedFromCamelCase',
                function(input) {
        return input.replace(kAllCapsRegExp, function(match) {
            return [kDash, match.toLowerCase()].join(kEmpty);
        });
    });

    /**
     * @function {static} o2.String.toJson
     *
     * <p>Converts the given <code>String</code> to a <strong>JSON</strong>
     * object.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var parsed = o2.String.toJson('{"name" : "value"}');
     * </pre>
     *
     * @param {String} str - the <code>String</code> to convert.
     *
     * @return the converted <strong>JSON</strong> <code>Object</code>.
     *
     * @throws Exception - if <strong>str</strong> is not a well-formed
     * <strong>JSON</strong> <code>String</code>.
     */
    exports.toJson = def(me, 'toJson', function(str) {
        if (!JSON) {throw kJsonNotSupported;}

        return JSON.parse(str);
    });

    /**
     * @function {static} o2.String.toUnderscoreFromCamelCase
     *
     * <p>Converts a <code>String</code> of the form 'loremIpsum' to
     * 'lorem_ipsum'.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var replaced = o2.String.toUnderscoreFromCamelCase('fontFamily');
     * </pre>
     *
     * @param {String} input - the <code>String</code> to convert.
     *
     * @return the formatted <code>String</code>.
     */
    exports.toUnderscoreFromCamelCase = def(me, 'toUnderscoreFromCamelCase',
                function(input) {
        return input.replace(kAllCapsRegExp, function(match) {
            return [kUnderscore, match.toLowerCase()].join(kEmpty);
        });
    });

    /**
     * @function {static} o2.String.truncate
     *
     * <p>Adds an ellipsis (&hellip;), if the length of the <code>String</code>
     * is greater than <strong>maxLen</strong>.</p>
     *
     * <p><strong>Usage example:</strong></p>
     *
     * <pre>
     * var truncated = o2.String.truncate('This ... is a very long String.');
     * </pre>
     *
     * @param {String} str - the <code>String</code> to process.
     * @param {Integer} maxLen - Optional (defaults TRUNCATION_LENGTH},
     * maximum <code>String</code> length that's allowed without truncation.
     *
     * @return the processed <code>String</code>.
     */
    exports.truncate = def(me, 'truncate', function(str, maxLen) {
        var eLen      = kEllipsis.length,
            maxLength = maxLen || kTruncationLength;

        if (str.length > maxLength) {
            return [str.substr(0, maxLength - eLen), kEllipsis].join(kEmpty);
        }

        return str;
    });
}(this.o2, this.o2.protecteds));
