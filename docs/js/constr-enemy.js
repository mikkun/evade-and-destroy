/*!
 * Name    : constr-enemy.js
 * Purpose : Constructor for Enemy objects
 *
 * Author  : KUSANAGI Mitsuhisa <mikkun@mbg.nifty.com>
 * License : MIT License
 */

// Continue to use JSLint edition 2017-07-01
/*jslint bitwise, browser, multivar, this*/
/*global EAD, Image, Promise, caches, fetch, self, window*/

EAD.Enemy = function () {
    "use strict";

    this.name = this.NAME.EMPTY;
    this.x = -EAD.BASE_PX;
    this.y = -EAD.BASE_PX;
    this.r = this.COLLISION_RADIUS;
    this.vx = 0;
    this.vy = 0;
    this.has_weapon = false;
    this.is_damaged = false;
    this.on_ground = false;
    this.damage = 0;
    this.lives = 0;
    this.pts = 0;
    this.sprite_air_x = 0;
    this.sprite_air_y = 3;
    this.sprite_gnd_x = 0;
    this.sprite_gnd_y = 3;
    this.state = this.STATE.INACTIVE;
    this.virtual_left = 0;
    this.virtual_top = 0;
};

EAD.Enemy.RANDOM_RANGE = 256;
EAD.Enemy.SCROLL_GND_VY = 0.5;

EAD.Enemy.prototype.COLLISION_RADIUS = 10;
EAD.Enemy.prototype.NAME = {
    EMPTY: 10,
    RADAR: 21,
    AA_FIXED: 25,
    AA_L2R_1: 31,
    AA_L2R_2: 32,
    AA_R2L_1: 34,
    AA_R2L_2: 35,
    AA_T2B_1: 37,
    AA_T2B_2: 38,
    ANY_SHIP: 40,
    RECON: 50,
    FIGHTER: 60,
    FIGHTER_A: 61,
    FIGHTER_B: 62,
    MISSILE: 70,
    MISSILE_A: 71,
    MISSILE_B: 72,
    METEOR: 80,
    RANDOM: 90
};
EAD.Enemy.prototype.STATE = {
    INIT: 1,
    STANDBY: 2,
    INACTIVE: 3,
    ACTIVE: 4,
    ATTACK: 5,
    DAMAGED: 6,
    EXPLODING: 7,
    REVENGE: 8,
    DESTROYED: 9,
    GARBAGE: 10
};

