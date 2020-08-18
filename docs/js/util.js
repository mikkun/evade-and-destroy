/*!
 * Name    : util.js
 * Purpose : Utility methods
 *
 * Author  : KUSANAGI Mitsuhisa <mikkun@mbg.nifty.com>
 * License : MIT License
 */

// Continue to use JSLint edition 2017-07-01
/*jslint bitwise, browser, multivar, this*/
/*global EAD, Image, Promise, caches, fetch, self, window*/

EAD.util = {};

EAD.util.abs = function (n) {
    "use strict";

    return (n ^ (n >> 31)) - (n >> 31);
};

EAD.util.calcVelocity = function (from, to, speed) {
    "use strict";

    var dx = to.x - from.x,
        dy = to.y - from.y,
        hypotenuse = Math.sqrt(dx * dx + dy * dy),
        ratio = 0;

    if (hypotenuse === 0) {
        return {vx: 0, vy: 0};
    }

    ratio = speed / hypotenuse;

    return {vx: Math.floor(dx * ratio), vy: Math.floor(dy * ratio)};
};

EAD.util.generateTweetUrl = function (query_param) {
    "use strict";

    var WEB_INTENT_URL = "https://twitter.com/intent/tweet",
        query_str = "";

    if (query_param.text) {
        query_str += "&text=" + encodeURIComponent(query_param.text);
    }
    if (query_param.url) {
        query_str += "&url=" + encodeURIComponent(query_param.url);
    }
    if (query_param.hashtags) {
        query_str += "&hashtags=" + encodeURI(query_param.hashtags);
    }
    if (query_param.via) {
        query_str += "&via=" + encodeURI(query_param.via);
    }

    return query_str
        ? WEB_INTENT_URL + "?" + query_str.slice(1)
        : WEB_INTENT_URL;
};

EAD.util.hasCollision = function (circle1, circle2) {
    "use strict";

    var dx = circle2.x - circle1.x,
        dy = circle2.y - circle1.y,
        distance = circle1.r + circle2.r;

    if (EAD.util.abs(dx) > distance || EAD.util.abs(dy) > distance) {
        return false;
    }

    if (dx * dx + dy * dy > distance * distance) {
        return false;
    }

    return true;
};
