---
name: Redux Persist
menu: Redux 
---
# Redux Persist

## React Native implementation

```bash
yarn add redux-persist redux-persist-sensitive-storage
```

```javascript
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/es/integration/react';
// if you need to persist
import createSensitiveStorage from 'redux-persist-sensitive-storage';

Amplify.configure(config);

const sagaMiddleware = createSagaMiddleware();
const enhancers = [];
const reducers = combineReducers({
  copy: CopyReducer,
  auth: AuthReducer,
  navigation: NavReducer
});
enhancers.push(applyMiddleware(logger, reduxNavMiddleware, sagaMiddleware));

// persist updates
const persistConfig = {
  key: 'primary',
  storage,
  // should put FirebaseReducer back to whitelist once index.jon is ready
  whitelist: __DEV__
    ? ['ProfileReducer', 'OffersReducer', 'StoresReducer', 'LoyaltyCardReducer']
    : [
        'ProfileReducer',
        'OffersReducer',
        'StoresReducer',
        'LoyaltyCardReducer',
        'FirebaseReducer'
      ]
};
const configuredReducers = persistReducer(persistConfig, reducers);
const store = createStore(configuredReducers, composeEnhancers(...enhancers));

// if you need sensitive storage
const persistor = persistStore(store, createSensitiveStorage(), () =>
  console.info('Persist configured')
);
// else
const persistor = persistStore(store);

// ...

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ReduxNavigation />
        </PersistGate>
      </Provider>
    );
  }
}
```
