/*!
 * Name    : constr-enemy_shot.js
 * Purpose : Constructor for EnemyShot objects
 *
 * Author  : KUSANAGI Mitsuhisa <mikkun@mbg.nifty.com>
 * License : MIT License
 */

// Continue to use JSLint edition 2017-07-01
/*jslint bitwise, browser, multivar, this*/
/*global EAD, Image, Promise, caches, fetch, self, window*/

EAD.EnemyShot = function () {
    "use strict";

    this.name = this.NAME.FROM_BASE;
    this.x = -EAD.BASE_PX;
    this.y = -EAD.BASE_PX;
    this.r = this.COLLISION_RADIUS;
    this.vx = 0;
    this.vy = 0;
    this.sprite_x = 0;
    this.sprite_y = 8;
    this.state = this.STATE.GARBAGE;
};

EAD.EnemyShot.BASE_PX = Math.floor(EAD.BASE_PX / 2);

EAD.EnemyShot.prototype.COLLISION_RADIUS = 4;
EAD.EnemyShot.prototype.NAME = {
    FROM_BASE: 1,
    FROM_SHIP: 2
};
EAD.EnemyShot.prototype.STATE = {
    INIT: 1,
    STANDBY: 2,
    ACTIVE: 4,
    GARBAGE: 10
};

EAD.EnemyShot.prototype.fire = function (enemy_x, enemy_y, on_ground) {
    "use strict";

    if (this.state !== this.STATE.GARBAGE) {
        return false;
    }

    this.name = on_ground
        ? this.NAME.FROM_BASE
        : this.NAME.FROM_SHIP;
    this.x = enemy_x;
    this.y = enemy_y;
    this.state = this.STATE.INIT;

    return true;
};

EAD.EnemyShot.prototype.update = function (player_x, player_y) {
    "use strict";

    var speed = 0,
        velocity = {};

    if (
        this.x < -EAD.EnemyShot.BASE_PX ||
        this.x > EAD.WIDTH + EAD.EnemyShot.BASE_PX ||
        this.y < -EAD.EnemyShot.BASE_PX ||
        this.y > EAD.HEIGHT
    ) {
        this.state = this.STATE.GARBAGE;
    }

    switch (this.state) {
    case this.STATE.INIT:
        speed = this.name === this.NAME.FROM_BASE
            ? 4
            : 6;
        if (EAD.difficulty > EAD.MAX_DIFFICULTY / 2) {
            speed += 1;
        }
        if (EAD.difficulty === EAD.MAX_DIFFICULTY) {
            speed += 1;
        }
        velocity = EAD.util.calcVelocity(
            {x: this.x, y: this.y},
            {x: player_x, y: player_y},
            speed
        );
        break;

    case this.STATE.STANDBY:
        if (this.sprite_y === 8 && this.sprite_x === 0) {
            this.sprite_x = 1;
        }
        this.state = this.STATE.ACTIVE;
        break;

    case this.STATE.ACTIVE:
        break;

    default:
        this.x = -EAD.BASE_PX;
        this.y = -EAD.BASE_PX;
        this.state = this.STATE.GARBAGE;
        return;
    }

    switch (this.name) {
    case this.NAME.FROM_SHIP:
        if (this.state === this.STATE.INIT) {
            this.vx = velocity.vx;
            this.vy = velocity.vy;
            this.sprite_x = 0;
            this.sprite_y = 9;
        } else {
            this.x += this.vx;
            this.y += this.vy;
            this.sprite_x = this.sprite_x === 0
                ? 1
                : 0;
        }
        break;

    default:
        this.name = this.NAME.FROM_BASE;
        if (this.state === this.STATE.INIT) {
            this.vx = velocity.vx;
            this.vy = velocity.vy;
            this.sprite_x = 0;
            this.sprite_y = 8;
        } else {
            this.x += this.vx;
            this.y += this.vy;
        }
    }

    if (this.state === this.STATE.INIT) {
        this.state = this.STATE.STANDBY;
    }
};

EAD.EnemyShot.prototype.draw = function () {
    "use strict";

    EAD.ctx.e_shot.drawImage(
        EAD.sprites,
        EAD.EnemyShot.BASE_PX * this.sprite_x,
        EAD.EnemyShot.BASE_PX * this.sprite_y,
        EAD.EnemyShot.BASE_PX,
        EAD.EnemyShot.BASE_PX,
        Math.floor(this.x - EAD.EnemyShot.BASE_PX / 2),
        Math.floor(this.y - EAD.EnemyShot.BASE_PX / 2),
        EAD.EnemyShot.BASE_PX,
        EAD.EnemyShot.BASE_PX
    );
};
