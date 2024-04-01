#! /bin/bash

TARGET_CSV_FILE=dex33.csv
OUTPUT_DIR=species_33

for target in $(cat ${TARGET_CSV_FILE})
do
  echo ${target} | sed -E "s (.*/([0-9]+)/[^/]*)$ \1,\"${OUTPUT_DIR}/\2.json\" g" | xargs -I% sh -c 'curl $(echo % | cut -d"," -f2) > $(echo % | cut -d"," -f3)';
  sleep 1;
done
