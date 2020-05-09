#!/usr/bin/env node

/**
 * Dynamically generates a script you can `source ./bin/docs-autocompletions`
 * to gen local options for installation.
 */

const fs = require('fs');

const getDirectories = source =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const getFiles = source =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isFile())
    .map(dirent => dirent.name);

const directoryAutocomplete = ({ directory, files }) => `
${directory})
    COMPREPLY=($(compgen -W "${files.join(' ')}" -- \${cur}))
;;
`;

const main = () => {
  const directories = getDirectories('./manual');
  const fileAutocomplete = [];

  for (const directory of directories) {
    const files = getFiles(`./manual/${directory}`).map(file =>
      file.replace('.md', ''),
    );
    fileAutocomplete.push({
      directory,
      files,
    });
  }

  if (!fs.existsSync('./bin')) {
    console.log('bin folder does not exist');
    process.exit(0);
  }

  let strInterpolation = '';

  for (const info of fileAutocomplete) {
    strInterpolation += directoryAutocomplete(info);
  }

  const completions = `
  #!/bin/bash
  _docs_options()
  {
      local cur prev
      
      cur=\${COMP_WORDS[COMP_CWORD]}
      prev=\${COMP_WORDS[COMP_CWORD-1]}
      
      case \${COMP_CWORD} in
          1)
              COMPREPLY=($(compgen -W "${directories.join(' ')}" -- \${cur}))
          ;;
          2)
              case \${prev} in
                  ${strInterpolation}
              esac
          ;;
          *)
              COMPREPLY=()
          ;;
      esac
  }
  
  complete -F _docs_options docs
  `;

  fs.writeFileSync('./bin/docs-autocomplete.sh', completions, 'utf-8');

  console.log(
    '[Success]: Autocompletions written to bin/lift-autocomplete.sh for project',
  );
};

main();
