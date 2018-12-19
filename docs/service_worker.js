/*!
 * Name    : service_worker.js
 * Purpose : Caching and serving assets
 *
 * Author  : KUSANAGI Mitsuhisa <mikkun@mbg.nifty.com>
 * Licence : MIT License
 */

/*jslint bitwise, browser, multivar, this*/
/*global EAD, Image, caches, fetch, self, window*/

var CACHE_NAME = "EAD-cache-v1",
    CACHED_URLS = [
        "./",
        "./css/",
        "./css/styles.css",
        "./img/",
        "./img/sprites.png",
        "./img/tileset.png",
        "./index.html",
        "./js/",
        "./js/constr-background.js",
        "./js/constr-enemy.js",
        "./js/constr-enemy_shot.js",
        "./js/constr-physical_point.js",
        "./js/constr-player.js",
        "./js/constr-player_item.js",
        "./js/constr-player_shot.js",
        "./js/constr-tile.js",
        "./js/enemy_manager.js",
        "./js/enemy_shot_manager.js",
        "./js/game.js",
        "./js/init.js",
        "./js/map-bg01.js",
        "./js/map-bg02.js",
        "./js/map-enemies.js",
        "./js/player_item_manager.js",
        "./js/player_manager.js",
        "./js/player_shot_manager.js",
        "./js/util.js"
    ];

self.addEventListener("install", function (evt) {
    "use strict";

    evt.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(CACHED_URLS);
        })
    );
});

self.addEventListener("fetch", function (evt) {
    "use strict";

    evt.respondWith(
        caches.match(evt.request).then(function (response) {
            return response || fetch(evt.request);
        })
    );
});
