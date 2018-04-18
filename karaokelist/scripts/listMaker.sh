#!/bin/bash
##########################################
# This will convert a list of file names into a js array to be used with karaoke list.js.
# usage: ./listmaker.sh fileNameList.txt
##########################################
# to create fileNameList.txt:
#
# on windows, run:
# dir "C:\directory to copy" /a-d /b /s > fileNameList.txt
#
# on mac, run:
# find path/to/directory -type f -exec basename {} \; | sort > fileNameList.txt
##########################################
OUTPUT_FILE="list.js"

echo "function buildSongList() {" > $OUTPUT_FILE
echo "var a = new Array;" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

while IFS='' read -r line || [[ -n "$line" ]]; do
    echo "a.push([\"$line\"]);" >> $OUTPUT_FILE
done < "$1"

echo "" >> $OUTPUT_FILE
echo "return a;" >> $OUTPUT_FILE
echo "}" >> $OUTPUT_FILE