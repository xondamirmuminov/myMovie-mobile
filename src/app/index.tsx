import React from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { Button, NativeBaseProvider } from 'native-base';
import { theme } from './theme';
import ApplicationNavigator from './navigators/Application';

function App(): JSX.Element {
  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ApplicationNavigator />
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}

export default App; 