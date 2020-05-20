---
menu: Electron
name: Electron FS
---

# Electron File Systems

## Resources

1. [window.require is not a function](https://github.com/electron/electron/issues/7300)
2. [Dialog.showOpenDialog](https://www.electronjs.org/docs/api/dialog#dialogshowopendialogbrowserwindow-options)
3. [Electron's remote module considered harmful](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31)

## tl;dr

Warning: the following uses `remote` and is now considered harmful. See the [article](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31). Do not use unless you are certain on the why.

Once the app is up, here is an example app for opening files:

```javascript
import React, { useState } from 'react';
const fs = window.require('fs');
const electron = window.require('electron');
const { remote } = electron;

const App = () => {
  const [filePath, setFilePath] = useState<string>();
  const [fileJson, setFileJson] = useState<Record<string, any>>();
  const [saved, setSaved] = useState<boolean>(false);

  /**
   * Look for any files called strings.json and grab the
   * file path, read the data, update the data and set it
   * to the `fileJson` variable.
   *
   */
  const handleFileSelect = async () => {
    const res = await remote.dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Base i18n file', extensions: ['strings.json'] }],
    });

    const [jsonPath] = res.filePaths;
    if (jsonPath) {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      setFilePath(jsonPath);
      data.third = 'here';

      setFileJson(data);
    }
  };

  /**
   * Write the file back and set the saved flag.
   *
   */
  const handleSaveFile = () => {
    if (filePath) {
      fs.writeFileSync(filePath, JSON.stringify(fileJson), 'utf-8');
      setSaved(true);
    }
  };

  return (
    <div>
      {saved && <p>File saved!</p>}
      <p>Open + save file</p>
      <div>
        <button onClick={handleFileSelect}>Open file</button>
        <button onClick={handleSaveFile}>Save file</button>
      </div>
      <p>{JSON.stringify(fileJson)}</p>
    </div>
  );
};
export default App;
```

## Debugging notes

As for debugging, if you get `window.require is not a function`, then head to your Electron config file and update the `BrowserWindow` config to include the web preferences:

```javascript
mainWindow = new BrowserWindow({
  width: 900,
  height: 680,
  webPreferences: {
    nodeIntegration: true,
  },
});
```
