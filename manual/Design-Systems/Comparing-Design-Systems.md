---
menu: Design Systems
name: Comparing Design System Components
---

# Comparing Design System Components

Use this resource to find resources and code for a variety of components to help write your own.

Each component has its own section.

For each section, there is table with the design system name, the type (ie link to code, guide, playground etc) and the link.

## Table of Contents

- [Comparing Design System Components](#comparing-design-system-components)
  - [Table of Contents](#table-of-contents)
  - [Button](#button)

## Button

| Design System | Type    | Link                                                                                              |
| ------------- | ------- | ------------------------------------------------------------------------------------------------- |
| Carbon        | source  | https://github.com/carbon-design-system/carbon-components-react/tree/master/src/components/Button |
| Carbon        | example | https://www.carbondesignsystem.com/components/button/code/                                        |
| AtlasKit      | example | https://atlaskit.atlassian.com/packages/core/button                                               |
| AtlasKit      | source  | https://bitbucket.org/atlassian/atlaskit-mk-2/src/master/packages/core/button                     |

AtlasKit button uses the following method to determine the element tag:

```javascript
getElement = () => {
  const { href, isDisabled } = this.props;
  if (href) {
    return isDisabled ? 'span' : 'a';
  }
  return 'button';
};
```
