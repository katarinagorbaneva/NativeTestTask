import React, { ReactElement } from 'react';

import { NativeBaseProvider, extendTheme } from 'native-base';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import store, { persistor } from './redux/store';

import NavigationScreen from './screens/NavigationScreen';

const App = (): ReactElement => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <NavigationScreen />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
