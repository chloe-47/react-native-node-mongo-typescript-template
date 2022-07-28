#!/bin/bash

# Using xxd to generate a random string: https://stackoverflow.com/questions/34328759/how-to-get-a-random-string-of-32-hexadecimal-digits-through-command-line/34329057
# Using tr to remove newlines: https://stackoverflow.com/questions/10618798/removing-new-line-character-from-incoming-stream-using-sed

xxd -l 48 -p /dev/urandom | tr -d '\n' | xargs echo