import React from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import { theme } from './theme';
import ApplicationNavigator from './navigators/Application';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Loading from './components/Loading';

const queryClient = new QueryClient()

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <NativeBaseProvider theme={theme}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
              <ApplicationNavigator />
            </SafeAreaProvider>
            <Loading />
          </NativeBaseProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App; 