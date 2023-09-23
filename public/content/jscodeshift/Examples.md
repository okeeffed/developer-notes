# JSCodeShift Examples

Input:

```tsx
function logToScreen(value) {
  console.log(value)
  return value
}

function add(x, y) {
  return logToScreen(x + y)
}

function subtract(x, y) {
  return logToScreen(x - y)
}

function multiply(x, y) {
  return logToScreen(x * y)
}

function divide(x, y) {
  return logToScreen(x / y)
}
```

AST Explorer parser code:

```tsx
// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = 'babel'

const isImpliedReturn = (body) => body.type !== 'BlockStatement'

/* Implied body could be more than just an identifier,
 * but interrop between the overlapping jscodeshift/
 * ast-types types is an absolute PITA. */
const buildBlockStatement = (jscodeshift, impliedBody) =>
  jscodeshift.blockStatement([jscodeshift.returnStatement(impliedBody)])

function removeLogToScreenFn(j, source) {
  return (
    j(source)
      .find(j.FunctionDeclaration)
      // Target a particular function declaration
      .filter(
        ({ node: functionDeclaration }) =>
          functionDeclaration.id.name === 'logToScreen'
      )
      .remove()
      .toSource()
  )
}

function removeLogToScreenInvocations(j, source) {
  return (
    j(source)
      .find(j.Identifier)
      // Target a particular function declaration
      .filter(({ node: identifier }) => identifier.name === 'logToScreen')
      .replaceWith((p) => {
        return ''
      })
      .toSource()
  )
}

function convertArrowFns(j, source) {
  return j(source)
    .find(j.VariableDeclaration)
    .filter(
      (n) => n.value.declarations[0].init.type === 'ArrowFunctionExpression'
    )
    .replaceWith((n) => {
      const declarator = n.value.declarations[0]
      const { params, body: rawBody, generator, async } = declarator.init

      const body = isImpliedReturn(rawBody)
        ? buildBlockStatement(j, rawBody)
        : rawBody

      const declaration = j.functionDeclaration(
        j.identifier(declarator.id.name),
        params,
        body,
        generator
      )

      /* There doesn't seem to be a parameter
       * for functionDeclaration() to create
       * async functions :/ */
      declaration.async = async

      return declaration
    })
    .toSource()
}

// Press ctrl+space for code completion
export default function transformer(file, api) {
  const j = api.jscodeshift

  const withoutFn = removeLogToScreenFn(j, file.source)
  const withoutInvocations = removeLogToScreenInvocations(j, withoutFn)
  const converted = convertArrowFns(j, withoutInvocations)

  return converted
}
```

Finally, the output looks like the following (if also run through a Prettier formatter):

```tsx
function add(x, y) {
  return x + y
}

function subtract(x, y) {
  return x - y
}

function multiply(x, y) {
  return x * y
}

function divide(x, y) {
  return x / y
}
```
