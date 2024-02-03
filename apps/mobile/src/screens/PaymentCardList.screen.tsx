import React, { FC, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  RefreshControl,
  VStack,
  Text,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';

import { fetchCardsAsync } from '../redux/payment.slice';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import PaymentCard from '../components/PaymentCard.component';

const PaymentCardListScreen: FC = () => {
  const dispatch = useAppDispatch();
  const { loading, cards } = useAppSelector((state) => state.payment);
  const navigation = useNavigation();

  const handleFetchCards = useCallback(() => {
    dispatch(fetchCardsAsync());
  }, [dispatch]);

  useEffect(() => {
    handleFetchCards();
  }, [handleFetchCards]);

  return (
    <SafeAreaView flex={1}>
      {cards.length ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleFetchCards} />
          }
        >
          <VStack p='$6' space='2xl'>
            {cards.map((card) => (
              <PaymentCard key={card._id} card={card} />
            ))}
          </VStack>
        </ScrollView>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleFetchCards} />
          }
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <VStack alignItems='center' p='$6' space='xl'>
            {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
            <Text size='5xl'>💳</Text>

            <Text size='lg'>No Cards Found</Text>

            <Text size='lg'>We recommend adding a card for easy payment</Text>

            <Button
              variant='link'
              size='xl'
              onPress={() =>
                navigation.navigate('PaymentCardAddScreen' as never)
              }
            >
              <ButtonText size='lg' color='$cyan400'>
                Add New Card
              </ButtonText>
            </Button>
          </VStack>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default PaymentCardListScreen;
