#!/bin/sh

find docs -type f -name '*.mmd' -print0 | sort -z | xargs -n1 -r0 npx @mermaid-js/mermaid-cli -i