EAD.Enemy.prototype.update = function (player_x, player_y) {
    "use strict";

    var velocity = {},
        that = this,
        attackRandomly = function (random_range) {
            if (that.state !== that.STATE.ACTIVE) {
                return;
            }
            random_range = random_range < 4
                ? 4
                : random_range;
            if (
                !Math.floor(
                    Math.random() *
                    (2 - EAD.difficulty / EAD.MAX_DIFFICULTY) *
                    (random_range / 2)
                )
            ) {
                that.state = that.STATE.ATTACK;
            }
        };

    if (this.is_damaged) {
        this.is_damaged = false;
        if (this.on_ground) {
            this.sprite_gnd_x -= 1;
        } else {
            this.sprite_air_x -= 1;
        }
    }
    if (
        this.x < -EAD.BASE_PX ||
        this.x > EAD.WIDTH + EAD.BASE_PX ||
        this.y < -EAD.BASE_PX ||
        this.y > EAD.HEIGHT
    ) {
        this.state = this.STATE.GARBAGE;
    }

    switch (this.state) {
    case this.STATE.INIT:
        if (this.name === this.NAME.ANY_SHIP) {
            this.name = EAD.difficulty > EAD.MAX_DIFFICULTY / 4
                ? this.name + 20
                : this.name + 10;
        } else if (this.name === this.NAME.RANDOM) {
            this.name = EAD.difficulty > EAD.MAX_DIFFICULTY / 2
                ? this.name - (Math.floor(Math.random() * 4) + 1) * 10
                : 10;
        }
        if (this.name === this.NAME.FIGHTER) {
            this.name += Math.floor(Math.random() * 2) + 1;
        } else if (this.name === this.NAME.MISSILE) {
            this.name += Math.floor(Math.random() * 2) + 1;
        }
        break;

    case this.STATE.STANDBY:
        if (this.y >= 0) {
            this.state = this.STATE.ACTIVE;
        }
        break;

    case this.STATE.INACTIVE:
        break;

    case this.STATE.ACTIVE:
        if (
            this.x < 0 ||
            this.x > EAD.WIDTH ||
            this.y < 0 ||
            this.y > EAD.HEIGHT - EAD.BASE_PX
        ) {
            this.state = this.STATE.INACTIVE;
        }
        break;

    case this.STATE.ATTACK:
        this.state = this.STATE.ACTIVE;
        break;

    case this.STATE.DAMAGED:
        this.lives -= this.damage;
        this.damage = 0;
        if (this.lives <= 0) {
            EAD.difficulty = (this.on_ground && !this.has_weapon)
                ? EAD.difficulty - this.pts * 4
                : EAD.difficulty + this.pts / 2;
            EAD.difficulty = EAD.difficulty > EAD.MAX_DIFFICULTY
                ? EAD.MAX_DIFFICULTY
                : EAD.difficulty < 0
                    ? 0
                    : EAD.difficulty;
            EAD.hit = this.on_ground
                ? EAD.hit + 2
                : EAD.hit + 1;
            EAD.score += this.pts;
            EAD.score = EAD.score > EAD.MAX_SCORE
                ? EAD.MAX_SCORE
                : EAD.score;
            if (this.on_ground) {
                this.sprite_gnd_x += 2;
            } else {
                this.vx = Math.floor(this.vx / 2);
                this.vy = Math.floor(this.vy / 2);
                this.sprite_air_y = 3;
            }
            this.x += this.vx;
            this.y += this.vy;
            this.sprite_air_x = 1;
            this.state = this.STATE.EXPLODING;
            return;
        }
        this.is_damaged = true;
        if (this.on_ground) {
            this.sprite_gnd_x += 1;
        } else {
            this.sprite_air_x += 1;
        }
        this.state = this.STATE.ACTIVE;
        break;

    case this.STATE.EXPLODING:
        if (!this.on_ground) {
            this.vx = Math.floor(this.vx / 2);
            this.vy = Math.floor(this.vy / 2);
        }
        this.x += this.vx;
        this.y += this.vy;
        if (this.sprite_air_x === 5) {
            this.sprite_air_x = 0;
            this.state = (
                EAD.difficulty === EAD.MAX_DIFFICULTY &&
                !this.on_ground &&
                this.has_weapon &&
                player_y - this.y > EAD.BASE_PX * 3
            )
                ? this.STATE.REVENGE
                : (this.on_ground && !this.has_weapon)
                    ? this.STATE.REVENGE
                    : this.STATE.DESTROYED;
        } else {
            this.sprite_air_x += 1;
        }
        return;

    case this.STATE.REVENGE:
        this.x += this.vx;
        this.y += this.vy;
        this.state = this.STATE.DESTROYED;
        return;

    case this.STATE.DESTROYED:
        this.x += this.vx;
        this.y += this.vy;
        if (!this.on_ground) {
            this.state = this.STATE.GARBAGE;
        }
        return;

    default:
        this.x = -EAD.BASE_PX;
        this.y = -EAD.BASE_PX;
        this.state = this.STATE.GARBAGE;
        return;
    }

    switch (this.name) {
    case this.NAME.RADAR:
        if (this.state === this.STATE.INIT) {
            this.vx = 0;
            this.vy = EAD.Enemy.SCROLL_GND_VY;
            this.has_weapon = false;
            this.on_ground = true;
            this.lives = 4;
            this.pts = 2000;
            this.sprite_air_x = 0;
            this.sprite_air_y = 3;
            this.sprite_gnd_x = 1;
            this.sprite_gnd_y = 4;
        } else {
            this.x += this.vx;
            this.y += this.vy;
        }
        break;

    case this.NAME.AA_FIXED:
        if (this.state === this.STATE.INIT) {
            this.vx = 0;
            this.vy = EAD.Enemy.SCROLL_GND_VY;
            this.has_weapon = true;
            this.on_ground = true;
            this.lives = 2;
            this.pts = 3000;
            this.sprite_air_x = 0;
            this.sprite_air_y = 3;
            this.sprite_gnd_x = 4;
            this.sprite_gnd_y = 4;
        } else {
            this.x += this.vx;
            this.y += this.vy;
            attackRandomly(EAD.Enemy.RANDOM_RANGE);
        }
        break;

    case this.NAME.AA_L2R_1:
        if (this.state === this.STATE.INIT) {
            this.vx = 1;
            this.vy = EAD.Enemy.SCROLL_GND_VY;
            this.has_weapon = true;
            this.on_ground = true;
            this.lives = 2;
            this.pts = 4000;
            this.sprite_air_x = 0;
            this.sprite_air_y = 3;
            this.sprite_gnd_x = 7;
            this.sprite_gnd_y = 4;
        } else {
            this.x += this.vx;
            this.y += this.vy;
            attackRandomly(EAD.Enemy.RANDOM_RANGE);
        }
        break;

    case this.NAME.AA_L2R_2:
        if (this.state === this.STATE.INIT) {
            this.vx = 2;
            this.vy = EAD.Enemy.SCROLL_GND_VY;
            this.has_weapon = true;
            this.on_ground = true;
            this.lives = 2;
            this.pts = 4000;
            this.sprite_air_x = 0;
            this.sprite_air_y = 3;
            this.sprite_gnd_x = 7;
            this.sprite_gnd_y = 4;
        } else {
            this.x += this.vx;
            this.y += this.vy;
            attackRandomly(EAD.Enemy.RANDOM_RANGE);
        }
        break;

    case this.NAME.AA_R2L_1:
        if (this.state === this.STATE.INIT) {
            this.vx = -1;
            this.vy = EAD.Enemy.SCROLL_GND_VY;
            this.has_weapon = true;
            this.on_ground = true;
            this.lives = 2;
            this.pts = 4000;
            this.sprite_air_x = 0;
            this.sprite_air_y = 3;
            this.sprite_gnd_x = 7;
            this.sprite_gnd_y = 4;
        } else {
            this.x += this.vx;
            this.y += this.vy;
            attackRandomly(EAD.Enemy.RANDOM_RANGE);
        }
        break;

    case this.NAME.AA_R2L_2:
        if (this.state === this.STATE.INIT) {
            this.vx = -2;
            this.vy = EAD.Enemy.SCROLL_GND_VY;
            this.has_weapon = true;
            this.on_ground = true;
            this.lives = 2;
            this.pts = 4000;
            this.sprite_air_x = 0;
            this.sprite_air_y = 3;
            this.sprite_gnd_x = 7;
            this.sprite_gnd_y = 4;
        } else {
            this.x += this.vx;
            this.y += this.vy;
            attackRandomly(EAD.Enemy.RANDOM_RANGE);
        }
        break;

    case this.NAME.AA_T2B_1:
        if (this.state === this.STATE.INIT) {
            this.vx = 0;
            this.vy = 1;
            this.has_weapon = true;
            this.on_ground = true;
            this.lives = 2;
            this.pts = 4000;
            this.sprite_air_x = 0;
            this.sprite_air_y = 3;
            this.sprite_gnd_x = 7;
            this.sprite_gnd_y = 4;
        } else {
            this.x += this.vx;
            this.y += this.vy;
            attackRandomly(EAD.Enemy.RANDOM_RANGE);
        }
        break;

    case this.NAME.AA_T2B_2:
        if (this.state === this.STATE.INIT) {
            this.vx = 0;
            this.vy = 2;
            this.has_weapon = true;
            this.on_ground = true;
            this.lives = 2;
            this.pts = 4000;
            this.sprite_air_x = 0;
            this.sprite_air_y = 3;
            this.sprite_gnd_x = 7;
            this.sprite_gnd_y = 4;
        } else {
            this.x += this.vx;
            this.y += this.vy;
            attackRandomly(EAD.Enemy.RANDOM_RANGE);
        }
        break;

    case this.NAME.RECON:
        if (this.state === this.STATE.INIT) {
            this.vx = player_x - this.x > 0
                ? Math.floor((player_x - this.x) / EAD.BASE_PX)
                : player_x - this.x < 0
                    ? Math.ceil((player_x - this.x) / EAD.BASE_PX)
                    : 0;
            this.vy = Math.floor(Math.random() * 3) + 21;
            this.has_weapon = true;
            this.on_ground = false;
            this.lives = 1;
            this.pts = 1500;
            this.sprite_air_x = 0;
            this.sprite_air_y = 5;
        } else {
            if (this.vy === 1) {
                this.sprite_air_x = 1;
                this.state = this.STATE.ATTACK;
            } else if (this.vy === 0) {
                this.sprite_air_x = 2;
            } else if (this.vy === -1) {
                this.x -= this.vx;
            }
            this.x += this.vx;
            this.y += this.vy;
            this.vy -= 1;
        }
        break;

    case this.NAME.FIGHTER_A:
        if (this.state === this.STATE.INIT) {
            this.vx = 0;
            this.vy = 5;
            this.has_weapon = true;
            this.on_ground = false;
            this.lives = 1;
            this.pts = 2000;
            this.sprite_air_x = 4;
            this.sprite_air_y = 5;
        } else {
            if (
                this.y > EAD.BASE_PX &&
                EAD.util.abs(player_x - this.x) < EAD.BASE_PX
            ) {
                if (this.vx === 0) {
                    if (player_x > this.x) {
                        this.vx = -1;
                        this.sprite_air_x = 3;
                    } else {
                        this.vx = 1;
                        this.sprite_air_x = 5;
                    }
                } else {
                    this.vx = this.vx < 0
                        ? this.vx - 1
                        : this.vx + 1;
                }
                this.vy += 2;
                attackRandomly(EAD.Enemy.RANDOM_RANGE / 32);
            } else {
                attackRandomly(EAD.Enemy.RANDOM_RANGE / 4);
            }
            this.x += this.vx;
            this.y += this.vy;
        }
        break;

    case this.NAME.FIGHTER_B:
        if (this.state === this.STATE.INIT) {
            this.vx = 0;
            this.vy = 5;
            this.has_weapon = true;
            this.on_ground = false;
            this.lives = 1;
            this.pts = 2000;
            this.sprite_air_x = 4;
            this.sprite_air_y = 5;
        } else {
            if (this.y > EAD.BASE_PX * 3) {
                if (player_x - this.x > EAD.BASE_PX * 1.5) {
                    this.vx = 5;
                    this.sprite_air_x = 5;
                } else if (this.x - player_x > EAD.BASE_PX * 1.5) {
                    this.vx = -5;
                    this.sprite_air_x = 3;
                } else {
                    this.vx = 0;
                    this.sprite_air_x = 4;
                }
                this.vy = 10;
                attackRandomly(EAD.Enemy.RANDOM_RANGE / 16);
            } else {
                attackRandomly(EAD.Enemy.RANDOM_RANGE / 8);
            }
            this.x += this.vx;
            this.y += this.vy;
        }
        break;

    case this.NAME.MISSILE_A:
        if (this.state === this.STATE.INIT) {
            this.vx = 0;
            this.vy = 5;
            this.has_weapon = false;
            this.on_ground = false;
            this.lives = 1;
            this.pts = 500;
            this.sprite_air_x = 6;
            this.sprite_air_y = 5;
        } else {
            if (
                this.y > EAD.BASE_PX * 2 &&
                EAD.util.abs(player_x - this.x) < EAD.BASE_PX
            ) {
                this.vy = 16;
                this.sprite_air_x = 7;
            }
            this.x += this.vx;
            this.y += this.vy;
        }
        break;

    case this.NAME.MISSILE_B:
        if (this.state === this.STATE.INIT) {
            velocity = EAD.util.calcVelocity(
                {x: this.x, y: this.y},
                {x: player_x, y: player_y},
                16
            );
            this.vx = velocity.vx;
            this.vy = velocity.vy;
            this.has_weapon = false;
            this.on_ground = false;
            this.lives = 1;
            this.pts = 500;
            this.sprite_air_x = 7;
            this.sprite_air_y = 5;
        } else {
            this.x += this.vx;
            this.y += this.vy;
        }
        break;

    case this.NAME.METEOR:
        if (this.state === this.STATE.INIT) {
            this.vx = 0;
            this.vy = Math.floor(Math.random() * 3) + 1;
            this.has_weapon = false;
            this.on_ground = false;
            this.lives = 255;
            this.pts = 1000;
            this.sprite_air_x = 8;
            this.sprite_air_y = 5;
        } else {
            this.y += this.vy;
        }
        break;

    default:
        this.name = this.NAME.EMPTY;
        if (this.state === this.STATE.INIT) {
            this.vx = 0;
            this.vy = 0;
            this.has_weapon = false;
            this.on_ground = false;
            this.lives = 0;
            this.pts = 0;
            this.sprite_air_x = 0;
            this.sprite_air_y = 3;
            this.sprite_gnd_x = 0;
            this.sprite_gnd_y = 3;
        }
    }

    if (this.state === this.STATE.INIT) {
        if (!this.on_ground) {
            this.y -= Math.floor(Math.random() * 2) * EAD.BASE_PX / 2;
        }
        this.state = this.name === this.NAME.EMPTY
            ? this.STATE.INACTIVE
            : this.STATE.STANDBY;
    } else if (this.state === this.STATE.ATTACK) {
        if (
            this.x < EAD.BASE_PX / 2 ||
            this.x > EAD.WIDTH - EAD.BASE_PX / 2 ||
            this.y < EAD.BASE_PX / 2 ||
            this.y > EAD.HEIGHT - EAD.BASE_PX * 6 ||
            player_y === EAD.HEIGHT
        ) {
            this.state = this.STATE.ACTIVE;
        }
    }
};

