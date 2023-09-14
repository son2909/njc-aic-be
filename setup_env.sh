# !/bin/bash

declare -A stages=(
    ["dev"]="development"
    ["test"]="test"
    ["stg"]="staging"
    ["prod"]="production"
)

sed \
    -e "s#NODE_ENV=.*#NODE_ENV=${stages[$1]}#" \
    .env.example > .env.${stages[$1]}
