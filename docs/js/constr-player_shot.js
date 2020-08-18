/*!
 * Name    : constr-player_shot.js
 * Purpose : Constructor for PlayerShot objects
 *
 * Author  : KUSANAGI Mitsuhisa <mikkun@mbg.nifty.com>
 * License : MIT License
 */

/*jslint bitwise, browser, multivar, this*/
/*global EAD, Image, Promise, caches, fetch, self, window*/

EAD.PlayerShot = function () {
    "use strict";

    this.name = this.NAME.NORMAL_SHOT;
    this.x = EAD.WIDTH / 2;
    this.y = EAD.HEIGHT;
    this.r = this.COLLISION_RADIUS;
    this.vy = 0;
    this.power = 1;
    this.sprite_x = 0;
    this.sprite_y = 4;
    this.state = this.STATE.GARBAGE;
};

EAD.PlayerShot.BASE_PX = Math.floor(EAD.BASE_PX / 2);

EAD.PlayerShot.prototype.COLLISION_RADIUS = 6;
EAD.PlayerShot.prototype.NAME = {
    NORMAL_SHOT: 1,
    PLASMA_CANNON: 2
};
EAD.PlayerShot.prototype.STATE = {
    INIT: 1,
    INACTIVE: 3,
    ACTIVE: 4,
    GARBAGE: 10
};

EAD.PlayerShot.prototype.fire = function (energy_red) {
    "use strict";

    if (this.state !== this.STATE.GARBAGE) {
        return false;
    }

    this.name = energy_red > 0
        ? this.NAME.PLASMA_CANNON
        : this.NAME.NORMAL_SHOT;
    this.state = this.STATE.INIT;

    return true;
};

EAD.PlayerShot.prototype.update = function (player_x, player_y) {
    "use strict";

    EAD.ctx.p_shot.clearRect(
        Math.floor(this.x - EAD.PlayerShot.BASE_PX / 2),
        Math.floor(this.y - EAD.PlayerShot.BASE_PX / 2),
        EAD.PlayerShot.BASE_PX,
        EAD.PlayerShot.BASE_PX
    );

    if (this.y < -EAD.PlayerShot.BASE_PX) {
        this.state = this.STATE.GARBAGE;
    }

    switch (this.state) {
    case this.STATE.INIT:
        this.x = player_x;
        this.y = player_y - 14;
        break;

    case this.STATE.INACTIVE:
        break;

    case this.STATE.ACTIVE:
        if (this.y < 0) {
            this.state = this.STATE.INACTIVE;
        }
        break;

    default:
        this.x = EAD.WIDTH / 2;
        this.y = EAD.HEIGHT;
        this.state = this.STATE.GARBAGE;
        return;
    }

    switch (this.name) {
    case this.NAME.PLASMA_CANNON:
        if (this.state === this.STATE.INIT) {
            this.r = this.COLLISION_RADIUS + 4;
            this.vy = -32;
            this.power = 256;
            this.sprite_x = 0;
            this.sprite_y = 5;
        } else {
            this.x = player_x;
            this.y += this.vy;
            this.sprite_x = this.sprite_x === 0
                ? 1
                : 0;
        }
        break;

    default:
        this.name = this.NAME.NORMAL_SHOT;
        if (this.state === this.STATE.INIT) {
            this.r = this.COLLISION_RADIUS;
            this.vy = -16;
            this.power = 1;
            this.sprite_x = 0;
            this.sprite_y = 4;
        } else {
            this.y += this.vy;
            this.sprite_x = this.sprite_x === 0
                ? 1
                : 0;
        }
    }

    if (this.state === this.STATE.INIT) {
        this.state = this.STATE.ACTIVE;
    }
};

EAD.PlayerShot.prototype.draw = function () {
    "use strict";

    EAD.ctx.p_shot.drawImage(
        EAD.sprites,
        EAD.PlayerShot.BASE_PX * this.sprite_x,
        EAD.PlayerShot.BASE_PX * this.sprite_y,
        EAD.PlayerShot.BASE_PX,
        EAD.PlayerShot.BASE_PX,
        Math.floor(this.x - EAD.PlayerShot.BASE_PX / 2),
        Math.floor(this.y - EAD.PlayerShot.BASE_PX / 2),
        EAD.PlayerShot.BASE_PX,
        EAD.PlayerShot.BASE_PX
    );
};
