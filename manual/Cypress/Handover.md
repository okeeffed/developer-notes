---
menu: Cypress
name: Handover
---

# Handover

## Resources

1. [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices.html)

## Video 2

### Writing Cypress tests

#### Do not assign values in it block

This is do around Cypress context. You want to constantly chain. Cypress denotes that you should follow this convention:

```js
cy.then(() => assignSubjectValue);
```

Some of the reasoning is that during the test, the element assigned may no longer be visible in the DOM which can make the tests flaky.

#### Test structure

```js
describe('Eval Cycles', () => {
  describe('Listing page', () => {
    beforeEach(() => {
      cy.visit(url, { timeout: 120000 });
    });

    it('creates a new evaluation cycle by clicking the button', () => {
      cy.getByAutomationId(Aid.id, 0).click();
    });
  });
});
```

### isContext

This `isContext` value will help get the context ie "record", "playback" etc. We can use that value to then determine this works.

```js
describe('Eval Cycles', () => {
  describe('Listing page', () => {
    beforeEach(() => {
      cy.visit(url, { timeout: 120000 });
    });

    it('creates a new evaluation cycle by clicking the button', () => {
      cy.getByAutomationId(Aid.id, 0).click().isContext("record").then(recording) => {
        if (recording) {
          cy.wait("@POST")
        }
      };
    });
  });
});
```

#### Setting Cookies

```js
cy.setCookie('cookie', 'value');
```

#### Setting/Getting local storage

```js
cy.window().then(win => {
  win.localStorage.setTime('topNavTourComplete', 'true');
});
```

#### Get calls

These will reset the subject.

#### Order of what to pick

1. Automation ID
2. Text (okay but not ideal)
3. Classes (maybe slightly better than text, but also might change)

Cypress has a list of recommended ways and ways that are not recommended.

#### Custom commands

Check in the `cypress/support` file/folder.

### Things to be aware of

- New navigation: you can set a cookie for this to ensure that we do not display this cookie during tests. Use an option to not display this everytime.
