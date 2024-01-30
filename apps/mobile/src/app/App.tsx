import React, { FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import store from '../redux';
import HomeScreen from '../screens/Home.screen';
import PaymentCardListScreen from '../screens/PaymentCardList.screen';
import PaymentCardAddScreen from '../screens/PaymentCardAdd.screen';

const Stack = createNativeStackNavigator();

export const App: FC = () => {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <PaperProvider>
          <Stack.Navigator>
            <Stack.Screen
              navigationKey='/'
              name='Home'
              component={HomeScreen}
              options={{
                title: 'Welcome!',
              }}
            />

            <Stack.Screen
              navigationKey='/payment/cards'
              name='Payment Cards'
              options={{
                title: 'Cards',
              }}
              component={PaymentCardListScreen}
            />

            <Stack.Screen
              navigationKey='/payments/cards/add'
              name='Add a Payment Card'
              options={{
                title: 'Add a Card',
              }}
              component={PaymentCardAddScreen}
            />
          </Stack.Navigator>
        </PaperProvider>
      </NavigationContainer>
    </ReduxProvider>
  );
};

export default App;
