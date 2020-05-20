---
menu: Electron
name: Opening Local Files
---

# Electron Opening Local Files

## Resources

1. [window.require is not a function](https://github.com/electron/electron/issues/7300)
2. [Dialog.showOpenDialog](https://www.electronjs.org/docs/api/dialog#dialogshowopendialogbrowserwindow-options)

Once the app is up, here is an example app for opening files:

```javascript
import React from 'react';
const electron = window.require('electron');
const { remote } = electron;

const App = () => {
  const handleFileSelect = async () => {
    const res = await remote.dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Base i18n file', extensions: ['strings.json'] }],
    });

    console.log(res);
  };

  return (
    <div>
      <p>Hello World!</p>
      <button onClick={handleFileSelect}>Open file</button>
    </div>
  );
};
export default App;
```

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
