---
menu: TypeScript
name: Enforcing Key-Values In TypeScript
---

# Enforcing Key-Values In TypeScript

An example of how to enforce certain allowed keys.

```ts
type Property = 'FontFamily' | 'FontWeight' | 'TextColor'
type AllowedPropPrefix = 'heading' | 'byline' | 'description'
type AllowedPropName = `${AllowedPropPrefix}${Property}`

type FontFamily = "body" | "heading" | "sans";
type ButtonVariant = "link" | "outline" | "ghost" | "solid" | "unstyled";

type AllowedEditableValue = FontFamily | ButtonVariant

type EditableProps = Partial<{
  [key in AllowedPropName]: AllowedEditableValue
}>

interface IComponent extends EditableProps {
  name: string
}

const obj: IComponent = {
  name: 'test',
  headingFontFamily: 'body',
}
```
