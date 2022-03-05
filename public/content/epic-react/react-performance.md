---
menu: Epic React
name: React Performance
---

# React Performance

React in general is fast. That being said, there are tools to help aid us when we need those tools to help optimize particular scenarios.

What is important is to know what tool to grab at the appropriate time.

## Code Splitting

The single, biggest impact you can have on your performance. It will help lazily load code when required.

In this first example, we simple used `React.lazy` to lazy import a file and then used the `Suspense` library to handle the fallback.

What is important to do to test and see the visual changes:

1. Check the network tab
2. Check the coverage tab

```js
// Code splitting
// http://localhost:3000/isolated/exercise/01.js

import * as React from "react";
// 💣 remove this import

// 🐨 use React.lazy to create a Globe component which using a dynamic import
// to get the Globe component from the '../globe' module.
const Globe = React.lazy(() => import("../globe"));

const Fallback = () => <div>loading...</div>;

function App() {
  const [showGlobe, setShowGlobe] = React.useState(false);

  // 🐨 wrap the code below in a <React.Suspense /> component
  // with a fallback.
  // 💰 try putting it in a few different places and observe how that
  // impacts the user experience.
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        padding: "2rem",
      }}
    >
      <label style={{ marginBottom: "1rem" }}>
        <input
          type="checkbox"
          checked={showGlobe}
          onChange={(e) => setShowGlobe(e.target.checked)}
        />
        {" show globe"}
      </label>

      <div style={{ width: 400, height: 400 }}>
        <React.Suspense fallback={<Fallback />}>
          {showGlobe ? <Globe /> : null}
        </React.Suspense>
      </div>
    </div>
  );
}
// 🦉 Note that if you're not on the isolated page, then you'll notice that this
// app actually already has a React.Suspense component higher up in the tree
// where this component is rendered, so you *could* just rely on that one.

export default App;
```

### Eager Loading

Given a certain "indication" that a user may click, we can load earlier.

We can enter a `onMouseEnter` and `onFocus` to fire an eager import:

```js
// Code splitting
// http://localhost:3000/isolated/exercise/01.js

import * as React from "react";
// 💣 remove this import

const loadGlobe = () => import("../globe");
// 🐨 use React.lazy to create a Globe component which using a dynamic import
// to get the Globe component from the '../globe' module.
const Globe = React.lazy(loadGlobe);
const Fallback = () => <div>loading...</div>;

function App() {
  const [showGlobe, setShowGlobe] = React.useState(false);

  // 🐨 wrap the code below in a <React.Suspense /> component
  // with a fallback.
  // 💰 try putting it in a few different places and observe how that
  // impacts the user experience.
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        padding: "2rem",
      }}
    >
      <label style={{ marginBottom: "1rem" }}>
        <input
          type="checkbox"
          checked={showGlobe}
          onChange={(e) => setShowGlobe(e.target.checked)}
          onMouseEnter={loadGlobe}
          onFocus={loadGlobe}
        />
        {" show globe"}
      </label>

      <div style={{ width: 400, height: 400 }}>
        <React.Suspense fallback={<Fallback />}>
          {showGlobe ? <Globe /> : null}
        </React.Suspense>
      </div>
    </div>
  );
}
// 🦉 Note that if you're not on the isolated page, then you'll notice that this
// app actually already has a React.Suspense component higher up in the tree
// where this component is rendered, so you *could* just rely on that one.

export default App;
```

### Webpack Magic Comments

A comment like the following will allow you to start pre-fetching some other resources. Webpack has an API for you to hook into.

```js
import(/* webpackPrefetch: true */ "./some-module.js");
```

You can confirm this prefetch work based on what shows in the elements tab under the `head` tag to see the prefetch links have been added.

### Suspense Position

In future React, there will be some implications for React Suspense for when it is mounted as opposed to updated.

It is also very important for the position of your Suspense tool to be correct.

There is also the capability to click a button to "suspend" the component and see what is looks like from the React DevTools.

### Understanding the coverage report

When you check the coverage of the before and after, you see there are less files in the after and a significant amount of savings.

Clicking on the individual files also shows you chunks with lines that have and have not been used.

## useMemo

`useMemo` is the hero you need for expensive calculations and how the API works.

The example shows a massive list that should not recalculate with the same input value:

```js
// useMemo for expensive calculations
// http://localhost:3000/isolated/exercise/02.js

import * as React from "react";
import { useCombobox } from "../use-combobox";
import { getItems } from "../filter-cities";
import { useForceRerender } from "../utils";

function Menu({
  items,
  getMenuProps,
  getItemProps,
  highlightedIndex,
  selectedItem,
}) {
  return (
    <ul {...getMenuProps()}>
      {items.map((item, index) => (
        <ListItem
          key={item.id}
          getItemProps={getItemProps}
          item={item}
          index={index}
          selectedItem={selectedItem}
          highlightedIndex={highlightedIndex}
        >
          {item.name}
        </ListItem>
      ))}
    </ul>
  );
}

function ListItem({
  getItemProps,
  item,
  index,
  selectedItem,
  highlightedIndex,
  ...props
}) {
  const isSelected = selectedItem?.id === item.id;
  const isHighlighted = highlightedIndex === index;
  return (
    <li
      {...getItemProps({
        index,
        item,
        style: {
          fontWeight: isSelected ? "bold" : "normal",
          backgroundColor: isHighlighted ? "lightgray" : "inherit",
        },
        ...props,
      })}
    />
  );
}

function App() {
  const forceRerender = useForceRerender();
  const [inputValue, setInputValue] = React.useState("");

  // 🐨 wrap getItems in a call to `React.useMemo`
  const allItems = React.useMemo(() => getItems(inputValue), [inputValue]);
  const items = allItems.slice(0, 100);

  const {
    selectedItem,
    highlightedIndex,
    getComboboxProps,
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    selectItem,
  } = useCombobox({
    items,
    inputValue,
    onInputValueChange: ({ inputValue: newValue }) => setInputValue(newValue),
    onSelectedItemChange: ({ selectedItem }) =>
      alert(
        selectedItem ? `You selected ${selectedItem.name}` : "Selection Cleared"
      ),
    itemToString: (item) => (item ? item.name : ""),
  });

  return (
    <div className="city-app">
      <button onClick={forceRerender}>force rerender</button>
      <div>
        <label {...getLabelProps()}>Find a city</label>
        <div {...getComboboxProps()}>
          <input {...getInputProps({ type: "text" })} />
          <button onClick={() => selectItem(null)} aria-label="toggle menu">
            &#10005;
          </button>
        </div>
        <Menu
          items={items}
          getMenuProps={getMenuProps}
          getItemProps={getItemProps}
          highlightedIndex={highlightedIndex}
          selectedItem={selectedItem}
        />
      </div>
    </div>
  );
}

export default App;
```

