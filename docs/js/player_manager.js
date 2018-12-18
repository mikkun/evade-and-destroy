/*!
 * Name    : player_manager.js
 * Purpose : Managing the instances of Player
 *
 * Author  : KUSANAGI Mitsuhisa <mikkun@mbg.nifty.com>
 * Licence : MIT License
 */

/*jslint bitwise, browser, multivar, this*/
/*global EAD, Image, caches, fetch, self, window*/

EAD.player_manager = {};

EAD.player = null;

EAD.player_manager.setup = function () {
    "use strict";

    EAD.player = EAD.player || new EAD.Player();
    EAD.player.state = EAD.player.STATE.INIT;
};

EAD.player_manager.update = function () {
    "use strict";

    EAD.player.update();
};

EAD.player_manager.draw = function () {
    "use strict";

    if (EAD.player.state !== EAD.player.STATE.GARBAGE) {
        EAD.player.draw();
    }
};
