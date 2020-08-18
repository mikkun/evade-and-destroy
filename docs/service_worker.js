/*!
 * Name    : service_worker.js
 * Purpose : Caching and serving assets
 *
 * Author  : KUSANAGI Mitsuhisa <mikkun@mbg.nifty.com>
 * License : MIT License
 */

// Continue to use JSLint edition 2017-07-01
/*jslint bitwise, browser, multivar, this*/
/*global EAD, Image, Promise, caches, fetch, self, window*/

var CACHE_NAME = "EAD-cache-v3.0.0",
    CACHED_URLS = [
        "./",
        "./css/styles.css",
        "./img/mothership.png",
        "./img/sprites.png",
        "./img/tileset.png",
        "./index.html",
        "./js/boss_manager.js",
        "./js/constr-background.js",
        "./js/constr-boss.js",
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

self.addEventListener("activate", function (evt) {
    "use strict";

    var curr_caches = [CACHE_NAME];

    evt.waitUntil(
        caches.keys().then(function (cache_names) {
            return Promise.all(cache_names.map(function (cache_name) {
                if (curr_caches.indexOf(cache_name) === -1) {
                    return caches.delete(cache_name);
                }
            }));
        })
    );
});

self.addEventListener("fetch", function (evt) {
    "use strict";

    evt.respondWith(
        caches.match(evt.request).then(function (cached_resp) {
            return cached_resp || fetch(evt.request).then(function (resp) {
                return caches.open(CACHE_NAME).then(function (cache) {
                    cache.put(evt.request, resp.clone());
                    return resp;
                });
            });
        })
    );
});
