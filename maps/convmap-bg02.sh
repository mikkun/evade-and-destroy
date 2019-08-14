#!/bin/bash --

# Name    : convmap-bg02.sh
# Purpose : Convert "tmx/area-{0..7}.tmx" to "map-bg02.js"
#
# Author  : KUSANAGI Mitsuhisa <mikkun@mbg.nifty.com>
# Licence : MIT License

# Usage : ./convmap-bg02.sh

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

output_file='./map-bg02.js'
[ -f "$output_file" ] && rm -f "$output_file"

#=============================================================================
# Main
#=============================================================================
cat << END_CODE > "$output_file"
/*!
 * Name    : map-bg02.js
 * Purpose : Map of the enemy space station (bg02)
 *
 * Author  : KUSANAGI Mitsuhisa <mikkun@mbg.nifty.com>
 * Licence : MIT License
 */

/*jslint bitwise, browser, multivar, this*/
/*global EAD, Image, Promise, caches, fetch, self, window*/

EAD.bg02_maps = [];

END_CODE

for i in {0..7} ; do
    input_file="./tmx/area-$i.tmx"

    echo "EAD.bg02_maps[$i] = [" >> "$output_file"

    sed '/layer name="bg02"/,+61!d' "$input_file"           |
    tail -n +3                                              |
    tr ',' ' '                                              |
    awk '{for(i=1;i<=NF;i++){printf $i-1", "};printf "\n"}' |
    tac                                                     |
    sed 's/-1, /10, /g'                                     |
    sed 's/ $//'                                            |
    sed '$s/,$//'                                           |
    sed 's/^/    /'                                         >> "$output_file"

    echo '];' >> "$output_file"
done

cat << END_CODE >> "$output_file"

EAD.bg02_map = EAD.bg02_maps[EAD.area_order[0]].concat(
    EAD.bg02_maps[EAD.area_order[1]],
    EAD.bg02_maps[EAD.area_order[2]],
    EAD.bg02_maps[EAD.area_order[3]],
    EAD.bg02_maps[EAD.area_order[4]],
    EAD.bg02_maps[EAD.area_order[5]],
    EAD.bg02_maps[EAD.area_order[6]],
    EAD.bg02_maps[EAD.area_order[7]]
);

EAD.bg02_maps.length = 0;
END_CODE

#=============================================================================
# Exit
#=============================================================================
echo 'Conversion completed successfully.' >&2

exit 0
