/*!
 * Name    : constr-player_item.js
 * Purpose : Constructor for PlayerItem objects
 *
 * Author  : KUSANAGI Mitsuhisa <mikkun@mbg.nifty.com>
 * Licence : MIT license
 */

/*jslint bitwise, browser, multivar, this*/
/*global EAD, window*/

EAD.PlayerItem = function () {
    "use strict";

    this.name = this.NAME.NO_ITEM;
    this.x = -EAD.BASE_PX;
    this.y = -EAD.BASE_PX;
    this.r = this.COLLISION_RADIUS;
    this.vy = 0;
    this.sprite_x = 0;
    this.sprite_y = 3;
    this.state = this.STATE.GARBAGE;
};

EAD.PlayerItem.ENERGY_RED = 600;
EAD.PlayerItem.ENERGY_GREEN = 400;
EAD.PlayerItem.ENERGY_BLUE = 256;

EAD.PlayerItem.prototype.COLLISION_RADIUS = 20;
EAD.PlayerItem.prototype.NAME = {
    NO_ITEM: 1,
    R_PLASMA: 2,
    G_GODMODE: 3,
    B_FLASH: 4
};
EAD.PlayerItem.prototype.STATE = {
    INIT: 1,
    ACTIVE: 4,
    GARBAGE: 10
};

EAD.PlayerItem.prototype.drop = function (enemy_x, enemy_y) {
    "use strict";

    var n = Math.random();

    if (this.state !== this.STATE.GARBAGE) {
        return false;
    }

    if (n < 0.2) {
        this.name = this.NAME.R_PLASMA;
    } else if (n < 0.3) {
        this.name = this.NAME.G_GODMODE;
    } else if (n < 0.5) {
        this.name = this.NAME.B_FLASH;
    } else {
        this.name = this.NAME.NO_ITEM;
    }
    this.x = enemy_x;
    this.y = enemy_y;
    this.state = this.STATE.INIT;

    return true;
};

EAD.PlayerItem.prototype.update = function () {
    "use strict";

    EAD.ctx.p_item.clearRect(
        Math.floor(this.x - EAD.BASE_PX / 2),
        Math.floor(this.y - EAD.BASE_PX / 2),
        EAD.BASE_PX,
        EAD.BASE_PX
    );

    if (this.y > EAD.HEIGHT) {
        this.state = this.STATE.GARBAGE;
    }

    switch (this.state) {
    case this.STATE.INIT:
        this.vy = 3;
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
    case this.NAME.R_PLASMA:
        if (this.state === this.STATE.INIT) {
            this.sprite_x = 3;
            this.sprite_y = 2;
        } else {
            this.y += this.vy;
        }
        break;

    case this.NAME.G_GODMODE:
        if (this.state === this.STATE.INIT) {
            this.sprite_x = 4;
            this.sprite_y = 2;
        } else {
            this.y += this.vy;
        }
        break;

    case this.NAME.B_FLASH:
        if (this.state === this.STATE.INIT) {
            this.sprite_x = 5;
            this.sprite_y = 2;
        } else {
            this.y += this.vy;
        }
        break;

    default:
        this.name = this.NAME.NO_ITEM;
        if (this.state === this.STATE.INIT) {
            this.vy = 0;
            this.sprite_x = 0;
            this.sprite_y = 3;
        }
    }

    if (this.state === this.STATE.INIT) {
        this.state = this.name === this.NAME.NO_ITEM
            ? this.STATE.GARBAGE
            : this.STATE.ACTIVE;
    }
};

EAD.PlayerItem.prototype.draw = function () {
    "use strict";

    EAD.ctx.p_item.drawImage(
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
