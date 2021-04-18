#!/bin/bash
# Script assumes you are running from the Kratos root.

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

echo "=== copying config ==="
cp $DIR/../eslintrc.json $PWD/.eslintrc.json
cp $DIR/../prettierrc.json $PWD/.prettierrc.json


echo "=== npm install linter dependencies"
npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks prettier

