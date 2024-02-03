import React, { FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

import store from '../redux';
import StackNavigation from './StackNavigation';

export const App: FC = () => {
  return (
    <ReduxProvider store={store}>
      <GluestackUIProvider config={config}>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </GluestackUIProvider>
    </ReduxProvider>
  );
};

export default App;
