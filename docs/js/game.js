/*!
 * Name    : game.js
 * Purpose : Main game routine
 *
 * Author  : KUSANAGI Mitsuhisa <mikkun@mbg.nifty.com>
 * Licence : MIT License
 */

/*jslint bitwise, browser, multivar, this*/
/*global EAD, Image, caches, fetch, self, window*/

EAD.game = {};

EAD.game.STATE = {
    LOADING: 1,
    TITLE: 2,
    START: 3,
    PLAYING: 4,
    SAVING: 5,
    GAMEOVER: 6
};

EAD.game.state = EAD.game.STATE.LOADING;
EAD.game.storage_error = "";

EAD.setup = function () {
    "use strict";

    EAD.ctx.front.fillStyle = EAD.FONT_COLOR;
    EAD.ctx.front.font = EAD.FONT_FACE;

    EAD.game.dialog = document.getElementById("dialog");
    EAD.game.tweet_btn = document.getElementById("tweet_btn");
    EAD.game.cancel_btn = document.getElementById("cancel_btn");

    EAD.game.tweet_btn.addEventListener("click", function (evt) {
        evt.stopPropagation();

        EAD.game.state = EAD.game.STATE.TITLE;
        EAD.game.dialog.style.display = "none";
    }, false);

    EAD.game.cancel_btn.addEventListener("click", function (evt) {
        evt.preventDefault();
        evt.stopPropagation();

        EAD.game.state = EAD.game.STATE.TITLE;
        EAD.game.dialog.style.display = "none";
    }, false);

    try {
        if (window.localStorage.getItem("high_score")) {
            EAD.high_score =
                    parseInt(window.localStorage.getItem("high_score"), 10);
        } else {
            throw {name: "No Score Data"};
        }
    } catch (e) {
        EAD.high_score = 0;
        EAD.game.storage_error = e.name;
    }

    EAD.bg01 = new EAD.Background("bg01", 0.25, EAD.bg01_map);
    EAD.bg02 = new EAD.Background("bg02", 0.5, EAD.bg02_map);

    EAD.enemy_shot_manager.setup();
    EAD.player_manager.setup();
    EAD.player_item_manager.setup();
    EAD.player_shot_manager.setup();
};

