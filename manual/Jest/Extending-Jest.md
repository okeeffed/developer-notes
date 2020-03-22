---
menu: Jest
name: Extending Jest
---

# Extending Jest

```javascript
// example file test/extensions.js
import { matcherHint, printReceived, printExpected } from 'jest-matcher-utils';
import chalk from 'chalk';
import 'jest-dom/extend-expect';

const extensions = {
  toBeOn(toggleButton) {
    const on = toggleButton.classList.contains('toggle-btn-on');
    if (on) {
      return {
        message: () =>
          [
            `${matcherHint('.not.toBeOn', 'received', '')} ${chalk.dim(
              '// it does not have the toggle-btn-on class',
            )}`,
            `Expected the given element to not contain the class name:`,
            `  ${printExpected('toggle-btn-on')}`,
            `Received element:`,
            `  ${printReceived(toggleButton)}`,
            '',
            `Because of this, ${chalk.bold(
              `the button is in an ${chalk.underline('on')} state`,
            )}`,
            '',
          ].join('\n'),
        pass: true,
      };
    } else {
      return {
        message: () =>
          [
            `${matcherHint('.toBeOn', 'received', '')} ${chalk.dim(
              '// it has the toggle-btn-on class',
            )}`,
            '',
            `Expected the given element to contain the class name:`,
            `  ${printExpected('toggle-btn-on')}`,
            `Received element:`,
            `  ${printReceived(toggleButton)}`,
            '',
            `Because of this, ${chalk.bold(
              `the button is in an ${chalk.underline('off')} state`,
            )}`,
            '',
          ].join('\n'),
        pass: false,
      };
    }
  },
  toBeOff(toggleButton) {
    const off = toggleButton.classList.contains('toggle-btn-off');
    if (off) {
      return {
        message: () =>
          [
            `${matcherHint('.not.toBeOff', 'received', '')} ${chalk.dim(
              '// it does not have the toggle-btn-off class',
            )}`,
            `Expected the given element to not contain the class name:`,
            `  ${printExpected('toggle-btn-off')}`,
            `Received element:`,
            `  ${printReceived(toggleButton)}`,
            '',
            `Because of this, ${chalk.bold(
              `the button is in an ${chalk.underline('off')} state`,
            )}`,
            '',
          ].join('\n'),
        pass: true,
      };
    } else {
      return {
        message: () =>
          [
            `${matcherHint('.toBeOff', 'received', '')} ${chalk.dim(
              '// it has the toggle-btn-off class',
            )}`,
            '',
            `Expected the given element to contain the class name:`,
            `  ${printExpected('toggle-btn-off')}`,
            `Received element:`,
            `  ${printReceived(toggleButton)}`,
            '',
            `Because of this, ${chalk.bold(
              `the button is in an ${chalk.underline('on')} state`,
            )}`,
            '',
          ].join('\n'),
        pass: false,
      };
    }
  },
};

export { extensions };

// helper func in `test/utils.js` that is used for startup
expect.extend(extensions);
```

Then for an example of the usage:

```javascript
test('renders a toggle component', () => {
  const handleToggle = jest.fn();
  const { toggleButton, toggle } = renderToggle(
    <Usage onToggle={handleToggle} />,
  );
  expect(toggleButton).toBeOff();
  toggle();
  expect(toggleButton).toBeOn();
  expect(handleToggle).toHaveBeenCalledTimes(1);
  expect(handleToggle).toHaveBeenCalledWith(true);
});
```
