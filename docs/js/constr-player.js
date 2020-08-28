/*!
 * Name    : constr-player.js
 * Purpose : Constructor for Player objects
 *
 * Author  : KUSANAGI Mitsuhisa <mikkun@mbg.nifty.com>
 * License : MIT License
 */

// Continue to use JSLint edition 2017-07-01
/*jslint bitwise, browser, multivar, this*/
/*global EAD, Image, Promise, caches, fetch, self, window*/

EAD.Player = function () {
    "use strict";

    EAD.curr_x = EAD.WIDTH / 2;

    this.x = EAD.WIDTH / 2;
    this.y = EAD.HEIGHT;
    this.r = this.COLLISION_RADIUS;
    this.point = new EAD.PhysicalPoint(EAD.WIDTH / 2, EAD.HEIGHT);
    this.energy_red = 0;
    this.energy_green = 0;
    this.energy_blue = 0;
    this.lives = 0;
    this.bonus_count = 0;
    this.power = 256;
    this.sprite_x = 1;
    this.sprite_y = 2;
    this.state = this.STATE.INACTIVE;
};

EAD.Player.INITIAL_ENERGY_GREEN = 200;
EAD.Player.INITIAL_LIVES = 3;
EAD.Player.MAX_LIVES = 99;
EAD.Player.BONUS_EVERY = 100000;
EAD.Player.THRUST = 12;

EAD.Player.prototype.COLLISION_RADIUS = 4;
EAD.Player.prototype.STATE = {
    INIT: 1,
    STANDBY: 2,
    INACTIVE: 3,
    ACTIVE: 4,
    ATTACK: 5,
    DAMAGED: 6,
    EXPLODING: 7,
    DESTROYED: 9,
    GARBAGE: 10
};

EAD.Player.prototype.update = function () {
    "use strict";

    var that = this,
        move = function () {
            that.point.update();
            that.point.setAcceleration(
                (EAD.curr_x - that.point.x) * EAD.Player.THRUST,
                0
            );
            that.x = that.point.x < EAD.BASE_PX / 2
                ? EAD.BASE_PX / 2
                : that.point.x > EAD.WIDTH - EAD.BASE_PX / 2
                    ? EAD.WIDTH - EAD.BASE_PX / 2
                    : that.point.x;
            if (that.energy_green > 0) {
                that.energy_green -= 1;
                that.sprite_x = that.sprite_x === 1
                    ? 2
                    : 1;
            } else {
                that.sprite_x = 1;
            }
        };

    EAD.ctx.p_ship.clearRect(
        Math.floor(this.x - EAD.BASE_PX / 2),
        Math.floor(this.y - EAD.BASE_PX / 2),
        EAD.BASE_PX,
        EAD.BASE_PX
    );

    switch (this.state) {
    case this.STATE.INIT:
        this.x = EAD.WIDTH / 2;
        this.y = EAD.HEIGHT;
        this.energy_red = 0;
        this.energy_green = EAD.Player.INITIAL_ENERGY_GREEN;
        this.energy_blue = 0;
        this.lives = EAD.Player.INITIAL_LIVES;
        this.bonus_count = 1;
        this.sprite_x = 1;
        this.sprite_y = 2;
        this.state = this.STATE.INACTIVE;
        break;

    case this.STATE.STANDBY:
        EAD.curr_x = EAD.WIDTH / 2;
        this.x = EAD.curr_x;
        this.y = EAD.HEIGHT - EAD.BASE_PX * 2;
        this.point.x = this.x;
        this.point.y = this.y;
        this.point.ax = 0;
        this.point.ay = 0;
        this.point.vx = 0;
        this.point.vy = 0;
        this.state = this.STATE.ACTIVE;
        break;

    case this.STATE.INACTIVE:
        break;

    case this.STATE.ACTIVE:
        move();
        break;

    case this.STATE.ATTACK:
        move();
        break;

    case this.STATE.DAMAGED:
        this.sprite_x = 1;
        this.sprite_y = 3;
        this.state = this.STATE.EXPLODING;
        break;

    case this.STATE.EXPLODING:
        if (this.sprite_x === 5) {
            this.sprite_x = 0;
            this.state = this.STATE.DESTROYED;
        } else {
            this.sprite_x += 1;
        }
        break;

    case this.STATE.DESTROYED:
        this.lives -= 1;
        if (this.lives > 0) {
            EAD.difficulty -= Math.floor(EAD.difficulty * 0.05);
            EAD.difficulty = EAD.difficulty < 0
                ? 0
                : EAD.difficulty;
            this.x = EAD.WIDTH / 2;
            this.y = EAD.HEIGHT - EAD.BASE_PX * 2;
            this.energy_red = 0;
            this.energy_green = EAD.Player.INITIAL_ENERGY_GREEN;
            this.energy_blue = 0;
            this.sprite_x = 1;
            this.sprite_y = 2;
            this.state = this.STATE.STANDBY;
        } else {
            this.state = this.STATE.GARBAGE;
        }
        break;

    default:
        this.y = EAD.HEIGHT;
        this.state = this.STATE.GARBAGE;
    }
};

EAD.Player.prototype.draw = function () {
    "use strict";

    EAD.ctx.p_ship.drawImage(
        EAD.sprites,
        EAD.BASE_PX * this.sprite_x,
        EAD.BASE_PX * this.sprite_y,
        EAD.BASE_PX,
        EAD.BASE_PX,
        Math.floor(this.x - EAD.BASE_PX / 2),
        Math.floor(this.y - EAD.BASE_PX / 2),
        EAD.BASE_PX,
        EAD.BASE_PX
    );
};