EAD.loop = function () {
    "use strict";

    var i = 0,
        j = 0,
        button_y = 0,
        high_score = ("        " + EAD.high_score).slice(-9),
        score = ("        " + EAD.score).slice(-9),
        energy_red = ("  " + EAD.player.energy_red).slice(-3),
        energy_green = ("  " + EAD.player.energy_green).slice(-3),
        lives = (" " + EAD.player.lives).slice(-2);

    EAD.ctx.front.clearRect(0, 0, EAD.WIDTH, EAD.HEIGHT - EAD.BASE_PX);

    if (EAD.curr_y < EAD.HEIGHT && EAD.curr_y > EAD.HEIGHT - EAD.BASE_PX) {
        if (EAD.player.state === EAD.player.STATE.ACTIVE) {
            EAD.player.state = EAD.player.STATE.ATTACK;
        }
        button_y = 1;
    } else {
        if (EAD.player.state === EAD.player.STATE.ATTACK) {
            EAD.player.state = EAD.player.STATE.ACTIVE;
        }
        button_y = 0;
    }

    switch (EAD.game.state) {
    case EAD.game.STATE.LOADING:
        EAD.bg01.setup();
        EAD.bg02.setup();
        EAD.enemy_manager.setup();
        EAD.player_manager.update();
        EAD.game.state = EAD.game.STATE.TITLE;
        EAD.ctx.front.fillText("  === LOADING DATA ===", EAD.WIDTH / 2, 12);
        if (EAD.game.storage_error) {
            EAD.ctx.front.fillText(
                "  *** LOAD  FAILED ***",
                EAD.WIDTH / 2,
                24
            );
        } else {
            EAD.ctx.front.fillText(
                "  -- LOAD COMPLETED --",
                EAD.WIDTH / 2,
                24
            );
        }
        break;

    case EAD.game.STATE.TITLE:
        EAD.enemy_manager.hideEnemyShips();
        EAD.enemy_manager.update(EAD.WIDTH / 2, EAD.HEIGHT);
        if (EAD.tapped) {
            EAD.game.state = EAD.game.STATE.START;
        }
        EAD.ctx.front.fillText("  ==== GAME  OVER ====", EAD.WIDTH / 2, 12);
        EAD.ctx.front.fillText("  --- TAP TO START ---", EAD.WIDTH / 2, 24);
        EAD.ctx.front.drawImage(
            EAD.sprites,
            EAD.BASE_PX * 6,
            EAD.BASE_PX * 2,
            EAD.BASE_PX * 4,
            EAD.BASE_PX * 2,
            Math.floor((EAD.WIDTH - EAD.BASE_PX * 4) / 2),
            EAD.BASE_PX * 5,
            EAD.BASE_PX * 4,
            EAD.BASE_PX * 2
        );
        break;

    case EAD.game.STATE.START:
        EAD.ctx.front.fillStyle = EAD.BG_COLOR;
        EAD.ctx.front.fillRect(0, 0, EAD.WIDTH, EAD.HEIGHT - EAD.BASE_PX);
        EAD.ctx.front.fillStyle = EAD.FONT_COLOR;
        EAD.difficulty = 0;
        EAD.score = 0;
        EAD.bg01.tile_id = 0;
        EAD.bg01.setup();
        EAD.bg02.tile_id = 0;
        EAD.bg02.setup();
        EAD.enemy_id = 0;
        EAD.enemy_manager.setup();
        EAD.player.state = EAD.player.STATE.STANDBY;
        EAD.game.state = EAD.game.STATE.PLAYING;
        EAD.ctx.front.fillText("  == STARTING  GAME ==", EAD.WIDTH / 2, 12);
        EAD.ctx.front.fillText("  --- PLEASE  WAIT ---", EAD.WIDTH / 2, 24);
        break;

    case EAD.game.STATE.PLAYING:
        EAD.player_manager.update();
        if (EAD.player.state === EAD.player.STATE.ATTACK) {
            if (EAD.player_shot_manager.fire(EAD.player.energy_red)) {
                EAD.player.energy_red = EAD.player.energy_red > 0
                    ? EAD.player.energy_red - 1
                    : 0;
            }
        }
        EAD.player_shot_manager.update(EAD.player.x, EAD.player.y);
        EAD.enemy_manager.update(EAD.player.x, EAD.player.y);
        while (i < EAD.enemy_manager.MAX_ENEMIES) {
            if (
                EAD.enemies[i].state === EAD.enemies[i].STATE.ACTIVE ||
                EAD.enemies[i].state === EAD.enemies[i].STATE.ATTACK
            ) {
                if (EAD.player.energy_blue !== 0) {
                    EAD.enemies[i].damage = EAD.PlayerItem.ENERGY_BLUE;
                    EAD.enemies[i].state = EAD.enemies[i].STATE.DAMAGED;
                }
            }
            if (
                EAD.enemies[i].state === EAD.enemies[i].STATE.ACTIVE ||
                EAD.enemies[i].state === EAD.enemies[i].STATE.ATTACK
            ) {
                j = 0;
                while (j < EAD.player_shot_manager.MAX_PLAYER_SHOTS) {
                    if (
                        EAD.util.hasCollision(
                            EAD.enemies[i],
                            EAD.player_shots[j]
                        )
                    ) {
                        EAD.enemies[i].damage = EAD.player_shots[j].power;
                        EAD.enemies[i].state = EAD.enemies[i].STATE.DAMAGED;
                        EAD.player_shots[j].state =
                                EAD.player_shots[j].STATE.GARBAGE;
                    }
                    j += 1;
                }
                if (
                    !EAD.enemies[i].on_ground &&
                    EAD.util.hasCollision(EAD.enemies[i], EAD.player)
                ) {
                    EAD.enemies[i].damage = EAD.player.power;
                    EAD.enemies[i].state = EAD.enemies[i].STATE.DAMAGED;
                    if (
                        (
                            EAD.player.state === EAD.player.STATE.ACTIVE ||
                            EAD.player.state === EAD.player.STATE.ATTACK
                        ) &&
                        EAD.player.energy_green === 0
                    ) {
                        EAD.player.state = EAD.player.STATE.DAMAGED;
                    }
                }
            }
            if (
                EAD.enemies[i].state === EAD.enemies[i].STATE.ATTACK ||
                (
                    !EAD.enemies[i].on_ground &&
                    EAD.enemies[i].state === EAD.enemies[i].STATE.REVENGE
                )
            ) {
                EAD.enemy_shot_manager.fire(
                    EAD.enemies[i].x,
                    EAD.enemies[i].y,
                    EAD.enemies[i].on_ground
                );
            }
            if (
                EAD.enemies[i].on_ground &&
                EAD.enemies[i].state === EAD.enemies[i].STATE.REVENGE
            ) {
                EAD.player_item_manager.drop(
                    EAD.enemies[i].x,
                    EAD.enemies[i].y
                );
            }
            i += 1;
        }
        EAD.enemy_shot_manager.update(EAD.player.x, EAD.player.y);
        i = 0;
        while (i < EAD.enemy_shot_manager.MAX_ENEMY_SHOTS) {
            if (EAD.util.hasCollision(EAD.enemy_shots[i], EAD.player)) {
                EAD.enemy_shots[i].state
                        = EAD.enemy_shots[i].STATE.GARBAGE;
                if (
                    (
                        EAD.player.state === EAD.player.STATE.ACTIVE ||
                        EAD.player.state === EAD.player.STATE.ATTACK
                    ) &&
                    EAD.player.energy_green === 0
                ) {
                    EAD.player.state = EAD.player.STATE.DAMAGED;
                }
            }
            i += 1;
        }
        EAD.player_item_manager.update();
        EAD.player.energy_blue = 0;
        i = 0;
        while (i < EAD.player_item_manager.MAX_PLAYER_ITEMS) {
            if (EAD.util.hasCollision(EAD.player_items[i], EAD.player)) {
                EAD.player_items[i].state =
                        EAD.player_items[i].STATE.GARBAGE;
                switch (EAD.player_items[i].name) {
                case EAD.player_items[i].NAME.R_PLASMA:
                    EAD.player.energy_red = EAD.PlayerItem.ENERGY_RED;
                    break;
                case EAD.player_items[i].NAME.G_GODMODE:
                    EAD.player.energy_green = EAD.PlayerItem.ENERGY_GREEN;
                    break;
                case EAD.player_items[i].NAME.B_FLASH:
                    EAD.player.energy_blue = EAD.PlayerItem.ENERGY_BLUE;
                    break;
                default:
                    EAD.player_items[i].name =
                            EAD.player_items[i].NAME.NO_ITEM;
                }
            }
            i += 1;
        }
        EAD.difficulty = EAD.difficulty < EAD.MAX_DIFFICULTY
            ? EAD.difficulty + 1
            : EAD.MAX_DIFFICULTY;
        EAD.score = EAD.score < EAD.MAX_SCORE
            ? EAD.score + 1
            : EAD.MAX_SCORE;
        EAD.high_score = EAD.score < EAD.high_score
            ? EAD.high_score
            : EAD.score;
        if (EAD.score >= EAD.Player.BONUS_EVERY * EAD.player.bonus_count) {
            EAD.player.lives = EAD.player.lives < EAD.Player.MAX_LIVES
                ? EAD.player.lives + 1
                : EAD.Player.MAX_LIVES;
            EAD.player.bonus_count += 1;
        }
        if (EAD.player.state === EAD.player.STATE.GARBAGE) {
            EAD.game.state = EAD.game.STATE.SAVING;
        }
        EAD.ctx.front.fillText(
            "   PLASMA CANNON   " + energy_red,
            EAD.WIDTH / 2,
            12
        );
        EAD.ctx.front.fillText(
            "   INVINCIBLE      " + energy_green,
            EAD.WIDTH / 2,
            24
        );
        EAD.ctx.front.fillText(
            "LIVES " + lives,
            2,
            EAD.HEIGHT - EAD.BASE_PX - 3
        );
        break;

    case EAD.game.STATE.SAVING:
        EAD.game.storage_error = "";
        try {
            window.localStorage.setItem("high_score", EAD.high_score);
        } catch (e) {
            EAD.game.storage_error = e.name;
        }
        EAD.ctx.front.fillText("  === SAVING  DATA ===", EAD.WIDTH / 2, 12);
        if (EAD.game.storage_error) {
            EAD.ctx.front.fillText(
                "  *** SAVE  FAILED ***",
                EAD.WIDTH / 2,
                24
            );
        } else {
            EAD.ctx.front.fillText(
                "  -- SAVE COMPLETED --",
                EAD.WIDTH / 2,
                24
            );
        }
        EAD.enemy_manager.update(EAD.WIDTH / 2, EAD.HEIGHT);
        EAD.enemy_shot_manager.setup();
        EAD.enemy_shot_manager.update(EAD.WIDTH / 2, EAD.HEIGHT);
        EAD.player_manager.setup();
        EAD.player_manager.update();
        EAD.player_item_manager.setup();
        EAD.player_item_manager.update();
        EAD.player_shot_manager.setup();
        EAD.player_shot_manager.update(EAD.WIDTH / 2, EAD.HEIGHT);
        EAD.game.state = EAD.game.STATE.GAMEOVER;
        EAD.game.tweet_btn.setAttribute("href", EAD.util.generateTweetUrl({
            text: "I scored " +
                    EAD.score +
                    " points playing EVADE AND DESTROY." +
                    " Can you beat my score?",
            url: "https://github.com/mikkun/evade-and-destroy",
            hashtags: "EvadeAndDestroy,HTML5"
        }));
        EAD.game.tweet_btn.setAttribute("target", "_blank");
        EAD.game.dialog.style.display = "block";
        break;

    default:
        EAD.curr_y = 0;
        button_y = 0;
        EAD.enemy_manager.hideEnemyShips();
        EAD.enemy_manager.update(EAD.WIDTH / 2, EAD.HEIGHT);
        EAD.game.state = EAD.game.STATE.GAMEOVER;
        EAD.ctx.front.fillText("  ==== GAME  OVER ====", EAD.WIDTH / 2, 12);
        EAD.ctx.front.fillText("  -- BUTTON  LOCKED --", EAD.WIDTH / 2, 24);
    }

    EAD.ctx.front.fillText("HIGH SCORE   " + high_score, 2, 12);
    EAD.ctx.front.fillText("SCORE        " + score, 2, 24);

    EAD.bg01.scroll();
    EAD.bg02.scroll();

    EAD.enemy_manager.draw();
    EAD.enemy_shot_manager.draw();
    EAD.player_manager.draw();
    EAD.player_item_manager.draw();
    EAD.player_shot_manager.draw();

    EAD.ctx.front.drawImage(
        EAD.sprites,
        0,
        EAD.BASE_PX * button_y,
        EAD.WIDTH,
        EAD.BASE_PX,
        0,
        EAD.HEIGHT - EAD.BASE_PX,
        EAD.WIDTH,
        EAD.BASE_PX
    );
};