### Using a Web Worker

There is information about this more [on Kent's blog](https://kentcdodds.com/blog/speed-up-your-app-with-web-workers).

There is a `workerize` Webpack loader that can be used with Webpack that helps this process.

## React.memo

The lifecycle of a React app goes `render -> reconciliation -> commit -> state change -> repeat`.

React is fast at doing this, but sometimes it needs help for Performance.

> Note: you should fix slow renders before you fix re-renders.

In the React DevTools profile, you can shift through each "commit" on the top "bar chart". We can rectify some of these issues using `pureComponent` or `memo`.

We seriously improved the experience with this:

```js
// React.memo for reducing unnecessary re-renders
// http://localhost:3000/isolated/exercise/03.js

import * as React from "react";
import { useCombobox } from "../use-combobox";
import { getItems } from "../workerized-filter-cities";
import { useAsync, useForceRerender } from "../utils";

function Menu({
  items,
  getMenuProps,
  getItemProps,
  highlightedIndex,
  selectedItem,
}) {
  return (
    <ul {...getMenuProps()}>
      {items.map((item, index) => (
        <ListItem
          key={item.id}
          getItemProps={getItemProps}
          item={item}
          index={index}
          selectedItem={selectedItem}
          highlightedIndex={highlightedIndex}
        >
          {item.name}
        </ListItem>
      ))}
    </ul>
  );
}
// 🐨 Memoize the Menu here using React.memo
Menu = React.memo(Menu);

function ListItem({
  getItemProps,
  item,
  index,
  selectedItem,
  highlightedIndex,
  ...props
}) {
  const isSelected = selectedItem?.id === item.id;
  const isHighlighted = highlightedIndex === index;
  return (
    <li
      {...getItemProps({
        index,
        item,
        style: {
          fontWeight: isSelected ? "bold" : "normal",
          backgroundColor: isHighlighted ? "lightgray" : "inherit",
        },
        ...props,
      })}
    />
  );
}
// 🐨 Memoize the ListItem here using React.memo
ListItem = React.memo(ListItem);

function App() {
  const forceRerender = useForceRerender();
  const [inputValue, setInputValue] = React.useState("");

  const { data: allItems, run } = useAsync({ data: [], status: "pending" });
  React.useEffect(() => {
    run(getItems(inputValue));
  }, [inputValue, run]);
  const items = allItems.slice(0, 100);

  const {
    selectedItem,
    highlightedIndex,
    getComboboxProps,
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    selectItem,
  } = useCombobox({
    items,
    inputValue,
    onInputValueChange: ({ inputValue: newValue }) => setInputValue(newValue),
    onSelectedItemChange: ({ selectedItem }) =>
      alert(
        selectedItem ? `You selected ${selectedItem.name}` : "Selection Cleared"
      ),
    itemToString: (item) => (item ? item.name : ""),
  });

  return (
    <div className="city-app">
      <button onClick={forceRerender}>force rerender</button>
      <div>
        <label {...getLabelProps()}>Find a city</label>
        <div {...getComboboxProps()}>
          <input {...getInputProps({ type: "text" })} />
          <button onClick={() => selectItem(null)} aria-label="toggle menu">
            &#10005;
          </button>
        </div>
        <Menu
          items={items}
          getMenuProps={getMenuProps}
          getItemProps={getItemProps}
          highlightedIndex={highlightedIndex}
          selectedItem={selectedItem}
        />
      </div>
    </div>
  );
}

export default App;
```

### Custom Comparator

We can create a custom comparator to define when we should re-render.

In the above, you may notice that highlighting a component is forcing all items to re-render.

We can get around this using a custom comparator in `React.memo` as the second argument for the `ListItem`.

```js
// React.memo for reducing unnecessary re-renders
// http://localhost:3000/isolated/exercise/03.js

import * as React from "react";
import { useCombobox } from "../use-combobox";
import { getItems } from "../workerized-filter-cities";
import { useAsync, useForceRerender } from "../utils";

function Menu({
  items,
  getMenuProps,
  getItemProps,
  highlightedIndex,
  selectedItem,
}) {
  return (
    <ul {...getMenuProps()}>
      {items.map((item, index) => (
        <ListItem
          key={item.id}
          getItemProps={getItemProps}
          item={item}
          index={index}
          selectedItem={selectedItem}
          highlightedIndex={highlightedIndex}
        >
          {item.name}
        </ListItem>
      ))}
    </ul>
  );
}
// 🐨 Memoize the Menu here using React.memo
Menu = React.memo(Menu);

function ListItem({
  getItemProps,
  item,
  index,
  selectedItem,
  highlightedIndex,
  ...props
}) {
  const isSelected = selectedItem?.id === item.id;
  const isHighlighted = highlightedIndex === index;
  return (
    <li
      {...getItemProps({
        index,
        item,
        style: {
          fontWeight: isSelected ? "bold" : "normal",
          backgroundColor: isHighlighted ? "lightgray" : "inherit",
        },
        ...props,
      })}
    />
  );
}
// 🐨 Memoize the ListItem here using React.memo and use Domain Specific Knowledge
// to help React know when it should trigger a re-render.
ListItem = React.memo(ListItem, (prevProps, nextProps) => {
  if (prevProps.getItemProps !== nextProps.getItemProps) return false;
  if (prevProps.items !== nextProps.items) return false;
  if (prevProps.index !== nextProps.index) return false;
  if (prevProps.selectItem !== nextProps.selectItem) return false;

  if (prevProps.highlightedIndex !== nextProps.highlightedIndex) {
    const wasPrevHighlighed = prevProps.highlightedIndex === prevProps.index;
    const isNowHighlighted = nextProps.highlightedIndex === nextProps.index;

    return wasPrevHighlighed === isNowHighlighted;
  }

  return true;
});

function App() {
  const forceRerender = useForceRerender();
  const [inputValue, setInputValue] = React.useState("");

  const { data: allItems, run } = useAsync({ data: [], status: "pending" });
  React.useEffect(() => {
    run(getItems(inputValue));
  }, [inputValue, run]);
  const items = allItems.slice(0, 100);

  const {
    selectedItem,
    highlightedIndex,
    getComboboxProps,
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    selectItem,
  } = useCombobox({
    items,
    inputValue,
    onInputValueChange: ({ inputValue: newValue }) => setInputValue(newValue),
    onSelectedItemChange: ({ selectedItem }) =>
      alert(
        selectedItem ? `You selected ${selectedItem.name}` : "Selection Cleared"
      ),
    itemToString: (item) => (item ? item.name : ""),
  });

  return (
    <div className="city-app">
      <button onClick={forceRerender}>force rerender</button>
      <div>
        <label {...getLabelProps()}>Find a city</label>
        <div {...getComboboxProps()}>
          <input {...getInputProps({ type: "text" })} />
          <button onClick={() => selectItem(null)} aria-label="toggle menu">
            &#10005;
          </button>
        </div>
        <Menu
          items={items}
          getMenuProps={getMenuProps}
          getItemProps={getItemProps}
          highlightedIndex={highlightedIndex}
          selectedItem={selectedItem}
        />
      </div>
    </div>
  );
}

export default App;
```

### Primitive values

Here we want to reduce the size of the custom comparator by only passing primitive values.

Now that we are passing primities, we don't need our custom comparator!

```js
// React.memo for reducing unnecessary re-renders
// http://localhost:3000/isolated/exercise/03.js

import * as React from "react";
import { useCombobox } from "../use-combobox";
import { getItems } from "../workerized-filter-cities";
import { useAsync, useForceRerender } from "../utils";

function Menu({
  items,
  getMenuProps,
  getItemProps,
  highlightedIndex,
  selectedItem,
}) {
  return (
    <ul {...getMenuProps()}>
      {items.map((item, index) => (
        <ListItem
          key={item.id}
          getItemProps={getItemProps}
          item={item}
          index={index}
          isSelected={selectedItem?.id === item.id}
          isHighlighted={highlightedIndex === index}
        >
          {item.name}
        </ListItem>
      ))}
    </ul>
  );
}
// 🐨 Memoize the Menu here using React.memo
Menu = React.memo(Menu);

function ListItem({
  getItemProps,
  item,
  index,
  isSelected,
  isHighlighted,
  ...props
}) {
  return (
    <li
      {...getItemProps({
        index,
        item,
        style: {
          fontWeight: isSelected ? "bold" : "normal",
          backgroundColor: isHighlighted ? "lightgray" : "inherit",
        },
        ...props,
      })}
    />
  );
}
// 🐨 Memoize the ListItem here using React.memo
ListItem = React.memo(ListItem);

function App() {
  const forceRerender = useForceRerender();
  const [inputValue, setInputValue] = React.useState("");

  const { data: allItems, run } = useAsync({ data: [], status: "pending" });
  React.useEffect(() => {
    run(getItems(inputValue));
  }, [inputValue, run]);
  const items = allItems.slice(0, 100);

  const {
    selectedItem,
    highlightedIndex,
    getComboboxProps,
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    selectItem,
  } = useCombobox({
    items,
    inputValue,
    onInputValueChange: ({ inputValue: newValue }) => setInputValue(newValue),
    onSelectedItemChange: ({ selectedItem }) =>
      alert(
        selectedItem ? `You selected ${selectedItem.name}` : "Selection Cleared"
      ),
    itemToString: (item) => (item ? item.name : ""),
  });

  return (
    <div className="city-app">
      <button onClick={forceRerender}>force rerender</button>
      <div>
        <label {...getLabelProps()}>Find a city</label>
        <div {...getComboboxProps()}>
          <input {...getInputProps({ type: "text" })} />
          <button onClick={() => selectItem(null)} aria-label="toggle menu">
            &#10005;
          </button>
        </div>
        <Menu
          items={items}
          getMenuProps={getMenuProps}
          getItemProps={getItemProps}
          highlightedIndex={highlightedIndex}
          selectedItem={selectedItem}
        />
      </div>
    </div>
  );
}

export default App;
```

## Window Large Lists with react-virtual

This updates an incredibly large list to use react-virtual which can make a `ul` absolute and then we use a custom styled `li` in addition to the list item to provide the items:

```js
// Window large lists with react-virtual
// http://localhost:3000/isolated/exercise/04.js

import * as React from "react";
// 🐨 import the useVirtual hook from react-virtual
import { useVirtual } from "react-virtual";
import { useCombobox } from "../use-combobox";
import { getItems } from "../workerized-filter-cities";
import { useAsync, useForceRerender } from "../utils";

// 💰 I made this for you, you'll need it later:
const getVirtualRowStyles = ({ size, start }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: size,
  transform: `translateY(${start}px)`,
});

function Menu({
  items,
  getMenuProps,
  getItemProps,
  highlightedIndex,
  selectedItem,
  // 🐨 accept listRef, virtualRows, totalHeight
  listRef,
  virtualRows,
  totalHeight,
}) {
  return (
    // 🐨 pass the listRef to the `getMenuProps` prop getter function below:
    // 💰  getMenuProps({ref: listRef})
    <ul {...getMenuProps({ ref: listRef })}>
      {/* 🐨 add a li here with an inline style for the height set to the totalHeight */}
      <li style={{ height: totalHeight }} />
      {/*
        🦉 this is to ensure that the scrollable area of the <ul /> is the
        same height it would be if we were actually rendering everything
      */}
      {/* instead of mapping the "items" we're going to map over the virtualRows */}
      {/* 🐨 swap `items` with `virtualRows` */}
      {/*
        💰 a virtual row is an object with the following properties:
        - index: you can use this to get the `item` via `items[index]`
        - size: set the "height" style to this value
        - start: this is how many pixels from the scrollTop this item should be
      */}
      {virtualRows.map(({ index, size, start }) => {
        const item = items[index];
        return (
          <ListItem
            key={item.id}
            getItemProps={getItemProps}
            item={item}
            index={index}
            isSelected={selectedItem?.id === item.id}
            isHighlighted={highlightedIndex === index}
            // 🐨 pass a style prop, you can get the inline styles from getVirtualRowStyles()
            // make sure to pass an object with the size (the height of the row)
            // and start (where the row starts relative to the scrollTop of its container).
            style={getVirtualRowStyles({ size, start })}
          >
            {item.name}
          </ListItem>
        );
      })}
    </ul>
  );
}

function ListItem({
  getItemProps,
  item,
  index,
  isHighlighted,
  isSelected,
  // 🐨 accept the style prop
  style,
  ...props
}) {
  return (
    <li
      {...getItemProps({
        index,
        item,
        style: {
          backgroundColor: isHighlighted ? "lightgray" : "inherit",
          fontWeight: isSelected ? "bold" : "normal",
          // 🐨 spread the incoming styles onto this inline style object
          ...style,
        },
        ...props,
      })}
    />
  );
}

function App() {
  const forceRerender = useForceRerender();
  const [inputValue, setInputValue] = React.useState("");

  const { data: items, run } = useAsync({ data: [], status: "pending" });
  React.useEffect(() => {
    run(getItems(inputValue));
  }, [inputValue, run]);

  // 🐨 create a listRef with React.useRef
  // which will be used for the parentRef option you pass to useVirtual
  // and should be applied to the <ul /> for our menu. This is how react-virtual
  // knows how to scroll our items as the user scrolls.
  const listRef = React.useRef();

  // 🐨 call useVirtual with the following configuration options:
  // - size (the number of items)
  // - parentRef (the listRef you created above)
  // - estimateSize (a memoized callback function that returns the size for each item)
  //   💰 in our case, every item has the same size, so this will do: React.useCallback(() => 20, [])
  // - overscan (the number of additional rows to render outside the scrollable view)
  //   💰 You can play around with that number, but you probably don't need more than 10.
  // 🐨 you can set the return value of your useVirtual call to `rowVirtualizer`
  const rowVirtualizer = useVirtual({
    size: items.length,
    parentRef: listRef,
    estimateSize: React.useCallback(() => 20, []),
    overscan: 10,
  });

  const {
    selectedItem,
    highlightedIndex,
    getComboboxProps,
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    selectItem,
  } = useCombobox({
    items,
    inputValue,
    onInputValueChange: ({ inputValue: newValue }) => setInputValue(newValue),
    onSelectedItemChange: ({ selectedItem }) =>
      alert(
        selectedItem ? `You selected ${selectedItem.name}` : "Selection Cleared"
      ),
    itemToString: (item) => (item ? item.name : ""),
    // we want to override Downshift's scrollIntoView functionality because
    // react-virtual will handle scrolling for us:
    // 🐨 set scrollIntoView to a "no-op" function
    // 💰 scrollIntoView: () => {},
    scrollIntoView: () => {},
    // 🐨 when the highlightedIndex changes, then tell react-virtual to scroll
    // to that index.
    // 💰 onHighlightedIndexChange: ({highlightedIndex}) => highlightedIndex !== -1 && rowVirtualizer.scrollToIndex(highlightedIndex),
    onHighlightedIndexChange: ({ highlightedIndex }) =>
      highlightedIndex !== -1 && rowVirtualizer.scrollToIndex(highlightedIndex),
  });

  return (
    <div className="city-app">
      <button onClick={forceRerender}>force rerender</button>
      <div>
        <label {...getLabelProps()}>Find a city</label>
        <div {...getComboboxProps()}>
          <input {...getInputProps({ type: "text" })} />
          <button onClick={() => selectItem(null)} aria-label="toggle menu">
            &#10005;
          </button>
        </div>
        <Menu
          items={items}
          getMenuProps={getMenuProps}
          getItemProps={getItemProps}
          highlightedIndex={highlightedIndex}
          selectedItem={selectedItem}
          // 🐨 pass the following props:
          listRef={listRef}
          virtualRows={rowVirtualizer.virtualItems}
          totalHeight={rowVirtualizer.totalSize}
        />
      </div>
    </div>
  );
}

export default App;
```

## Optimize Context Value

In this challenge, we are memoizing the value we are passing as the value to the Context Provider.

> "The way that context works is that whenever the provided value changes from one render to another, it triggers a re-render of all the consuming components (which will re-render whether or not they’re memoized)."

A [post from Kent](https://github.com/kentcdodds/kentcdodds.com/blob/319db97260078ea4c263e75166f05e2cea21ccd1/content/blog/how-to-optimize-your-context-value/index.md) highlights when it is important to memoize the context value:

1. Your context value changes frequently
2. Your context has many consumers
3. You are bothering to use React.memo (because things are legit slow)
4. You've actually measured things and you know it's slow and needs to be optimized

In the example given, we needed to ensure the provider was memoized so that the lower children were helped when `App` was force re-rendered:

```js
// Optimize context value
// http://localhost:3000/isolated/exercise/05.js

import * as React from "react";
import {
  useForceRerender,
  useDebouncedState,
  AppGrid,
  updateGridState,
  updateGridCellState,
} from "../utils";

const AppStateContext = React.createContext();

const initialGrid = Array.from({ length: 100 }, () =>
  Array.from({ length: 100 }, () => Math.random() * 100)
);

function appReducer(state, action) {
  switch (action.type) {
    case "TYPED_IN_DOG_INPUT": {
      return { ...state, dogName: action.dogName };
    }
    case "UPDATE_GRID_CELL": {
      return { ...state, grid: updateGridCellState(state.grid, action) };
    }
    case "UPDATE_GRID": {
      return { ...state, grid: updateGridState(state.grid) };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = React.useReducer(appReducer, {
    dogName: "",
    grid: initialGrid,
  });
  // 🐨 memoize this value with React.useMemo
  const value = React.useMemo(() => [state, dispatch], [state, dispatch]);
  // const value = [state, dispatch]
  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

function useAppState() {
  const context = React.useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within the AppProvider");
  }
  return context;
}

function Grid() {
  const [, dispatch] = useAppState();
  const [rows, setRows] = useDebouncedState(50);
  const [columns, setColumns] = useDebouncedState(50);
  const updateGridData = () => dispatch({ type: "UPDATE_GRID" });
  return (
    <AppGrid
      onUpdateGrid={updateGridData}
      rows={rows}
      handleRowsChange={setRows}
      columns={columns}
      handleColumnsChange={setColumns}
      Cell={Cell}
    />
  );
}
Grid = React.memo(Grid);

function Cell({ row, column }) {
  const [state, dispatch] = useAppState();
  const cell = state.grid[row][column];
  const handleClick = () => dispatch({ type: "UPDATE_GRID_CELL", row, column });
  return (
    <button
      className="cell"
      onClick={handleClick}
      style={{
        color: cell > 50 ? "white" : "black",
        backgroundColor: `rgba(0, 0, 0, ${cell / 100})`,
      }}
    >
      {Math.floor(cell)}
    </button>
  );
}
Cell = React.memo(Cell);

function DogNameInput() {
  const [state, dispatch] = useAppState();
  const { dogName } = state;

  function handleChange(event) {
    const newDogName = event.target.value;
    dispatch({ type: "TYPED_IN_DOG_INPUT", dogName: newDogName });
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="dogName">Dog Name</label>
      <input
        value={dogName}
        onChange={handleChange}
        id="dogName"
        placeholder="Toto"
      />
      {dogName ? (
        <div>
          <strong>{dogName}</strong>, I've a feeling we're not in Kansas anymore
        </div>
      ) : null}
    </form>
  );
}

function App() {
  const forceRerender = useForceRerender();
  return (
    <div className="grid-app">
      <button onClick={forceRerender}>force rerender</button>
      <AppProvider>
        <div>
          <DogNameInput />
          <Grid />
        </div>
      </AppProvider>
    </div>
  );
}

export default App;
```

The results can be seen in these screenshots:

![Force rerender without memoization](/force-rerender-without-memoization.png)

![Force rerender with memoization](/force-rerender-with-memoization.png)

### Separate the contexts

Another issue we run into is that when we click on a grid item, our state is updating. Because the state "did update", we are getting a new array in the memoised `AppProvider` and therefore this change is re-rendering everything that consumes the state (even though the `Grid` only needs to consume the dispatch!)

```js
// Optimize context value
// http://localhost:3000/isolated/exercise/05.js

import * as React from "react";
import {
  useForceRerender,
  useDebouncedState,
  AppGrid,
  updateGridState,
  updateGridCellState,
} from "../utils";

const AppStateContext = React.createContext();
const AppDispatchContext = React.createContext();

const initialGrid = Array.from({ length: 100 }, () =>
  Array.from({ length: 100 }, () => Math.random() * 100)
);

function appReducer(state, action) {
  switch (action.type) {
    case "TYPED_IN_DOG_INPUT": {
      return { ...state, dogName: action.dogName };
    }
    case "UPDATE_GRID_CELL": {
      return { ...state, grid: updateGridCellState(state.grid, action) };
    }
    case "UPDATE_GRID": {
      return { ...state, grid: updateGridState(state.grid) };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = React.useReducer(appReducer, {
    dogName: "",
    grid: initialGrid,
  });

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

function useAppState() {
  const context = React.useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within the AppProvider");
  }
  return context;
}

function useAppDispatch() {
  const context = React.useContext(AppDispatchContext);
  if (!context) {
    throw new Error("useAppDispatch must be used within the AppProvider");
  }
  return context;
}

function Grid() {
  const dispatch = useAppDispatch();
  const [rows, setRows] = useDebouncedState(50);
  const [columns, setColumns] = useDebouncedState(50);
  const updateGridData = () => dispatch({ type: "UPDATE_GRID" });
  return (
    <AppGrid
      onUpdateGrid={updateGridData}
      rows={rows}
      handleRowsChange={setRows}
      columns={columns}
      handleColumnsChange={setColumns}
      Cell={Cell}
    />
  );
}
Grid = React.memo(Grid);

function Cell({ row, column }) {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const cell = state.grid[row][column];
  const handleClick = () => dispatch({ type: "UPDATE_GRID_CELL", row, column });
  return (
    <button
      className="cell"
      onClick={handleClick}
      style={{
        color: cell > 50 ? "white" : "black",
        backgroundColor: `rgba(0, 0, 0, ${cell / 100})`,
      }}
    >
      {Math.floor(cell)}
    </button>
  );
}
Cell = React.memo(Cell);

function DogNameInput() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const { dogName } = state;

  function handleChange(event) {
    const newDogName = event.target.value;
    dispatch({ type: "TYPED_IN_DOG_INPUT", dogName: newDogName });
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="dogName">Dog Name</label>
      <input
        value={dogName}
        onChange={handleChange}
        id="dogName"
        placeholder="Toto"
      />
      {dogName ? (
        <div>
          <strong>{dogName}</strong>, I've a feeling we're not in Kansas anymore
        </div>
      ) : null}
    </form>
  );
}

function App() {
  const forceRerender = useForceRerender();
  return (
    <div className="grid-app">
      <button onClick={forceRerender}>force rerender</button>
      <AppProvider>
        <div>
          <DogNameInput />
          <Grid />
        </div>
      </AppProvider>
    </div>
  );
}

export default App;
```

> Note: at the end of this challenge on production, we'll see that we didn't make _huge changes_ to the timing.

## Fix Perf Deatch by a Thousand Cuts

In this example, we had to fix an input that was operating horrifically slow. The reason we come to find is related to a requirement of state colocation with the component.

It is important NOT to just add everything to the state context willy nilly. There are a lot of Performance implications with this.

```js
// Fix "perf death by a thousand cuts"
// http://localhost:3000/isolated/exercise/06.js

import * as React from "react";
import {
  useForceRerender,
  useDebouncedState,
  AppGrid,
  updateGridState,
  updateGridCellState,
} from "../utils";

const AppStateContext = React.createContext();
AppStateContext.displayName = "AppStateContext";
const AppDispatchContext = React.createContext();
AppDispatchContext.displayName = "AppDispatchContext";

const initialGrid = Array.from({ length: 100 }, () =>
  Array.from({ length: 100 }, () => Math.random() * 100)
);

function appReducer(state, action) {
  switch (action.type) {
    // we're no longer managing the dogName state in our reducer
    // 💣 remove this case
    case "TYPED_IN_DOG_INPUT": {
      return { ...state, dogName: action.dogName };
    }
    case "UPDATE_GRID_CELL": {
      return { ...state, grid: updateGridCellState(state.grid, action) };
    }
    case "UPDATE_GRID": {
      return { ...state, grid: updateGridState(state.grid) };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = React.useReducer(appReducer, {
    grid: initialGrid,
  });
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

function useAppState() {
  const context = React.useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within the AppProvider");
  }
  return context;
}

function useAppDispatch() {
  const context = React.useContext(AppDispatchContext);
  if (!context) {
    throw new Error("useAppDispatch must be used within the AppProvider");
  }
  return context;
}

function Grid() {
  const dispatch = useAppDispatch();
  const [rows, setRows] = useDebouncedState(50);
  const [columns, setColumns] = useDebouncedState(50);
  const updateGridData = () => dispatch({ type: "UPDATE_GRID" });
  return (
    <AppGrid
      onUpdateGrid={updateGridData}
      rows={rows}
      handleRowsChange={setRows}
      columns={columns}
      handleColumnsChange={setColumns}
      Cell={Cell}
    />
  );
}
Grid = React.memo(Grid);

function Cell({ row, column }) {
  const state = useAppState();
  const cell = state.grid[row][column];
  const dispatch = useAppDispatch();
  const handleClick = () => dispatch({ type: "UPDATE_GRID_CELL", row, column });
  return (
    <button
      className="cell"
      onClick={handleClick}
      style={{
        color: cell > 50 ? "white" : "black",
        backgroundColor: `rgba(0, 0, 0, ${cell / 100})`,
      }}
    >
      {Math.floor(cell)}
    </button>
  );
}
Cell = React.memo(Cell);

function DogNameInput() {
  // 🐨 replace the useAppState and useAppDispatch with a normal useState here
  // to manage the dogName locally within this component
  const [dogName, setDogName] = React.useState("");

  function handleChange(event) {
    const newDogName = event.target.value;
    setDogName(newDogName);
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="dogName">Dog Name</label>
      <input
        value={dogName}
        onChange={handleChange}
        id="dogName"
        placeholder="Toto"
      />
      {dogName ? (
        <div>
          <strong>{dogName}</strong>, I've a feeling we're not in Kansas anymore
        </div>
      ) : null}
    </form>
  );
}
function App() {
  const forceRerender = useForceRerender();
  return (
    <div className="grid-app">
      <button onClick={forceRerender}>force rerender</button>
      <AppProvider>
        <div>
          <DogNameInput />
          <Grid />
        </div>
      </AppProvider>
    </div>
  );
}

export default App;
```

### Separate Contexts

This solution is about going for a different approach. The approach here is to handle when things are global. We can separate context out for different domains.

> It is really important to also measure after to see if you've made serious Performance improvements and not just added complexity.

```js
import * as React from "react";
import {
  useForceRerender,
  useDebouncedState,
  AppGrid,
  updateGridState,
  updateGridCellState,
} from "../utils";

const AppStateContext = React.createContext();
const AppDispatchContext = React.createContext();
const DogContext = React.createContext();

const initialGrid = Array.from({ length: 100 }, () =>
  Array.from({ length: 100 }, () => Math.random() * 100)
);

function appReducer(state, action) {
  switch (action.type) {
    case "UPDATE_GRID_CELL": {
      return { ...state, grid: updateGridCellState(state.grid, action) };
    }
    case "UPDATE_GRID": {
      return { ...state, grid: updateGridState(state.grid) };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = React.useReducer(appReducer, {
    grid: initialGrid,
  });
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

function useAppState() {
  const context = React.useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within the AppProvider");
  }
  return context;
}

function useAppDispatch() {
  const context = React.useContext(AppDispatchContext);
  if (!context) {
    throw new Error("useAppDispatch must be used within the AppProvider");
  }
  return context;
}

function dogReducer(state, action) {
  switch (action.type) {
    case "TYPED_IN_DOG_INPUT": {
      return { ...state, dogName: action.dogName };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function DogProvider(props) {
  const [state, dispatch] = React.useReducer(dogReducer, {
    dogName: "",
  });

  const value = [state, dispatch];

  return <DogProvider value={value} {...props} />;
}

function useDogContext() {
  const context = React.useContext(DogContext);
  if (!context) {
    throw new Error("useAppDispatch must be used within the AppProvider");
  }
  return context;
}

function Grid() {
  const dispatch = useAppDispatch();
  const [rows, setRows] = useDebouncedState(50);
  const [columns, setColumns] = useDebouncedState(50);
  const updateGridData = () => dispatch({ type: "UPDATE_GRID" });
  return (
    <AppGrid
      onUpdateGrid={updateGridData}
      rows={rows}
      handleRowsChange={setRows}
      columns={columns}
      handleColumnsChange={setColumns}
      Cell={Cell}
    />
  );
}
Grid = React.memo(Grid);

function Cell({ row, column }) {
  const state = useAppState();
  const cell = state.grid[row][column];
  const dispatch = useAppDispatch();
  const handleClick = () => dispatch({ type: "UPDATE_GRID_CELL", row, column });
  return (
    <button
      className="cell"
      onClick={handleClick}
      style={{
        color: cell > 50 ? "white" : "black",
        backgroundColor: `rgba(0, 0, 0, ${cell / 100})`,
      }}
    >
      {Math.floor(cell)}
    </button>
  );
}
Cell = React.memo(Cell);

function DogNameInput() {
  // 🐨 replace the useAppState and useAppDispatch with a normal useState here
  // to manage the dogName locally within this component
  const [state, dispatch] = useDogContext();
  const { dogName } = state;

  function handleChange(event) {
    const newDogName = event.target.value;
    // 🐨 change this to call your state setter that you get from useState
    dispatch({ type: "TYPED_IN_DOG_INPUT", dogName: newDogName });
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="dogName">Dog Name</label>
      <input
        value={dogName}
        onChange={handleChange}
        id="dogName"
        placeholder="Toto"
      />
      {dogName ? (
        <div>
          <strong>{dogName}</strong>, I've a feeling we're not in Kansas anymore
        </div>
      ) : null}
    </form>
  );
}
function App() {
  const forceRerender = useForceRerender();
  return (
    <div className="grid-app">
      <button onClick={forceRerender}>force rerender</button>
      <AppProvider>
        <div>
          <DogProvider>
            <DogNameInput />
          </DogProvider>
          <Grid />
        </div>
      </AppProvider>
    </div>
  );
}

export default App;
```

> Note: Because the `AppProvider` not longer impacts anything other than the grid, we can also change the Providers to focus more where is matters:

```js
function App() {
  const forceRerender = useForceRerender();
  return (
    <div className="grid-app">
      <button onClick={forceRerender}>force rerender</button>
      <div>
        <DogProvider>
          <DogNameInput />
        </DogProvider>
        <AppProvider>
          <Grid />
        </AppProvider>
      </div>
    </div>
  );
}
```

### Consuming Components

If we check our profiling after the changes that we made above, we will see that when we click a button, there are still all these smaller re-renderings that are happening.

In this particular scenario, it is the `const cell = state.grid[row][column]` line that we want to take out from the cell and calculate prior.

```js
// This is like a "man-in-middle" that cares about state and can take that,
// pass it down and then the rendering of the CellImpl can take advantage of memoisation
function Cell({ row, column }) {
  const state = useAppState();
  const cell = state.grid[row][column];
  return <CellImpl cell={cell} row={row} column={column} />;
}
Cell = React.memo(Cell);

function CellImpl({ cell, row, column }) {
  const dispatch = useAppDispatch();
  const handleClick = () => dispatch({ type: "UPDATE_GRID_CELL", row, column });
  return (
    <button
      className="cell"
      onClick={handleClick}
      style={{
        color: cell > 50 ? "white" : "black",
        backgroundColor: `rgba(0, 0, 0, ${cell / 100})`,
      }}
    >
      {Math.floor(cell)}
    </button>
  );
}
CellImpl = React.memo(CellImpl);
```

### Slice of App State

"I'm not super jazzed about making an intermediary component". Instead, we can make a higher-order component to take care of it for us instead.

```js
function withStateSlice(Comp, slice) {
  const MemoComp = React.memo(Comp);
  function Wrapper(props, ref) {
    const state = useAppState();
    return <MemoComp ref={ref} state={slice(state, props)} {...props} />;
  }
  Wrapper.displayName = `withStateSlice${Comp.dispayName || Comp.name}`;
  return React.memo(React.forwardRef(Wrapper));
}

function Cell({ state: cell, row, column }) {
  const dispatch = useAppDispatch();
  const handleClick = () => dispatch({ type: "UPDATE_GRID_CELL", row, column });
  return (
    <button
      className="cell"
      onClick={handleClick}
      style={{
        color: cell > 50 ? "white" : "black",
        backgroundColor: `rgba(0, 0, 0, ${cell / 100})`,
      }}
    >
      {Math.floor(cell)}
    </button>
  );
}
Cell = withStateSlice(
  Cell,
  (state, { row, column }) => state.grid[row][column]
);
```

### Use Recoil

For the specific problem we have with the massive grid (if we want to use something like that), we can use Recoil to resolve the problems that we run into.

It is worth noting that there is a complexity cost for using Recoil, but in our specific usecase, it is something that Recoil was built to solve:

```js
// Starting point for the Recoil Extra Credit
// 💯 use recoil (exercise)
// http://localhost:3000/isolated/exercise/06.extra-4.js

import * as React from "react";
import {
  useForceRerender,
  useDebouncedState,
  AppGrid,
  updateGridState,
  updateGridCellState,
} from "../utils";
// 🐨 you're gonna need these:
import {
  RecoilRoot,
  useRecoilState,
  useRecoilCallback,
  atomFamily,
} from "recoil";

const AppStateContext = React.createContext();

const initialGrid = Array.from({ length: 100 }, () =>
  Array.from({ length: 100 }, () => Math.random() * 100)
);

// 🐨 create an atomFamily called `cellAtoms` here where the
// default callback function accepts an object with the
// `row` and `column` and returns the value from the initialGrid
// 💰 initialGrid[row][column]
const cellAtoms = atomFamily({
  key: "cells",
  default: () => ({ row, column }) => initialGrid[row][column],
});

// 💰 I'm going to give this hook to you as it's mostly here for our contrived
// example purposes. Just comment this in when you're ready to use it.
// Here's how it's used:
// const updateGrid = useUpdateGrid()
// then later: updateGrid({rows, columns})
function useUpdateGrid() {
  return useRecoilCallback(({ set }) => ({ rows, columns }) => {
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        if (Math.random() > 0.7) {
          set(cellAtoms({ row, column }), Math.random() * 100);
        }
      }
    }
  });
}

function appReducer(state, action) {
  switch (action.type) {
    case "TYPED_IN_DOG_INPUT": {
      return { ...state, dogName: action.dogName };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = React.useReducer(appReducer, {
    dogName: "",
  });
  // 🦉 notice that we don't even need to bother memoizing this value
  const value = [state, dispatch];
  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

function useAppState() {
  const context = React.useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within the AppProvider");
  }
  return context;
}

function Grid() {
  // 🐨 we're no longer storing the grid in our app state, so instead you
  // want to get the updateGrid function from useUpdateGrid
  const updateGrid = useUpdateGrid();
  const [rows, setRows] = useDebouncedState(50);
  const [columns, setColumns] = useDebouncedState(50);
  const updateGridData = () => updateGrid({ rows, columns });
  return (
    <AppGrid
      onUpdateGrid={updateGridData}
      rows={rows}
      handleRowsChange={setRows}
      columns={columns}
      handleColumnsChange={setColumns}
      Cell={Cell}
    />
  );
}

function Cell({ row, column }) {
  const [cell, setCell] = useRecoilState(cellAtoms({ row, column }));
  const handleClick = () => setCell(Math.random() * 100);

  return (
    <button
      className="cell"
      onClick={handleClick}
      style={{
        color: cell > 50 ? "white" : "black",
        backgroundColor: `rgba(0, 0, 0, ${cell / 100})`,
      }}
    >
      {Math.floor(cell)}
    </button>
  );
}

function DogNameInput() {
  const [state, dispatch] = useAppState();
  const { dogName } = state;

  function handleChange(event) {
    const newDogName = event.target.value;
    dispatch({ type: "TYPED_IN_DOG_INPUT", dogName: newDogName });
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="dogName">Dog Name</label>
      <input
        value={dogName}
        onChange={handleChange}
        id="dogName"
        placeholder="Toto"
      />
      {dogName ? (
        <div>
          <strong>{dogName}</strong>, I've a feeling we're not in Kansas anymore
        </div>
      ) : null}
    </form>
  );
}
function App() {
  const forceRerender = useForceRerender();
  return (
    <div className="grid-app">
      <button onClick={forceRerender}>force rerender</button>
      <RecoilRoot>
        <AppProvider>
          <div>
            <DogNameInput />
            <Grid />
          </div>
        </AppProvider>
      </RecoilRoot>
    </div>
  );
}

export default App;
```

Read more on [Recoil](https://recoiljs.org/docs/introduction/motivation) from their docs.

## Production Performance Monitoring

A great way to prevent changes from regressions, we can use production performance monitoring.

> Note: There is a small performance cost involved with profiling. Facebook A/B serves a version with profiling involved.

This exercise looks at using the [React Profiler API](https://reactjs.org/docs/profiler.html).

The usage and callback:

```js
<App>
  <Profiler id="Navigation" onRender={onRenderCallback}>
    <Navigation {...props} />
  </Profiler>
  <Main {...props} />
</App>;

// callback
function onRenderCallback(
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // the Set of interactions belonging to this update
) {
  // Aggregate or log render timings...
}
```

> "It’s important to note that unless you build your app using react-dom/profiling and scheduler/tracing-profiling this component won’t do anything."

Kent also has a [blog post](https://kentcdodds.com/blog/react-production-performance-monitoring/) on the profiling.

The solution to record one:

```js
// Production performance monitoring
// http://localhost:3000/isolated/exercise/07.js

import * as React from "react";
// 🐨 you're going to need the reportProfile function
// 💰 here, let me help you with that..
import reportProfile from "../report-profile";

function Counter() {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount((c) => c + 1);
  return <button onClick={increment}>{count}</button>;
}

function App() {
  return (
    <div>
      {/*
      🐨 Wrap this div in a React.Profiler component
      give it the ID of "counter" and pass reportProfile
      to the onRender prop.
      */}
      <React.Profiler id="counter" onRender={reportProfile}>
        <div>
          Profiled counter
          <Counter />
        </div>
      </React.Profiler>
      <div>
        Unprofiled counter
        <Counter />
      </div>
    </div>
  );
}

export default App;
```

### Tracing API

So we don't know "why" the user caused the rerendering so we can use an `unstable_trace` to check.

```js
import * as React from "react";
import { unstable_trace as trace } from "scheduler/tracing";
import reportProfile from "../report-profile";

function Counter() {
  const [count, setCount] = React.useState(0);
  // We can wrap the setCount callback to use the trace API
  const increment = trace("click", performance.now(), () =>
    setCount((c) => c + 1)
  );
  return <button onClick={increment}>{count}</button>;
}

function App() {
  return (
    <div>
      {/*
      🐨 Wrap this div in a React.Profiler component
      give it the ID of "counter" and pass reportProfile
      to the onRender prop.
      */}
      <React.Profiler id="counter" onRender={reportProfile}>
        <div>
          Profiled counter
          <Counter />
        </div>
      </React.Profiler>
      <div>
        Unprofiled counter
        <Counter />
      </div>
    </div>
  );
}

export default App;
```

That is it! Now when the user clicks, we can get more information thanks to the trace that comes under the `interactions` value.

With the `trace` API, we can also start to use the `user interactions` section of the React profile!
