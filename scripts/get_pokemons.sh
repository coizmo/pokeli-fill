#! /bin/bash

INPUT_DIR=species_33
OUTPUT_DIR=pokemons_33

for target in $(find ${INPUT_DIR}/*.json | xargs -I% sh -c 'cat % | jq -r .varieties[].pokemon.url')
do
  output_file=$(echo ${target} | sed -E "s (.*/([0-9]+)/[^/]*)$ \2.json g")
  curl $target > ${OUTPUT_DIR}/${output_file};
  sleep 1;
done
