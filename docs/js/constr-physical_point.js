/*!
 * Name    : constr-physical_point.js
 * Purpose : Constructor for PhysicalPoint objects
 *
 * Author  : KUSANAGI Mitsuhisa <mikkun@mbg.nifty.com>
 * Licence : MIT License
 */

/*jslint bitwise, browser, multivar, this*/
/*global EAD, window*/

EAD.PhysicalPoint = function (x, y) {
    "use strict";

    this.x = x;
    this.y = y;

    this.ax = 0;
    this.ay = 0;
    this.vx = 0;
    this.vy = 0;
    this.prev_time = Date.now();
};

EAD.PhysicalPoint.FRICTION = 0.8;

EAD.PhysicalPoint.prototype.setAcceleration = function (ax, ay) {
    "use strict";

    this.ax = ax;
    this.ay = ay;
};

EAD.PhysicalPoint.prototype.update = function () {
    "use strict";

    var curr_time = Date.now(),
        dt = (curr_time - this.prev_time) / 1000;

    this.x += this.vx * dt + 0.5 * this.ax * dt * dt;
    this.y += this.vy * dt + 0.5 * this.ay * dt * dt;

    this.vx += this.ax * dt;
    this.vy += this.ay * dt;
    this.vx *= EAD.PhysicalPoint.FRICTION;
    this.vy *= EAD.PhysicalPoint.FRICTION;

    this.ax = 0;
    this.ay = 0;

    this.prev_time = curr_time;
};
