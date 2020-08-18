/*!
 * Name    : enemy_manager.js
 * Purpose : Managing the instances of Enemy
 *
 * Author  : KUSANAGI Mitsuhisa <mikkun@mbg.nifty.com>
 * License : MIT License
 */

// Continue to use JSLint edition 2017-07-01
/*jslint bitwise, browser, multivar, this*/
/*global EAD, Image, Promise, caches, fetch, self, window*/

EAD.enemy_manager = {};

EAD.enemy_manager.MAX_ENEMIES = EAD.MAP_COLS * EAD.MAP_ROWS;

EAD.enemies = [];
EAD.enemy_id = 0;

EAD.enemy_manager.setup = function () {
    "use strict";

    var i = 0,
        last_enemy_id = EAD.enemies_map.length - 1;

    while (i < EAD.enemy_manager.MAX_ENEMIES) {
        EAD.enemies[i] = EAD.enemies[i] || new EAD.Enemy();
        EAD.enemies[i].name = EAD.enemies_map[EAD.enemy_id];
        EAD.enemies[i].state = EAD.enemies[i].STATE.INIT;
        EAD.enemies[i].virtual_left = i % EAD.MAP_COLS * EAD.BASE_PX;
        EAD.enemies[i].virtual_top = EAD.HEIGHT -
                EAD.BASE_PX * 2 -
                Math.floor(i / EAD.MAP_COLS) * EAD.BASE_PX;
        EAD.enemies[i].x = EAD.enemies[i].virtual_left + EAD.BASE_PX / 2;
        EAD.enemies[i].y = EAD.enemies[i].virtual_top + EAD.BASE_PX / 2;

        EAD.enemy_id = EAD.enemy_id < last_enemy_id
            ? EAD.enemy_id + 1
            : 0;

        i += 1;
    }
};

EAD.enemy_manager.hideEnemyShips = function () {
    "use strict";

    var i = 0;

    while (i < EAD.enemy_manager.MAX_ENEMIES) {
        if (
            EAD.enemies[i].state === EAD.enemies[i].STATE.STANDBY &&
            !EAD.enemies[i].on_ground
        ) {
            EAD.enemies[i].state = EAD.enemies[i].STATE.GARBAGE;
        }

        i += 1;
    }
};

EAD.enemy_manager.update = function (player_x, player_y) {
    "use strict";

    var i = 0;

    EAD.ctx.e_base.clearRect(0, 0, EAD.WIDTH, EAD.HEIGHT - EAD.BASE_PX);
    EAD.ctx.e_ship.clearRect(0, 0, EAD.WIDTH, EAD.HEIGHT - EAD.BASE_PX);

    while (i < EAD.enemy_manager.MAX_ENEMIES) {
        EAD.enemies[i].update(player_x, player_y);

        i += 1;
    }
};

EAD.enemy_manager.draw = function () {
    "use strict";

    var i = 0,
        last_enemy_id = EAD.enemies_map.length - 1,
        virtual_gap_y = 0;

    while (i < EAD.enemy_manager.MAX_ENEMIES) {
        EAD.enemies[i].virtual_top += EAD.Enemy.SCROLL_GND_VY;

        if (EAD.enemies[i].virtual_top >= EAD.HEIGHT - EAD.BASE_PX) {
            virtual_gap_y = EAD.enemies[i].virtual_top -
                    (EAD.HEIGHT - EAD.BASE_PX);

            EAD.enemies[i].name = EAD.enemies_map[EAD.enemy_id];
            EAD.enemies[i].state = EAD.enemies[i].STATE.INIT;
            EAD.enemies[i].virtual_left = i % EAD.MAP_COLS * EAD.BASE_PX;
            EAD.enemies[i].virtual_top = -EAD.BASE_PX + virtual_gap_y;
            EAD.enemies[i].x = EAD.enemies[i].virtual_left + EAD.BASE_PX / 2;
            EAD.enemies[i].y = EAD.enemies[i].virtual_top + EAD.BASE_PX / 2;

            EAD.enemy_id = EAD.enemy_id < last_enemy_id
                ? EAD.enemy_id + 1
                : 0;
        }

        if (
            EAD.enemies[i].name !== EAD.enemies[i].NAME.EMPTY &&
            EAD.enemies[i].state !== EAD.enemies[i].STATE.GARBAGE
        ) {
            EAD.enemies[i].draw();
        }

        i += 1;
    }
};
