import React, { FC } from 'react';
import { useColorScheme } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

import store from '../redux';
import StackNavigation from './StackNavigation';

export const App: FC = () => {
  const colorScheme = useColorScheme();

  return (
    <ReduxProvider store={store}>
      <GluestackUIProvider config={config}>
        <NavigationContainer
          theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <StackNavigation />
        </NavigationContainer>
      </GluestackUIProvider>
    </ReduxProvider>
  );
};

export default App;
