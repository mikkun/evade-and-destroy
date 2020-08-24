/*!
 * Name    : constr-boss.js
 * Purpose : Constructor for Boss objects
 *
 * Author  : KUSANAGI Mitsuhisa <mikkun@mbg.nifty.com>
 * License : MIT License
 */

// Continue to use JSLint edition 2017-07-01
/*jslint bitwise, browser, multivar, this*/
/*global EAD, Image, Promise, caches, fetch, self, window*/

EAD.Boss = function () {
    "use strict";

    this.x = -EAD.BASE_PX;
    this.y = -EAD.BASE_PX;
    this.r = this.COLLISION_RADIUS;
    this.vx = 0;
    this.vy = 0;
    this.is_damaged = false;
    this.damage = 0;
    this.lives = 0;
    this.time = 0;
    this.pts = 20000;
    this.sprite_x = 0;
    this.sprite_y = 0;
    this.state = this.STATE.GARBAGE;
};

EAD.Boss.BASE_PX = EAD.BASE_PX * 2;
EAD.Boss.INITIAL_LIVES = 128;
EAD.Boss.LIVES_LOW = Math.floor(EAD.Boss.INITIAL_LIVES / 3);
EAD.Boss.TIME_LIMIT = 1600;

EAD.Boss.prototype.COLLISION_RADIUS = 22;
EAD.Boss.prototype.STATE = {
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

EAD.Boss.prototype.update = function (player_x, player_y) {
    "use strict";

    if (this.is_damaged) {
        this.is_damaged = false;
        this.sprite_y -= 1;
    }
    if (this.y < -EAD.BASE_PX) {
        this.state = this.STATE.GARBAGE;
    }

    switch (this.state) {
    case this.STATE.INIT:
        this.x = player_x < EAD.WIDTH / 2
            ? EAD.WIDTH - EAD.WIDTH / 4
            : EAD.WIDTH / 4;
        this.y = -EAD.BASE_PX;
        this.vx = 0;
        this.vy = 4;
        this.lives = EAD.Boss.INITIAL_LIVES;
        this.time = 0;
        this.sprite_x = 4;
        this.sprite_y = 0;
        this.state = this.STATE.STANDBY;
        return;

    case this.STATE.STANDBY:
        this.y += this.vy;
        if (this.y >= -EAD.BASE_PX / 2) {
            this.state = this.STATE.ACTIVE;
        }
        return;

    case this.STATE.INACTIVE:
        break;

    case this.STATE.ACTIVE:
        if (this.y < -EAD.BASE_PX / 2) {
            this.state = this.STATE.INACTIVE;
        }
        break;

    case this.STATE.ATTACK:
        this.state = this.STATE.ACTIVE;
        break;

    case this.STATE.DAMAGED:
        this.lives = this.damage > 1
            ? this.lives - 2
            : this.lives - this.damage;
        this.damage = 0;
        if (this.lives <= 0) {
            EAD.score = EAD.difficulty > EAD.DIFFICULTY_HARD
                ? EAD.score + this.pts * 2
                : EAD.score + this.pts;
            EAD.score = EAD.score > EAD.MAX_SCORE
                ? EAD.MAX_SCORE
                : EAD.score;
            this.x += Math.floor(this.vx / 2);
            this.y += Math.floor(this.vy / 2);
            this.sprite_x = 1;
            this.sprite_y = 0;
            this.state = this.STATE.EXPLODING;
            return;
        }
        this.is_damaged = true;
        this.sprite_y += 1;
        this.state = this.STATE.ACTIVE;
        break;

    case this.STATE.EXPLODING:
        if (this.sprite_y === 0 && this.sprite_x === 3) {
            this.sprite_x = 0;
            this.sprite_y = 1;
        } else if (this.sprite_y === 1 && this.sprite_x === 3) {
            this.sprite_x = 0;
            this.sprite_y = 0;
            this.state = this.STATE.DESTROYED;
        } else {
            this.sprite_x += 1;
        }
        return;

    case this.STATE.DESTROYED:
        this.state = this.STATE.GARBAGE;
        return;

    default:
        this.x = -EAD.BASE_PX;
        this.y = -EAD.BASE_PX;
        this.state = this.STATE.GARBAGE;
        return;
    }

    if (this.time < EAD.Boss.TIME_LIMIT) {
        if (this.time % 55 === 0) {
            this.vx = (Math.floor(Math.random() * 3 - 1)) * 2;
            this.vy = (Math.floor(Math.random() * 3 - 1)) * 3;
            if (this.vy < 0) {
                this.vy = -5;
            }
        }
        if (this.x < EAD.BASE_PX) {
            this.vx = 2;
        } else if (this.x > EAD.WIDTH - EAD.BASE_PX) {
            this.vx = -2;
        }
        if (this.y < EAD.Boss.BASE_PX) {
            this.vy = 3;
        } else if (this.y > player_y - EAD.Boss.BASE_PX * 3) {
            this.vy = -5;
        }
    } else {
        this.vx = 0;
        this.vy -= 1;
    }
    this.x += this.vx;
    this.y += this.vy;
    this.time += 1;
    if (this.lives < EAD.Boss.LIVES_LOW) {
        if (this.vx === 0 && this.vy === 0) {
            if (this.time % 5 === 0) {
                this.state = this.STATE.ATTACK;
            }
        } else {
            if (this.time % 13 === 0) {
                this.state = this.STATE.ATTACK;
            }
        }
    } else {
        if (this.vx === 0 && this.vy === 0) {
            if (this.time % 8 === 0) {
                this.state = this.STATE.ATTACK;
            }
        } else {
            if (this.time % 21 === 0) {
                this.state = this.STATE.ATTACK;
            }
        }
    }
};

EAD.Boss.prototype.draw = function () {
    "use strict";

    EAD.ctx.e_ship.drawImage(
        EAD.mothership,
        EAD.Boss.BASE_PX * this.sprite_x,
        EAD.Boss.BASE_PX * this.sprite_y,
        EAD.Boss.BASE_PX,
        EAD.Boss.BASE_PX,
        this.x - EAD.BASE_PX,
        this.y - EAD.BASE_PX,
        EAD.Boss.BASE_PX,
        EAD.Boss.BASE_PX
    );
};
