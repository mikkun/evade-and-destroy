#!/bin/bash --

# Name    : convmap-bg01.sh
# Purpose : Convert "tmx/starfield.tmx" to "map-bg01.js"
#
# Author  : KUSANAGI Mitsuhisa <mikkun@mbg.nifty.com>
# License : MIT License

# Usage : ./convmap-bg01.sh

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

input_file='./tmx/starfield.tmx'
[ -f "$input_file" ]
ERROR_CHECK "$input_file: No such file or directory"

output_file='./map-bg01.js'
[ -f "$output_file" ] && rm -f "$output_file"

#=============================================================================
# Main
#=============================================================================
cat << END_CODE > "$output_file"
/*!
 * Name    : map-bg01.js
 * Purpose : Map of starfield (bg01)
 *
 * Author  : KUSANAGI Mitsuhisa <mikkun@mbg.nifty.com>
 * License : MIT License
 */

// Continue to use JSLint edition 2017-07-01
/*jslint bitwise, browser, multivar, this*/
/*global EAD, Image, Promise, caches, fetch, self, window*/

EAD.bg01_map = [
END_CODE

sed '/layer name="bg01"/,+31!d' "$input_file"           |
tail -n +3                                              |
tr ',' ' '                                              |
awk '{for(i=1;i<=NF;i++){printf $i-1", "};printf "\n"}' |
tac                                                     |
sed 's/ $//'                                            |
sed '$s/,$//'                                           |
sed 's/^/    /'                                         >> "$output_file"

echo '];' >> "$output_file"

#=============================================================================
# Exit
#=============================================================================
echo 'Conversion completed successfully.' >&2

exit 0
