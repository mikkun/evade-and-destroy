/*!
 * Name    : init.js
 * Purpose : Initializing the game environment
 *
 * Author  : KUSANAGI Mitsuhisa <mikkun@mbg.nifty.com>
 * Licence : MIT License
 */

/*jslint bitwise, browser, multivar, this*/
/*global EAD, Image, caches, fetch, self, window*/

var EAD = {};

EAD.FPS = 30;
EAD.WIDTH = 320;
EAD.HEIGHT = 480;
EAD.MAP_COLS = 10;
EAD.MAP_ROWS = 15;
EAD.BASE_PX = 32;
EAD.BG_COLOR = "rgb(0, 0, 0)";
EAD.FONT_COLOR = "rgb(255, 255, 255)";
EAD.FONT_FACE = "bold 12px monospace";
EAD.MAX_DIFFICULTY = 320000;
EAD.MAX_SCORE = 100000000;

EAD.canvas = {};
EAD.ctx = {};
EAD.layers = [
    "bg01",
    "bg02",
    "e_base",
    "p_shot",
    "e_shot",
    "e_ship",
    "p_item",
    "p_ship",
    "front"
];

EAD.prev_x = 0;
EAD.prev_y = 0;
EAD.curr_x = 0;
EAD.curr_y = 0;
EAD.tapped = false;
EAD.touched = false;

EAD.area_order = (function () {
    "use strict";

    var area_ids = [1, 2, 3, 4, 5],
        area_order = [0],
        len = area_ids.length,
        index = 0;

    while (len) {
        index = Math.floor(Math.random() * len);
        area_order.push(area_ids.splice(index, 1)[0]);

        len -= 1;
    }
    area_order.push(6, 7);

    return area_order;
}());
EAD.difficulty = 0;
EAD.high_score = 0;
EAD.score = 0;

EAD.sprites = new Image();
EAD.sprites.src = "./img/sprites.png";
EAD.tileset = new Image();
EAD.tileset.src = "./img/tileset.png";

window.onload = function () {
    "use strict";

    var i = 0,
        max_layers = EAD.layers.length,
        prev_time = Date.now(),
        curr_time = 0,
        elapsed_time = 0,
        interval = 1000 / EAD.FPS,
        step = {};

    while (i < max_layers) {
        EAD.canvas[EAD.layers[i]] = document.getElementById(EAD.layers[i]);
        if (
            !EAD.canvas[EAD.layers[i]] ||
            !EAD.canvas[EAD.layers[i]].getContext
        ) {
            return false;
        }

        EAD.ctx[EAD.layers[i]] = EAD.canvas[EAD.layers[i]].getContext("2d");
        i += 1;
    }

    window.requestAnimationFrame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame;

    step = function () {
        window.requestAnimationFrame(step);

        curr_time = Date.now();
        elapsed_time = curr_time - prev_time;

        if (elapsed_time > interval) {
            prev_time = curr_time - (elapsed_time % interval);

            EAD.loop();
        }
    };

    EAD.init();
    EAD.setup();
    window.setTimeout(step, 500);
};

EAD.init = function () {
    "use strict";

    var layer = EAD.canvas.front,
        rect = {};

    if (window.ontouchstart === null) {
        layer.addEventListener("touchstart", function (evt) {
            evt.preventDefault();

            EAD.prev_x = EAD.curr_x;
            EAD.prev_y = EAD.curr_y;
            EAD.curr_x = evt.changedTouches[0].pageX;
            EAD.curr_y = evt.changedTouches[0].pageY;
            EAD.tapped = true;
            EAD.touched = true;
        }, false);

        layer.addEventListener("touchmove", function (evt) {
            evt.preventDefault();

            EAD.prev_x = EAD.curr_x;
            EAD.prev_y = EAD.curr_y;
            EAD.curr_x = evt.changedTouches[0].pageX;
            EAD.curr_y = evt.changedTouches[0].pageY;
            EAD.tapped = false;
            EAD.touched = true;
        }, false);

        layer.addEventListener("touchend", function (evt) {
            evt.preventDefault();

            EAD.prev_x = EAD.curr_x;
            EAD.prev_y = EAD.curr_y;
            EAD.curr_x = evt.changedTouches[0].pageX;
            EAD.curr_y = evt.changedTouches[0].pageY;
            EAD.tapped = false;
            EAD.touched = false;
        }, false);
    } else {
        layer.addEventListener("mousedown", function (evt) {
            rect = layer.getBoundingClientRect();

            EAD.prev_x = EAD.curr_x;
            EAD.prev_y = EAD.curr_y;
            EAD.curr_x = evt.clientX - rect.left;
            EAD.curr_y = evt.clientY - rect.top;
            EAD.tapped = true;
            EAD.touched = true;
        }, false);

        layer.addEventListener("mousemove", function (evt) {
            rect = layer.getBoundingClientRect();

            EAD.prev_x = EAD.curr_x;
            EAD.prev_y = EAD.curr_y;
            EAD.curr_x = evt.clientX - rect.left;
            EAD.curr_y = evt.clientY - rect.top;
            EAD.tapped = false;
            EAD.touched = true;
        }, false);

        layer.addEventListener("mouseup", function (evt) {
            rect = layer.getBoundingClientRect();

            EAD.prev_x = EAD.curr_x;
            EAD.prev_y = EAD.curr_y;
            EAD.curr_x = evt.clientX - rect.left;
            EAD.curr_y = evt.clientY - rect.top;
            EAD.tapped = false;
            EAD.touched = false;
        }, false);
    }
};
