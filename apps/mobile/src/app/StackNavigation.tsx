import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, ButtonIcon, AddIcon } from '@gluestack-ui/themed';
import PaymentCardListScreen from '../screens/PaymentCardList.screen';
import PaymentCardAddScreen from '../screens/PaymentCardAdd.screen';

const Stack = createNativeStackNavigator();

export const StackNavigation: FC = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName='PaymentCardListScreen'
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: 'black',
      }}
    >
      <Stack.Screen
        name='PaymentCardListScreen'
        options={{
          title: 'Cards',
          headerRight: () => (
            <Button
              variant='link'
              onPress={() =>
                navigation.navigate('PaymentCardAddScreen' as never)
              }
            >
              <ButtonIcon size='xl' color='black' as={AddIcon} />
            </Button>
          ),
        }}
        component={PaymentCardListScreen}
      />

      <Stack.Screen
        name='PaymentCardAddScreen'
        options={{
          title: '',
        }}
        component={PaymentCardAddScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
