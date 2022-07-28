#!/bin/bash

# https://stackoverflow.com/questions/2427995/bash-no-arguments-warning-and-case-decisions
if [[ $# -eq 0 ]] ; then
    echo 'pass an argument to this script to specify the name of the project'
    exit 1
fi

# https://stackoverflow.com/questions/1583219/how-can-i-do-a-recursive-find-replace-of-a-string-with-awk-or-sed
find . \
  -not -path "\./\.git/*" \
  -not -path "\./node_modules/*" \
  -not -path "\./\.expo/*" \
  -not -path "\./init\.sh" \
  -type f -print0 \
  | LC_ALL=C xargs -0 sed -i '' \
  "s/react-native-node-mongo-typescript-template/$1/g"


yarn install

./scripts/init-mongodb.sh
./scripts/init-session-keys.sh


