/*!
 * Name    : enemy_shot_manager.js
 * Purpose : Managing the instances of EnemyShot
 *
 * Author  : KUSANAGI Mitsuhisa <mikkun@mbg.nifty.com>
 * Licence : MIT License
 */

/*jslint bitwise, browser, multivar, this*/
/*global EAD, Image, caches, fetch, self, window*/

EAD.enemy_shot_manager = {};

EAD.enemy_shot_manager.MAX_ENEMY_SHOTS = 16;

EAD.enemy_shots = [];

EAD.enemy_shot_manager.setup = function () {
    "use strict";

    var i = 0;

    while (i < EAD.enemy_shot_manager.MAX_ENEMY_SHOTS) {
        EAD.enemy_shots[i] = EAD.enemy_shots[i] || new EAD.EnemyShot();
        EAD.enemy_shots[i].state = EAD.enemy_shots[i].STATE.GARBAGE;

        i += 1;
    }
};

EAD.enemy_shot_manager.fire = function (enemy_x, enemy_y, on_ground) {
    "use strict";

    var i = 0;

    while (i < EAD.enemy_shot_manager.MAX_ENEMY_SHOTS) {
        if (EAD.enemy_shots[i].fire(enemy_x, enemy_y, on_ground)) {
            return;
        }

        i += 1;
    }
};

EAD.enemy_shot_manager.update = function (player_x, player_y) {
    "use strict";

    var i = 0;

    EAD.ctx.e_shot.clearRect(0, 0, EAD.WIDTH, EAD.HEIGHT - EAD.BASE_PX);

    while (i < EAD.enemy_shot_manager.MAX_ENEMY_SHOTS) {
        EAD.enemy_shots[i].update(player_x, player_y);

        i += 1;
    }
};

EAD.enemy_shot_manager.draw = function () {
    "use strict";

    var i = 0;

    while (i < EAD.enemy_shot_manager.MAX_ENEMY_SHOTS) {
        if (EAD.enemy_shots[i].state !== EAD.enemy_shots[i].STATE.GARBAGE) {
            EAD.enemy_shots[i].draw();
        }

        i += 1;
    }
};
