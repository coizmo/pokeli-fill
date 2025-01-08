#! /bin/bash
set -eu

DEXKEY=$1

INPUT_DIR="species_${DEXKEY}"
OUTPUT_DIR="pokemons_${DEXKEY}"

mkdir -p $OUTPUT_DIR

echo "---"

for target in $(find ${INPUT_DIR}/*.json | xargs -I% sh -c 'cat % | jq -r .varieties[].pokemon.url')
do
  echo ${target}
  output_file=$(echo ${target} | sed -E "s (.*/([0-9]+)/[^/]*)$ \2.json g")
  curl -s $target > ${OUTPUT_DIR}/${output_file};
  sleep 1;
done

echo "---"
echo "Output $(ls ${OUTPUT_DIR} | wc -l) files in ${OUTPUT_DIR}."
