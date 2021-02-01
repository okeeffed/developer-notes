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

import * as React from 'react';
// 💣 remove this import

// 🐨 use React.lazy to create a Globe component which using a dynamic import
// to get the Globe component from the '../globe' module.
const Globe = React.lazy(() => import('../globe'));

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
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        padding: '2rem',
      }}
    >
      <label style={{ marginBottom: '1rem' }}>
        <input
          type="checkbox"
          checked={showGlobe}
          onChange={e => setShowGlobe(e.target.checked)}
        />
        {' show globe'}
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

import * as React from 'react';
// 💣 remove this import

const loadGlobe = () => import('../globe');
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
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        padding: '2rem',
      }}
    >
      <label style={{ marginBottom: '1rem' }}>
        <input
          type="checkbox"
          checked={showGlobe}
          onChange={e => setShowGlobe(e.target.checked)}
          onMouseEnter={loadGlobe}
          onFocus={loadGlobe}
        />
        {' show globe'}
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
import(/* webpackPrefetch: true */ './some-module.js');
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

import * as React from 'react';
import { useCombobox } from '../use-combobox';
import { getItems } from '../filter-cities';
import { useForceRerender } from '../utils';

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
          fontWeight: isSelected ? 'bold' : 'normal',
          backgroundColor: isHighlighted ? 'lightgray' : 'inherit',
        },
        ...props,
      })}
    />
  );
}

function App() {
  const forceRerender = useForceRerender();
  const [inputValue, setInputValue] = React.useState('');

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
        selectedItem
          ? `You selected ${selectedItem.name}`
          : 'Selection Cleared',
      ),
    itemToString: item => (item ? item.name : ''),
  });

  return (
    <div className="city-app">
      <button onClick={forceRerender}>force rerender</button>
      <div>
        <label {...getLabelProps()}>Find a city</label>
        <div {...getComboboxProps()}>
          <input {...getInputProps({ type: 'text' })} />
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

import * as React from 'react';
import { useCombobox } from '../use-combobox';
import { getItems } from '../workerized-filter-cities';
import { useAsync, useForceRerender } from '../utils';

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
          fontWeight: isSelected ? 'bold' : 'normal',
          backgroundColor: isHighlighted ? 'lightgray' : 'inherit',
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
  const [inputValue, setInputValue] = React.useState('');

  const { data: allItems, run } = useAsync({ data: [], status: 'pending' });
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
        selectedItem
          ? `You selected ${selectedItem.name}`
          : 'Selection Cleared',
      ),
    itemToString: item => (item ? item.name : ''),
  });

  return (
    <div className="city-app">
      <button onClick={forceRerender}>force rerender</button>
      <div>
        <label {...getLabelProps()}>Find a city</label>
        <div {...getComboboxProps()}>
          <input {...getInputProps({ type: 'text' })} />
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

import * as React from 'react';
import { useCombobox } from '../use-combobox';
import { getItems } from '../workerized-filter-cities';
import { useAsync, useForceRerender } from '../utils';

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
          fontWeight: isSelected ? 'bold' : 'normal',
          backgroundColor: isHighlighted ? 'lightgray' : 'inherit',
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
  const [inputValue, setInputValue] = React.useState('');

  const { data: allItems, run } = useAsync({ data: [], status: 'pending' });
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
        selectedItem
          ? `You selected ${selectedItem.name}`
          : 'Selection Cleared',
      ),
    itemToString: item => (item ? item.name : ''),
  });

  return (
    <div className="city-app">
      <button onClick={forceRerender}>force rerender</button>
      <div>
        <label {...getLabelProps()}>Find a city</label>
        <div {...getComboboxProps()}>
          <input {...getInputProps({ type: 'text' })} />
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

import * as React from 'react';
import { useCombobox } from '../use-combobox';
import { getItems } from '../workerized-filter-cities';
import { useAsync, useForceRerender } from '../utils';

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
          fontWeight: isSelected ? 'bold' : 'normal',
          backgroundColor: isHighlighted ? 'lightgray' : 'inherit',
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
  const [inputValue, setInputValue] = React.useState('');

  const { data: allItems, run } = useAsync({ data: [], status: 'pending' });
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
        selectedItem
          ? `You selected ${selectedItem.name}`
          : 'Selection Cleared',
      ),
    itemToString: item => (item ? item.name : ''),
  });

  return (
    <div className="city-app">
      <button onClick={forceRerender}>force rerender</button>
      <div>
        <label {...getLabelProps()}>Find a city</label>
        <div {...getComboboxProps()}>
          <input {...getInputProps({ type: 'text' })} />
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

import * as React from 'react';
// 🐨 import the useVirtual hook from react-virtual
import { useVirtual } from 'react-virtual';
import { useCombobox } from '../use-combobox';
import { getItems } from '../workerized-filter-cities';
import { useAsync, useForceRerender } from '../utils';

// 💰 I made this for you, you'll need it later:
const getVirtualRowStyles = ({ size, start }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
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
          backgroundColor: isHighlighted ? 'lightgray' : 'inherit',
          fontWeight: isSelected ? 'bold' : 'normal',
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
  const [inputValue, setInputValue] = React.useState('');

  const { data: items, run } = useAsync({ data: [], status: 'pending' });
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
        selectedItem
          ? `You selected ${selectedItem.name}`
          : 'Selection Cleared',
      ),
    itemToString: item => (item ? item.name : ''),
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
          <input {...getInputProps({ type: 'text' })} />
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
