/*!
 * Name    : player_item_manager.js
 * Purpose : Managing the instances of PlayerItem
 *
 * Author  : KUSANAGI Mitsuhisa <mikkun@mbg.nifty.com>
 * Licence : MIT License
 */

/*jslint bitwise, browser, multivar, this*/
/*global EAD, Image, Promise, caches, fetch, self, window*/

EAD.player_item_manager = {};

EAD.player_item_manager.MAX_PLAYER_ITEMS = 4;

EAD.player_items = [];

EAD.player_item_manager.setup = function () {
    "use strict";

    var i = 0;

    while (i < EAD.player_item_manager.MAX_PLAYER_ITEMS) {
        EAD.player_items[i] = EAD.player_items[i] || new EAD.PlayerItem();
        EAD.player_items[i].state = EAD.player_items[i].STATE.GARBAGE;

        i += 1;
    }
};

EAD.player_item_manager.drop = function (enemy_x, enemy_y) {
    "use strict";

    var i = 0;

    while (i < EAD.player_item_manager.MAX_PLAYER_ITEMS) {
        if (EAD.player_items[i].drop(enemy_x, enemy_y)) {
            return;
        }

        i += 1;
    }
};

EAD.player_item_manager.update = function () {
    "use strict";

    var i = 0;

    while (i < EAD.player_item_manager.MAX_PLAYER_ITEMS) {
        EAD.player_items[i].update();

        i += 1;
    }
};

EAD.player_item_manager.draw = function () {
    "use strict";

    var i = 0;

    while (i < EAD.player_item_manager.MAX_PLAYER_ITEMS) {
        if (EAD.player_items[i].state !== EAD.player_items[i].STATE.GARBAGE) {
            EAD.player_items[i].draw();
        }

        i += 1;
    }
};
