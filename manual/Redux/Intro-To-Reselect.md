---
name: Intro To Reselect
menu: Redux 
---
# Intro to Reselect

## Links

[Dan Parker - Medium article](https://medium.com/@parkerdan/react-reselect-and-redux-b34017f8194c)

## Basic example

```bash
yarn install reselect
```

```javascript
// Reducer file
import { createSelector } from 'reselect';

/* Selectors */
const getElementsUi = (state) => state.sidebarReducer.elementsUi;
export const getElementsUiState = createSelector(
  [getElementsUi],
  (elementsUi) => elementsUi
);

// In file calling mapStateToProps
const mapStateToProps = (state) => ({
  elementsUi: reducers.getElementsUiState(state)
});
const mapDispatchToProps = (dispatch) => ({ dispatch: dispatch });
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
```
