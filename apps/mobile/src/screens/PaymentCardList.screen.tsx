import React, { FC, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
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
import Layout from '../components/Layout.component';

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
    <Layout>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleFetchCards} />
        }
      >
        {cards.length ? (
          <VStack space='4xl'>
            {cards.map((card) => (
              <PaymentCard key={card._id} card={card} />
            ))}
          </VStack>
        ) : (
          <VStack justifyContent='center' alignItems='center' space='xl'>
            {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
            <Text size='5xl'>💳</Text>

            <Text size='lg'>No Cards Found</Text>

            <Text textAlign='center' size='lg'>
              We recommend adding a card for easy payment
            </Text>

            <Button
              variant='link'
              onPress={() =>
                navigation.navigate('PaymentCardAddScreen' as never)
              }
            >
              <ButtonText size='lg'>Add New Card</ButtonText>
            </Button>
          </VStack>
        )}
      </ScrollView>
    </Layout>
  );
};

export default PaymentCardListScreen;
