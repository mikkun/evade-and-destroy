/*!
 * Name    : boss_manager.js
 * Purpose : Managing the instances of Boss
 *
 * Author  : KUSANAGI Mitsuhisa <mikkun@mbg.nifty.com>
 * License : MIT License
 */

// Continue to use JSLint edition 2017-07-01
/*jslint bitwise, browser, multivar, this*/
/*global EAD, Image, Promise, caches, fetch, self, window*/

EAD.boss_manager = {};

EAD.boss = null;

EAD.boss_manager.setup = function () {
    "use strict";

    EAD.boss = EAD.boss || new EAD.Boss();
    EAD.boss.state = EAD.boss.STATE.GARBAGE;
};

EAD.boss_manager.update = function (player_x, player_y) {
    "use strict";

    EAD.boss.update(player_x, player_y);
};

EAD.boss_manager.draw = function () {
    "use strict";

    if (EAD.boss.state !== EAD.boss.STATE.GARBAGE) {
        EAD.boss.draw();
    }
};
