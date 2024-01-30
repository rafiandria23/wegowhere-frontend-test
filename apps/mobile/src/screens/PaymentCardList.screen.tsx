import React, { FC, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import PaymentCard from '../components/PaymentCard.component';

const PaymentCardListScreen: FC = () => {
  const dispatch = useAppDispatch();
  const { cards } = useAppSelector((state) => state.payment);
  const navigation = useNavigation();

  const handleNavigateAddCard = useCallback(() => {
    navigation.navigate('/payment/cards/add' as never);
  }, [navigation]);

  return (
    <SafeAreaView>
      {cards.length ? (
        <>
          {cards.map((card) => (
            <PaymentCard key={card._id} />
          ))}
        </>
      ) : (
        <>
          <Text>No Cards Found</Text>
          <Text>We recommend adding a card for easy payment</Text>
          <Button mode='text' onPress={handleNavigateAddCard}>
            Add New Card
          </Button>
        </>
      )}
    </SafeAreaView>
  );
};

export default PaymentCardListScreen;
