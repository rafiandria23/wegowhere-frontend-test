import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Button,
  ButtonIcon,
  AddIcon,
  Alert,
  AlertIcon,
  AlertText,
  InfoIcon,
} from '@gluestack-ui/themed';

import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import { setError, setInfo } from '../redux/payment.slice';
import PaymentCardListScreen from '../screens/PaymentCardList.screen';
import PaymentCardAddScreen from '../screens/PaymentCardAdd.screen';

const Stack = createNativeStackNavigator();

export const StackNavigation: FC = () => {
  const dispatch = useAppDispatch();
  const { error, info } = useAppSelector((state) => state.payment);
  const navigation = useNavigation();

  useEffect(() => {
    if (error !== null) {
      const alertTimer = setTimeout(() => dispatch(setError(null)), 5000);

      return () => {
        clearTimeout(alertTimer);
      };
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (info !== null) {
      const alertTimer = setTimeout(() => dispatch(setInfo(null)), 5000);

      return () => {
        clearTimeout(alertTimer);
      };
    }
  }, [info, dispatch]);

  return (
    <>
      <Stack.Navigator
        initialRouteName='PaymentCardListScreen'
        screenOptions={{
          headerBackTitleVisible: false,
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
                <ButtonIcon size='xl' as={AddIcon} />
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

      {error !== null && (
        <Alert action='error' variant='solid' mb='$6'>
          <AlertIcon as={InfoIcon} mr='$3' />
          <AlertText>{error.toString()}</AlertText>
        </Alert>
      )}

      {info !== null && (
        <Alert action='success' variant='solid' mb='$6'>
          <AlertIcon as={InfoIcon} mr='$3' />
          <AlertText>{info}</AlertText>
        </Alert>
      )}
    </>
  );
};

export default StackNavigation;
