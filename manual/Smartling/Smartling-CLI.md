---
menu: Smartling
name: Smartling CLI
---

# Smartling CLI

## tl;dr

| Command                                                    | Action                      |
| ---------------------------------------------------------- | --------------------------- |
| smartling-cli files pull --locale=en-AU                    | Pull AU locale translations |
| smartling-cli files push path/to/original/translations.yml | Push file to be translated  |

## Pull Command

The result of the files pulled is that they will written to the folders dictated by the push directory.

Output file depends purely on the `smartling.yml` output:

```yml
# (optional) Additional file-specific settings for push and pull commands.
files:
  # (optional) Special default section will apply configuration to all file
  # types except files, which URIs match following rules.
  default:
    # (optional) Defines pull-specific options.
    pull:
      # (optional) Format, which will be used to format file name.
      #
      # If not set, then default format will be used or format,
      # that is set via command line options.
      format: '{{name .FileURI}}{{with .Locale}}_{{.}}{{end}}{{ext .FileURI}}'
```

You can also pass format as a flag `--format` but note that there can be issues if regulations are not followed from [the Golang documentation](https://golang.org/pkg/text/template/).
