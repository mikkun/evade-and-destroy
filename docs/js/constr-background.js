/*!
 * Name    : constr-background.js
 * Purpose : Constructor for Background objects
 *
 * Author  : KUSANAGI Mitsuhisa <mikkun@mbg.nifty.com>
 * Licence : MIT License
 */

/*jslint bitwise, browser, multivar, this*/
/*global EAD, Image, Promise, caches, fetch, self, window*/

EAD.Background = function (layer, scroll_vy, tile_map) {
    "use strict";

    this.layer = layer;
    this.scroll_vy = scroll_vy;
    this.tile_map = tile_map;

    this.tile_id = 0;
    this.tiles = [];
};

EAD.Background.prototype.setup = function () {
    "use strict";

    var i = 0,
        max_tiles = EAD.MAP_COLS * EAD.MAP_ROWS,
        last_tile_id = this.tile_map.length - 1;

    while (i < max_tiles) {
        this.tiles[i] = this.tiles[i] || new EAD.Tile(this.layer);
        this.tiles[i].id = this.tile_map[this.tile_id];
        this.tiles[i].left = i % EAD.MAP_COLS * EAD.BASE_PX;
        this.tiles[i].top = EAD.HEIGHT -
                EAD.BASE_PX * 2 -
                Math.floor(i / EAD.MAP_COLS) * EAD.BASE_PX;

        this.tile_id = this.tile_id < last_tile_id
            ? this.tile_id + 1
            : 0;

        i += 1;
    }
};

EAD.Background.prototype.scroll = function () {
    "use strict";

    var i = 0,
        max_tiles = EAD.MAP_COLS * EAD.MAP_ROWS,
        last_tile_id = this.tile_map.length - 1,
        gap_y = 0;

    EAD.ctx[this.layer].clearRect(0, 0, EAD.WIDTH, EAD.HEIGHT - EAD.BASE_PX);

    while (i < max_tiles) {
        this.tiles[i].draw();

        this.tiles[i].top += this.scroll_vy;

        if (this.tiles[i].top >= EAD.HEIGHT - EAD.BASE_PX) {
            gap_y = this.tiles[i].top - (EAD.HEIGHT - EAD.BASE_PX);

            this.tiles[i].id = this.tile_map[this.tile_id];
            this.tiles[i].top = -EAD.BASE_PX + gap_y;

            this.tile_id = this.tile_id < last_tile_id
                ? this.tile_id + 1
                : 0;
        }

        i += 1;
    }
};
