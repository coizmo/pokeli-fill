#! /bin/bash
set -eu

DEXKEY=$1

TARGET_CSV_FILE="dex${DEXKEY}.csv"
OUTPUT_DIR="species_${DEXKEY}"

mkdir -p $OUTPUT_DIR

echo "---"

for target in $(cat ${TARGET_CSV_FILE})
do
  echo ${target}
  echo ${target} | sed -E "s (.*/([0-9]+)/[^/]*)$ \1,\"${OUTPUT_DIR}/\2.json\" g" | xargs -I% sh -c 'curl -s $(echo % | cut -d"," -f2) > $(echo % | cut -d"," -f3)';
  sleep 1;
done

echo "---"
echo "Output $(ls ${OUTPUT_DIR} | wc -l) files in ${OUTPUT_DIR}."
