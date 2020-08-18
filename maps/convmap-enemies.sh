#!/bin/bash --

# Name    : convmap-enemies.sh
# Purpose : Convert "tmx/area-{0..7}.tmx" to "map-enemies.js"
#
# Author  : KUSANAGI Mitsuhisa <mikkun@mbg.nifty.com>
# License : MIT License

# Usage : ./convmap-enemies.sh

#=============================================================================
# Initialization
#=============================================================================
set -u
shopt -s expand_aliases

if [ "$(uname)" != 'Linux' ] ; then
    alias awk='gawk'
    alias date='gdate'
    alias fold='gfold'
    alias sed='gsed'
    alias tac='tail -r'
    alias tr='gtr'
fi

IFS="$(printf ' \t\n_')" ; IFS="${IFS%_}"
PATH='/usr/bin:/bin'
export IFS PATH

ERROR_CHECK() {
    [ "$(echo "${PIPESTATUS[@]}" | tr -d ' 0')" = '' ] && return
    echo "$1" >&2

    exit 1
}

for i in {0..7} ; do
    input_file="./tmx/area-$i.tmx"
    [ -f "$input_file" ]
    ERROR_CHECK "$input_file: No such file or directory"
done

output_file='./map-enemies.js'
[ -f "$output_file" ] && rm -f "$output_file"

#=============================================================================
# Main
#=============================================================================
cat << END_CODE > "$output_file"
/*!
 * Name    : map-enemies.js
 * Purpose : Map of enemies
 *
 * Author  : KUSANAGI Mitsuhisa <mikkun@mbg.nifty.com>
 * License : MIT License
 */

// Continue to use JSLint edition 2017-07-01
/*jslint bitwise, browser, multivar, this*/
/*global EAD, Image, Promise, caches, fetch, self, window*/

EAD.enemies_maps = [];

END_CODE

for i in {0..7} ; do
    input_file="./tmx/area-$i.tmx"

    echo "EAD.enemies_maps[$i] = [" >> "$output_file"

    sed '/layer name="enemies"/,+61!d' "$input_file" |
    tail -n +3                                       |
    sed '$s/$/,/'                                    |
    sed 's/^/    /'                                  |
    sed 's/,/, /g'                                   |
    sed 's/ 0,/ 10,/g'                               | # EMPTY
    sed 's/ 61,/ 10,/g'                              | # EMPTY
    sed 's/ 72,/ 21,/g'                              | # RADAR
    sed 's/ 75,/ 25,/g'                              | # AA_FIXED
    sed 's/ 78,/ 31,/g'                              | # AA_L2R_1
    sed 's/ 68,/ 32,/g'                              | # AA_L2R_2
    sed 's/ 79,/ 34,/g'                              | # AA_R2L_1
    sed 's/ 69,/ 35,/g'                              | # AA_R2L_2
    sed 's/ 80,/ 37,/g'                              | # AA_T2B_1
    sed 's/ 70,/ 38,/g'                              | # AA_T2B_2
    sed 's/ 83,/ 40,/g'                              | # ANY_SHIP
    sed 's/ 81,/ 50,/g'                              | # RECON
    sed 's/ 85,/ 60,/g'                              | # FIGHTER
    sed 's/ 87,/ 71,/g'                              | # MISSILE_A
    sed 's/ 88,/ 72,/g'                              | # MISSILE_B
    sed 's/ 89,/ 80,/g'                              | # METEOR
    sed 's/ 62,/ 90,/g'                              | # RANDOM
    tac                                              |
    sed 's/ $//'                                     |
    sed '$s/,$//'                                    >> "$output_file"

    echo '];' >> "$output_file"
done

cat << END_CODE >> "$output_file"

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
END_CODE

#=============================================================================
# Exit
#=============================================================================
echo 'Conversion completed successfully.' >&2

exit 0
