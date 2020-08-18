/*!
 * Name    : map-enemies.js
 * Purpose : Map of enemies
 *
 * Author  : KUSANAGI Mitsuhisa <mikkun@mbg.nifty.com>
 * License : MIT License
 */

/*jslint bitwise, browser, multivar, this*/
/*global EAD, Image, Promise, caches, fetch, self, window*/

EAD.enemies_maps = [];

EAD.enemies_maps[0] = [
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 90, 10, 10, 90, 10, 90, 10, 10,
    10, 90, 10, 90, 10, 10, 90, 10, 10, 10,
    10, 10, 90, 10, 10, 90, 10, 10, 90, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 80, 10, 10, 90, 10, 10, 90, 10, 10,
    10, 10, 90, 10, 10, 90, 10, 10, 80, 10,
    10, 10, 10, 50, 10, 10, 10, 10, 10, 10,
    10, 10, 21, 10, 10, 10, 50, 21, 10, 10,
    10, 90, 10, 10, 90, 10, 10, 10, 10, 90,
    10, 10, 50, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 50, 10, 10,
    90, 10, 10, 10, 10, 90, 10, 10, 90, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 50,
    10, 50, 10, 10, 10, 10, 10, 10, 10, 10,
    50, 10, 10, 10, 25, 25, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 50, 10,
    10, 10, 10, 50, 10, 10, 50, 10, 10, 10,
    10, 10, 80, 10, 90, 10, 10, 10, 10, 90,
    10, 90, 10, 90, 10, 10, 10, 80, 10, 10,
    80, 10, 10, 10, 10, 90, 10, 10, 90, 10,
    10, 10, 90, 10, 10, 10, 90, 10, 10, 80,
    10, 40, 10, 10, 10, 10, 10, 10, 21, 10,
    10, 10, 25, 10, 10, 10, 10, 40, 10, 10,
    10, 10, 40, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 40, 10, 10, 10, 10, 10,
    10, 40, 10, 10, 10, 10, 10, 10, 40, 10,
    10, 10, 90, 10, 10, 10, 80, 10, 10, 90,
    90, 10, 10, 80, 10, 10, 10, 90, 10, 10,
    10, 10, 10, 10, 60, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 60, 10, 10, 10, 10,
    10, 10, 10, 10, 31, 10, 10, 60, 10, 10,
    10, 10, 10, 10, 10, 10, 60, 10, 10, 10,
    10, 90, 10, 10, 90, 10, 10, 10, 90, 10,
    10, 10, 60, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 60, 10, 10, 10, 10, 10, 10,
    21, 10, 10, 10, 25, 60, 21, 10, 25, 10,
    10, 10, 10, 10, 60, 10, 10, 10, 10, 10,
    10, 10, 90, 10, 80, 10, 10, 10, 90, 10,
    10, 80, 10, 10, 10, 90, 10, 10, 10, 90,
    90, 10, 10, 10, 90, 10, 10, 80, 10, 10,
    10, 60, 10, 10, 10, 10, 10, 10, 60, 10,
    10, 10, 60, 10, 10, 10, 10, 60, 10, 10,
    10, 10, 25, 60, 10, 10, 60, 25, 10, 10,
    10, 10, 90, 10, 10, 80, 10, 21, 10, 90,
    10, 60, 10, 10, 10, 10, 10, 10, 60, 10,
    10, 10, 60, 10, 10, 10, 10, 60, 10, 10,
    10, 10, 10, 60, 10, 10, 60, 25, 10, 10,
    10, 90, 10, 80, 10, 10, 80, 10, 90, 10,
    60, 10, 60, 10, 10, 10, 10, 60, 10, 60
];
EAD.enemies_maps[1] = [
    10, 10, 80, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 80,
    10, 10, 10, 80, 10, 10, 10, 10, 10, 10,
    10, 80, 10, 10, 10, 10, 10, 80, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 80, 10,
    10, 10, 10, 10, 80, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 80, 10, 10, 10,
    80, 10, 10, 10, 10, 80, 10, 10, 10, 10,
    10, 10, 10, 10, 50, 10, 10, 50, 10, 10,
    10, 10, 10, 50, 10, 10, 50, 10, 10, 10,
    10, 10, 50, 10, 10, 50, 10, 10, 10, 10,
    10, 10, 10, 50, 10, 10, 50, 10, 10, 10,
    31, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 80, 10, 10,
    10, 10, 80, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 35, 34,
    10, 10, 10, 10, 10, 10, 50, 10, 50, 10,
    10, 50, 10, 50, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 50, 10, 50, 10, 10,
    80, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 25, 60, 10, 60, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 80,
    10, 10, 10, 25, 60, 10, 60, 10, 10, 10,
    10, 10, 10, 10, 80, 10, 10, 10, 10, 10,
    10, 60, 10, 60, 10, 25, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 80, 10, 10, 10, 10,
    10, 10, 80, 10, 10, 10, 10, 10, 80, 10,
    10, 40, 10, 10, 10, 10, 10, 40, 10, 10,
    10, 10, 40, 10, 10, 10, 40, 10, 10, 10,
    80, 10, 10, 40, 10, 40, 10, 10, 10, 10,
    21, 80, 60, 10, 60, 21, 10, 10, 10, 10,
    10, 10, 10, 80, 10, 10, 10, 10, 10, 80,
    10, 10, 40, 10, 10, 10, 10, 10, 40, 10,
    10, 10, 10, 40, 10, 10, 10, 40, 10, 10,
    10, 10, 10, 10, 40, 10, 40, 80, 10, 10,
    25, 10, 80, 10, 10, 10, 80, 10, 10, 25,
    80, 10, 10, 60, 10, 60, 10, 10, 10, 10,
    10, 10, 10, 80, 10, 10, 10, 10, 80, 10,
    31, 10, 31, 10, 10, 10, 10, 10, 10, 10,
    60, 10, 60, 10, 10, 10, 10, 60, 10, 60,
    10, 60, 10, 60, 10, 10, 60, 10, 60, 10,
    10, 10, 10, 10, 10, 80, 10, 10, 10, 10,
    71, 10, 71, 10, 10, 10, 10, 71, 10, 71,
    10, 71, 25, 71, 10, 10, 71, 25, 71, 10,
    10, 10, 71, 10, 71, 71, 10, 71, 10, 10,
    10, 10, 10, 10, 80, 10, 10, 10, 10, 10,
    71, 10, 71, 10, 10, 10, 10, 71, 10, 71,
    10, 71, 25, 71, 10, 10, 71, 25, 71, 10,
    10, 10, 71, 10, 71, 71, 10, 71, 10, 10,
    10, 10, 10, 10, 10, 10, 80, 10, 10, 10,
    10, 60, 10, 10, 10, 10, 10, 10, 60, 10,
    10, 10, 60, 10, 10, 10, 10, 60, 10, 10,
    10, 10, 80, 60, 10, 10, 60, 10, 10, 10,
    10, 10, 10, 10, 10, 80, 10, 10, 10, 10,
    10, 80, 10, 10, 10, 10, 10, 10, 80, 10,
    25, 10, 10, 80, 21, 21, 80, 10, 10, 25,
    71, 60, 71, 10, 10, 10, 10, 71, 60, 71,
    10, 71, 60, 71, 10, 10, 71, 60, 71, 80,
    10, 80, 71, 60, 71, 71, 60, 71, 10, 10
];
EAD.enemies_maps[2] = [
    10, 10, 10, 10, 10, 80, 10, 10, 10, 10,
    10, 10, 10, 80, 10, 10, 10, 10, 10, 10,
    80, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 80, 10, 80, 10,
    10, 10, 10, 60, 10, 60, 10, 10, 10, 10,
    10, 10, 80, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 80,
    10, 10, 10, 10, 80, 10, 10, 10, 10, 10,
    10, 80, 10, 10, 10, 10, 10, 80, 10, 10,
    10, 10, 50, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 50, 10, 10,
    10, 10, 10, 80, 10, 10, 50, 10, 10, 10,
    80, 10, 25, 10, 10, 10, 10, 10, 80, 10,
    10, 50, 10, 10, 50, 10, 80, 10, 10, 10,
    10, 80, 21, 10, 10, 50, 10, 10, 50, 10,
    10, 10, 10, 10, 80, 10, 10, 80, 10, 10,
    50, 10, 25, 50, 10, 80, 10, 10, 10, 10,
    10, 50, 10, 10, 50, 10, 10, 50, 80, 10,
    10, 10, 80, 10, 10, 10, 10, 10, 10, 80,
    10, 10, 10, 80, 10, 10, 71, 40, 71, 10,
    10, 80, 10, 10, 10, 71, 40, 71, 10, 10,
    10, 71, 40, 71, 10, 10, 10, 80, 10, 10,
    10, 10, 71, 40, 71, 10, 10, 10, 80, 10,
    80, 10, 10, 10, 10, 10, 80, 10, 10, 10,
    71, 40, 71, 10, 80, 10, 10, 71, 40, 71,
    10, 71, 60, 71, 10, 80, 71, 60, 71, 10,
    10, 80, 10, 10, 80, 10, 10, 80, 10, 10,
    80, 10, 80, 10, 10, 10, 10, 10, 10, 80,
    10, 60, 10, 10, 80, 50, 80, 10, 10, 10,
    10, 10, 10, 60, 10, 80, 10, 50, 10, 80,
    10, 80, 50, 10, 10, 10, 60, 25, 80, 10,
    80, 10, 80, 60, 10, 10, 10, 50, 10, 10,
    10, 60, 10, 10, 10, 80, 10, 21, 60, 10,
    10, 10, 60, 10, 80, 10, 10, 60, 10, 10,
    60, 80, 10, 60, 10, 10, 90, 25, 10, 60,
    10, 10, 80, 10, 10, 80, 10, 10, 80, 10,
    80, 71, 60, 71, 10, 71, 60, 71, 10, 10,
    10, 71, 60, 71, 10, 10, 71, 60, 71, 80,
    71, 60, 71, 10, 80, 71, 60, 71, 10, 10,
    10, 71, 60, 71, 10, 10, 80, 71, 60, 71,
    80, 10, 80, 10, 10, 10, 10, 10, 10, 80,
    10, 10, 10, 80, 10, 80, 10, 80, 10, 10,
    50, 10, 80, 10, 10, 10, 50, 10, 80, 50,
    50, 80, 10, 50, 80, 10, 10, 10, 10, 50,
    50, 10, 10, 50, 10, 80, 50, 80, 10, 90,
    90, 10, 80, 50, 10, 10, 50, 10, 80, 50,
    50, 10, 10, 50, 80, 10, 50, 80, 10, 50,
    71, 80, 72, 71, 10, 72, 10, 71, 80, 10,
    72, 25, 80, 71, 10, 80, 71, 72, 25, 71,
    80, 71, 72, 10, 71, 10, 71, 80, 10, 72,
    71, 21, 71, 72, 10, 72, 80, 71, 21, 80,
    72, 71, 10, 80, 72, 10, 71, 10, 80, 71,
    71, 25, 80, 72, 80, 71, 72, 71, 25, 10,
    80, 72, 71, 10, 71, 10, 72, 80, 10, 71,
    10, 10, 80, 10, 10, 80, 10, 10, 10, 80,
    72, 60, 72, 80, 10, 10, 10, 10, 50, 10,
    72, 60, 72, 10, 10, 50, 80, 10, 10, 10,
    72, 60, 72, 10, 10, 10, 10, 50, 80, 10,
    72, 60, 72, 25, 80, 10, 25, 10, 10, 50,
    71, 50, 71, 10, 10, 10, 72, 60, 72, 80
];
EAD.enemies_maps[3] = [
    10, 10, 10, 10, 10, 10, 80, 10, 10, 10,
    10, 10, 10, 10, 80, 10, 10, 10, 10, 10,
    10, 80, 10, 10, 10, 10, 10, 10, 10, 80,
    10, 10, 80, 10, 10, 10, 10, 80, 10, 10,
    10, 10, 10, 10, 60, 10, 60, 10, 10, 10,
    10, 10, 10, 10, 10, 80, 10, 10, 10, 10,
    80, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 80, 10, 10, 80, 10, 10, 10,
    10, 80, 10, 10, 10, 10, 10, 10, 80, 10,
    10, 10, 10, 50, 10, 10, 50, 10, 10, 10,
    10, 50, 10, 10, 10, 10, 10, 10, 50, 10,
    10, 50, 10, 10, 10, 10, 10, 10, 50, 10,
    10, 10, 10, 50, 10, 10, 50, 10, 10, 10,
    10, 10, 10, 10, 80, 10, 10, 10, 10, 10,
    10, 71, 40, 71, 10, 71, 40, 71, 10, 10,
    10, 10, 10, 10, 10, 80, 10, 10, 10, 10,
    10, 10, 71, 40, 71, 10, 71, 40, 71, 10,
    10, 80, 10, 10, 10, 10, 10, 10, 10, 80,
    25, 10, 80, 10, 21, 21, 10, 80, 10, 25,
    10, 10, 10, 60, 10, 10, 60, 10, 10, 10,
    10, 10, 60, 10, 10, 10, 10, 60, 10, 10,
    10, 60, 10, 10, 80, 10, 10, 10, 60, 10,
    10, 10, 60, 10, 10, 10, 10, 60, 10, 10,
    10, 10, 10, 60, 10, 10, 60, 10, 10, 10,
    10, 10, 10, 10, 10, 80, 10, 10, 10, 10,
    10, 72, 10, 72, 10, 10, 72, 10, 72, 10,
    10, 72, 25, 72, 10, 10, 72, 25, 72, 10,
    10, 72, 10, 72, 10, 10, 72, 10, 72, 10,
    10, 10, 10, 80, 10, 10, 10, 10, 10, 10,
    10, 72, 10, 72, 10, 10, 72, 10, 72, 10,
    10, 72, 25, 72, 10, 10, 72, 25, 72, 10,
    10, 72, 10, 72, 10, 10, 72, 10, 72, 10,
    10, 10, 10, 10, 10, 10, 80, 10, 10, 10,
    10, 80, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 80,
    31, 32, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 80, 10, 10, 10, 50, 10, 10,
    10, 50, 10, 10, 10, 10, 10, 10, 80, 10,
    10, 10, 10, 10, 10, 10, 10, 34, 34, 34,
    10, 10, 50, 10, 50, 10, 10, 80, 10, 10,
    10, 10, 80, 10, 10, 10, 50, 10, 50, 10,
    80, 10, 10, 10, 10, 80, 10, 10, 10, 10,
    10, 10, 10, 80, 10, 10, 80, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 72, 60, 72, 10,
    10, 72, 60, 72, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 72, 60, 72, 10, 10, 10,
    72, 60, 72, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 80, 10, 10, 10, 10, 10,
    10, 71, 60, 71, 10, 10, 10, 10, 80, 10,
    10, 10, 10, 10, 10, 71, 60, 71, 10, 80,
    10, 10, 71, 60, 71, 10, 10, 80, 10, 10,
    10, 10, 10, 80, 10, 10, 10, 10, 10, 10,
    72, 60, 72, 10, 10, 10, 80, 37, 10, 10,
    10, 10, 10, 10, 72, 60, 72, 37, 80, 10,
    10, 72, 60, 72, 10, 10, 10, 80, 10, 10,
    10, 80, 10, 10, 10, 10, 10, 72, 60, 72,
    10, 10, 10, 10, 10, 10, 80, 10, 10, 10,
    10, 10, 10, 10, 50, 80, 50, 10, 10, 10,
    25, 50, 21, 50, 25, 50, 10, 80, 10, 10,
    10, 10, 80, 50, 10, 71, 50, 71, 10, 50
];
EAD.enemies_maps[4] = [
    10, 10, 10, 10, 80, 10, 10, 10, 10, 10,
    10, 10, 80, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 80, 10,
    10, 80, 10, 10, 10, 10, 80, 10, 10, 10,
    10, 10, 10, 10, 90, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 80,
    10, 10, 10, 10, 10, 80, 10, 10, 10, 10,
    80, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 80, 10, 10, 10, 80, 10, 10,
    10, 10, 10, 10, 10, 10, 50, 10, 50, 10,
    10, 10, 10, 50, 10, 50, 10, 10, 10, 10,
    50, 10, 50, 10, 50, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 90, 10, 50, 10, 50,
    10, 10, 10, 10, 10, 10, 80, 10, 10, 10,
    72, 40, 72, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 72, 40, 72, 10, 10,
    10, 60, 10, 10, 60, 10, 10, 10, 10, 80,
    10, 10, 60, 10, 10, 60, 10, 80, 10, 10,
    10, 60, 80, 10, 60, 10, 60, 10, 90, 10,
    80, 10, 10, 90, 10, 90, 10, 10, 80, 10,
    10, 10, 10, 10, 80, 10, 71, 50, 71, 10,
    25, 71, 40, 71, 10, 10, 90, 10, 10, 80,
    10, 80, 90, 10, 72, 60, 72, 10, 90, 10,
    10, 10, 80, 10, 10, 10, 10, 80, 10, 10,
    10, 10, 72, 50, 72, 80, 10, 90, 10, 10,
    80, 90, 10, 10, 10, 72, 40, 72, 10, 25,
    90, 10, 71, 60, 71, 10, 90, 10, 80, 10,
    10, 10, 10, 80, 10, 10, 80, 10, 10, 10,
    10, 80, 90, 10, 90, 10, 10, 10, 80, 10,
    10, 10, 80, 10, 90, 10, 90, 10, 10, 80,
    80, 10, 10, 10, 10, 80, 90, 10, 90, 10,
    10, 90, 10, 90, 80, 10, 10, 80, 10, 10,
    90, 10, 90, 10, 10, 80, 10, 10, 80, 10,
    10, 80, 80, 10, 10, 10, 10, 80, 10, 10,
    10, 10, 10, 60, 10, 10, 60, 10, 10, 80,
    10, 60, 10, 10, 10, 80, 10, 10, 60, 10,
    80, 10, 10, 60, 10, 10, 60, 10, 10, 10,
    10, 10, 10, 10, 80, 10, 10, 10, 80, 10,
    10, 80, 10, 10, 10, 10, 80, 10, 10, 80,
    10, 71, 60, 71, 10, 10, 10, 50, 10, 10,
    10, 60, 10, 21, 10, 72, 50, 72, 10, 10,
    10, 10, 71, 60, 71, 10, 10, 10, 50, 10,
    10, 10, 60, 10, 10, 10, 72, 50, 72, 10,
    80, 40, 10, 10, 80, 40, 10, 10, 80, 40,
    10, 10, 10, 60, 10, 10, 71, 50, 71, 10,
    10, 72, 60, 72, 10, 10, 10, 10, 50, 10,
    10, 60, 10, 10, 10, 10, 71, 50, 71, 10,
    10, 10, 72, 60, 72, 71, 50, 71, 10, 10,
    80, 90, 10, 10, 90, 80, 90, 80, 10, 10,
    90, 10, 80, 10, 10, 90, 10, 10, 10, 90,
    10, 80, 10, 90, 10, 10, 10, 90, 90, 10,
    10, 90, 10, 10, 10, 90, 34, 10, 80, 90,
    10, 10, 90, 80, 90, 10, 90, 10, 10, 10,
    90, 10, 10, 10, 10, 90, 80, 10, 10, 90,
    10, 90, 80, 90, 80, 10, 10, 90, 10, 80,
    10, 60, 10, 10, 10, 10, 10, 10, 60, 10,
    10, 10, 60, 10, 10, 10, 10, 60, 10, 10,
    10, 10, 10, 60, 25, 25, 60, 10, 10, 10,
    10, 10, 10, 80, 10, 10, 80, 10, 10, 10,
    60, 10, 60, 10, 10, 10, 10, 60, 10, 60
];
EAD.enemies_maps[5] = [
    10, 10, 10, 10, 10, 10, 10, 80, 10, 10,
    10, 10, 80, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 80, 10, 10, 10, 10,
    10, 80, 10, 10, 10, 10, 10, 10, 10, 80,
    10, 10, 10, 50, 10, 10, 50, 10, 10, 10,
    10, 10, 10, 80, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 80, 10, 10, 10,
    10, 10, 10, 10, 80, 10, 10, 10, 10, 10,
    80, 10, 10, 10, 10, 10, 10, 10, 80, 10,
    10, 10, 40, 10, 10, 40, 10, 10, 10, 10,
    10, 10, 10, 10, 40, 10, 10, 40, 10, 10,
    10, 40, 10, 40, 10, 10, 40, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    31, 31, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 60, 10, 10, 60, 80,
    10, 10, 72, 60, 72, 10, 10, 10, 10, 10,
    10, 71, 60, 71, 10, 10, 71, 60, 71, 10,
    10, 60, 25, 10, 60, 10, 60, 25, 10, 10,
    10, 71, 60, 71, 10, 10, 71, 60, 71, 10,
    80, 10, 10, 72, 60, 72, 10, 10, 10, 10,
    10, 60, 10, 10, 10, 60, 10, 10, 60, 10,
    10, 71, 60, 71, 10, 10, 71, 60, 71, 10,
    10, 10, 25, 72, 60, 72, 10, 25, 10, 10,
    10, 10, 60, 10, 10, 60, 10, 60, 10, 10,
    10, 60, 10, 10, 60, 10, 10, 10, 60, 80,
    10, 71, 60, 71, 10, 71, 60, 71, 10, 10,
    10, 10, 10, 10, 72, 60, 72, 10, 10, 10,
    10, 10, 21, 72, 60, 72, 10, 21, 10, 10,
    10, 10, 60, 10, 10, 60, 10, 10, 60, 10,
    80, 10, 72, 60, 72, 10, 10, 10, 10, 10,
    10, 60, 10, 10, 60, 10, 10, 60, 10, 10,
    10, 10, 71, 60, 71, 71, 60, 71, 10, 10,
    10, 10, 25, 10, 72, 60, 72, 25, 10, 10,
    10, 71, 60, 71, 10, 71, 60, 71, 10, 10,
    10, 10, 72, 60, 72, 10, 10, 10, 10, 80,
    10, 10, 71, 60, 71, 10, 71, 60, 71, 10,
    10, 71, 60, 71, 10, 71, 60, 71, 10, 10,
    10, 60, 25, 10, 60, 10, 10, 25, 60, 10,
    10, 71, 60, 71, 10, 10, 71, 60, 71, 10,
    80, 10, 72, 60, 72, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 72, 60, 72, 10, 10,
    10, 71, 60, 71, 10, 10, 71, 60, 71, 10,
    10, 10, 21, 72, 60, 72, 10, 21, 10, 10,
    10, 10, 10, 10, 10, 10, 72, 60, 72, 10,
    72, 60, 72, 10, 60, 10, 60, 10, 10, 80,
    10, 72, 60, 72, 60, 10, 10, 72, 60, 72,
    10, 10, 10, 10, 10, 10, 10, 10, 35, 35,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 80, 10, 10, 10, 10,
    10, 80, 10, 10, 10, 10, 10, 10, 80, 10,
    25, 90, 10, 25, 60, 10, 25, 10, 90, 25,
    80, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    25, 10, 80, 25, 10, 10, 25, 80, 10, 25,
    10, 60, 10, 90, 10, 10, 60, 10, 10, 90,
    10, 10, 10, 10, 80, 10, 10, 10, 10, 10,
    10, 80, 10, 10, 10, 10, 10, 10, 80, 10,
    90, 10, 71, 60, 71, 10, 10, 90, 10, 10,
    10, 10, 10, 21, 10, 80, 21, 80, 10, 10,
    80, 10, 80, 10, 10, 10, 10, 10, 10, 80,
    10, 60, 10, 90, 10, 71, 60, 71, 90, 10
];
EAD.enemies_maps[6] = [
    10, 10, 10, 80, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 80,
    10, 10, 10, 10, 80, 50, 10, 10, 10, 10,
    10, 80, 10, 10, 10, 10, 10, 80, 10, 10,
    10, 10, 72, 50, 72, 71, 50, 71, 10, 10,
    10, 10, 10, 10, 10, 80, 10, 10, 10, 10,
    80, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 50, 10, 80, 10, 10, 10,
    10, 50, 80, 10, 10, 50, 10, 10, 80, 10,
    10, 25, 71, 50, 71, 10, 72, 50, 72, 10,
    10, 10, 10, 10, 10, 10, 10, 80, 10, 10,
    80, 10, 10, 10, 10, 10, 10, 10, 10, 80,
    10, 10, 60, 80, 10, 60, 10, 60, 10, 10,
    10, 10, 10, 10, 60, 10, 60, 10, 10, 10,
    10, 80, 10, 60, 10, 60, 10, 10, 60, 10,
    10, 10, 60, 10, 60, 10, 60, 10, 10, 10,
    80, 60, 10, 60, 10, 10, 10, 60, 10, 60,
    10, 10, 80, 10, 10, 10, 10, 10, 80, 10,
    10, 50, 10, 50, 10, 80, 10, 50, 10, 10,
    10, 10, 10, 80, 50, 10, 50, 80, 10, 10,
    10, 71, 60, 71, 10, 10, 10, 72, 60, 72,
    72, 60, 72, 10, 10, 10, 71, 60, 71, 10,
    10, 10, 71, 60, 71, 71, 60, 71, 25, 10,
    10, 72, 60, 72, 10, 10, 72, 60, 72, 10,
    10, 60, 10, 60, 10, 10, 60, 10, 60, 10,
    60, 10, 60, 10, 10, 60, 10, 60, 10, 60,
    10, 10, 10, 90, 90, 10, 90, 10, 90, 10,
    10, 50, 10, 10, 50, 10, 10, 50, 10, 10,
    10, 80, 50, 10, 10, 50, 10, 10, 50, 10,
    50, 10, 10, 50, 10, 10, 50, 10, 10, 50,
    10, 90, 10, 90, 10, 90, 10, 90, 10, 10,
    10, 10, 50, 10, 10, 50, 10, 10, 50, 10,
    10, 50, 10, 10, 50, 10, 10, 50, 80, 10,
    50, 10, 10, 50, 10, 10, 50, 10, 10, 50,
    10, 10, 90, 10, 90, 90, 10, 10, 90, 10,
    10, 90, 10, 10, 10, 90, 10, 90, 10, 90,
    10, 25, 72, 60, 72, 71, 60, 71, 25, 10,
    60, 10, 60, 10, 21, 21, 10, 60, 10, 60,
    10, 25, 71, 60, 71, 72, 60, 72, 25, 10,
    90, 10, 10, 10, 90, 10, 90, 10, 90, 10,
    10, 90, 10, 90, 80, 10, 10, 90, 10, 90,
    10, 80, 90, 10, 90, 10, 90, 10, 90, 10,
    10, 10, 72, 50, 72, 60, 10, 60, 10, 10,
    90, 10, 71, 25, 90, 10, 25, 71, 90, 10,
    10, 60, 71, 10, 72, 50, 72, 71, 10, 60,
    90, 90, 71, 25, 90, 90, 25, 71, 10, 90,
    10, 72, 50, 72, 10, 10, 60, 10, 60, 10,
    10, 60, 10, 60, 10, 10, 10, 72, 50, 72,
    60, 10, 60, 10, 10, 60, 10, 60, 10, 60,
    10, 71, 71, 10, 71, 71, 10, 71, 71, 10,
    60, 10, 10, 60, 10, 10, 60, 10, 10, 60,
    71, 10, 25, 72, 60, 72, 10, 25, 10, 71,
    10, 72, 60, 72, 71, 71, 10, 90, 10, 10,
    90, 10, 10, 71, 25, 25, 71, 72, 60, 72,
    72, 60, 72, 71, 25, 25, 71, 10, 90, 10,
    10, 90, 10, 10, 71, 71, 72, 60, 72, 10,
    71, 10, 25, 72, 60, 72, 10, 25, 10, 71,
    60, 10, 60, 10, 10, 60, 10, 60, 10, 60,
    10, 71, 71, 10, 71, 71, 10, 71, 71, 10,
    50, 10, 50, 10, 50, 10, 50, 10, 50, 10
];
EAD.enemies_maps[7] = [
    10, 50, 10, 50, 10, 50, 10, 50, 10, 50,
    31, 31, 31, 10, 80, 10, 10, 10, 10, 80,
    50, 10, 50, 50, 10, 50, 10, 10, 50, 10,
    10, 50, 10, 50, 50, 10, 50, 10, 50, 10,
    80, 10, 10, 10, 10, 80, 34, 34, 34, 34,
    10, 50, 10, 10, 50, 10, 50, 50, 10, 50,
    50, 50, 10, 50, 10, 10, 50, 10, 50, 10,
    10, 71, 71, 10, 71, 71, 10, 71, 71, 10,
    10, 71, 60, 71, 10, 10, 72, 60, 72, 10,
    25, 10, 90, 25, 10, 90, 25, 90, 10, 25,
    71, 60, 71, 72, 60, 72, 10, 71, 60, 71,
    10, 10, 10, 10, 71, 71, 10, 10, 10, 10,
    90, 34, 90, 10, 71, 71, 10, 90, 31, 90,
    10, 72, 50, 72, 71, 71, 72, 50, 72, 10,
    72, 50, 72, 10, 71, 71, 10, 72, 50, 72,
    90, 10, 90, 10, 71, 71, 10, 90, 10, 90,
    10, 90, 10, 90, 25, 25, 90, 10, 90, 10,
    10, 72, 50, 72, 71, 71, 72, 50, 72, 10,
    72, 50, 72, 10, 71, 71, 10, 72, 50, 72,
    90, 34, 90, 10, 71, 71, 10, 90, 31, 90,
    72, 50, 72, 10, 71, 71, 10, 72, 50, 72,
    10, 72, 50, 72, 71, 71, 72, 50, 72, 10,
    10, 90, 10, 90, 25, 25, 90, 10, 90, 10,
    90, 10, 90, 10, 71, 71, 10, 90, 10, 90,
    60, 38, 60, 10, 71, 71, 10, 60, 38, 60,
    60, 38, 10, 60, 71, 71, 60, 10, 38, 60,
    60, 38, 60, 10, 71, 71, 10, 60, 38, 60,
    10, 60, 10, 60, 71, 71, 60, 10, 60, 10,
    60, 10, 60, 10, 60, 60, 10, 60, 10, 60,
    90, 71, 71, 71, 71, 71, 71, 71, 71, 90,
    10, 72, 60, 72, 10, 10, 72, 60, 72, 10,
    71, 25, 25, 71, 90, 90, 71, 25, 25, 71,
    10, 72, 60, 72, 10, 10, 72, 60, 72, 10,
    25, 71, 90, 71, 25, 25, 71, 90, 71, 25,
    10, 72, 60, 72, 10, 10, 72, 60, 72, 10,
    71, 25, 25, 71, 90, 90, 71, 25, 25, 71,
    10, 72, 60, 72, 10, 10, 72, 60, 72, 10,
    90, 71, 71, 71, 71, 71, 71, 71, 71, 90,
    10, 72, 60, 72, 10, 10, 72, 60, 72, 10,
    90, 71, 71, 10, 72, 50, 72, 71, 71, 90,
    71, 25, 25, 71, 90, 90, 71, 25, 25, 71,
    71, 25, 25, 71, 90, 90, 71, 25, 25, 71,
    90, 71, 71, 72, 50, 72, 10, 71, 71, 90,
    10, 10, 10, 10, 71, 71, 72, 50, 72, 10,
    72, 50, 72, 71, 25, 25, 71, 10, 10, 10,
    10, 10, 10, 71, 25, 25, 71, 72, 50, 72,
    10, 72, 50, 72, 71, 71, 10, 10, 10, 10,
    90, 71, 71, 10, 72, 50, 72, 71, 71, 90,
    71, 25, 25, 71, 90, 90, 71, 25, 25, 71,
    71, 25, 25, 71, 90, 90, 71, 25, 25, 71,
    90, 71, 71, 72, 50, 72, 10, 71, 71, 90,
    10, 72, 60, 72, 10, 10, 72, 60, 72, 10,
    90, 71, 71, 90, 71, 71, 90, 71, 71, 90,
    10, 80, 10, 10, 10, 10, 80, 10, 10, 10,
    10, 10, 10, 10, 80, 10, 10, 10, 10, 10,
    32, 32, 10, 10, 10, 10, 10, 10, 80, 10,
    80, 10, 10, 10, 10, 80, 10, 10, 10, 10,
    10, 10, 10, 80, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 80, 10, 34,
    10, 10, 80, 10, 10, 10, 10, 10, 10, 80
];

EAD.enemies_map = EAD.enemies_maps[EAD.area_order[0]].concat(
    EAD.enemies_maps[EAD.area_order[1]],
    EAD.enemies_maps[EAD.area_order[2]],
    EAD.enemies_maps[EAD.area_order[3]],
    EAD.enemies_maps[EAD.area_order[4]],
    EAD.enemies_maps[EAD.area_order[5]],
    EAD.enemies_maps[EAD.area_order[6]],
    EAD.enemies_maps[EAD.area_order[7]]
);

EAD.enemies_maps.length = 0;
