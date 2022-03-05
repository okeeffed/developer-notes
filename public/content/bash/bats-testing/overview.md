# Bats overview

## Resources

1. [Bats GitHub](https://github.com/sstephenson/bats)

## Example

Testing and confirming that the lines match:

```sh
#!/usr/bin/env bats

load linting.sh

MULTI_FILE_TYPE="fail.yml test.js fail.rb test.tsx test.ts"

@test "grep_js_files should only return .[j|t]sx? files" {
  run bash -c "echo $MULTI_FILE_TYPE | space_to_new_line | grep_js_files"
  [ "${lines[0]}" = "test.js" ]
  [ "${lines[1]}" = "test.tsx" ]
  [ "${lines[2]}" = "test.ts" ]
}
```

## Logging

Use `echo 'text' >&3` and run `bats` with `-t` flag. Must be removed before running without flag:

```sh
@test "grep_js_files should return empty if no results" {
  run bash -c "echo $NO_JS_FILE_TYPE | space_to_new_line | grep_js_files | ( [ -n $@ ] && echo empty || echo not_empty)"
  echo "$output" >&3
  [ "$output" = "empty" ]
}
```
