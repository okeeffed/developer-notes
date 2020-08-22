---
menu: Chrome
name: React Chrome Extensions
---

# React Chrome Extensions

Use the [modern boilerplate](https://github.com/jhen0409/react-chrome-extension-boilerplate.git). It may need some updates.

## Project Notes

This is an algorithm to find subsets that can be replaced.

```js
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === comboType[0]) {
    let flag = true;
    for (let j = 1; j < comboType.length; j++) {
      if (arr[i + j] !== comboType[j]) flag = false;
    }

    if (flag) {
      return arr.splice(i, comboType.length, 'combined');
    }
  }
}
```

## Resources

1. [Basic CRA Chrome Extension](https://dev.to/bayardlouis470/create-chrome-extension-in-react-3pna)
2. [All you'll ever need to know about Chrome extensions](https://itnext.io/all-youll-ever-need-to-know-about-chrome-extensions-ceede9c28836)
3. [Chrome Message API blog post](https://itnext.io/create-chrome-extension-with-reactjs-using-inject-page-strategy-137650de1f39)
4. [Chrome Developer - message passing](https://developer.chrome.com/extensions/messaging)
5. [Home to remove chrome warnings](https://stackoverflow.com/questions/47075437/cannot-find-namespace-name-chrome)
6. [Checkly - Puppeteer Recorder](https://github.com/checkly/puppeteer-recorder)
7. [Create Todo Chrome extension](https://medium.com/javascript-in-plain-english/creating-a-todo-chrome-extension-with-react-custom-hooks-and-local-storage-f8f8d8910ee)
8. [Background.js Chrome Inspect](https://stackoverflow.com/questions/3829150/google-chrome-extension-console-log-from-background-page/3833157#:~:text=To%20answer%20your%20question%20directly,inspect%20view%20under%20your%20extension.&text=log%20should%20show%20log%20message%20in%20the%20current%20page.)
9. [Debug popup](https://stackoverflow.com/questions/5039875/debug-popup-html-of-a-chrome-extensioni)
10. [Chrome extensionn boilerplate](https://github.com/jhen0409/react-chrome-extension-boilerplate.git)
11. [Modern boilerplate](https://github.com/jhen0409/react-chrome-extension-boilerplate.git)