EAD.Enemy.prototype.draw = function () {
    "use strict";

    if (this.on_ground) {
        EAD.ctx.e_base.drawImage(
            EAD.sprites,
            EAD.BASE_PX * this.sprite_gnd_x,
            EAD.BASE_PX * this.sprite_gnd_y,
            EAD.BASE_PX,
            EAD.BASE_PX,
            Math.floor(this.x - EAD.BASE_PX / 2),
            Math.floor(this.y - EAD.BASE_PX / 2),
            EAD.BASE_PX,
            EAD.BASE_PX
        );
        EAD.ctx.e_base.drawImage(
            EAD.sprites,
            EAD.BASE_PX * this.sprite_air_x,
            EAD.BASE_PX * this.sprite_air_y,
            EAD.BASE_PX,
            EAD.BASE_PX,
            Math.floor(this.x - EAD.BASE_PX / 2),
            Math.floor(this.y - EAD.BASE_PX / 2),
            EAD.BASE_PX,
            EAD.BASE_PX
        );
    } else {
        EAD.ctx.e_ship.drawImage(
            EAD.sprites,
            EAD.BASE_PX * this.sprite_air_x,
            EAD.BASE_PX * this.sprite_air_y,
            EAD.BASE_PX,
            EAD.BASE_PX,
            Math.floor(this.x - EAD.BASE_PX / 2),
            Math.floor(this.y - EAD.BASE_PX / 2),
            EAD.BASE_PX,
            EAD.BASE_PX
        );
    }
};
