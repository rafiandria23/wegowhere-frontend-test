import _ from 'lodash';
import React, { FC, useState, useEffect, useCallback } from 'react';
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
import useToast from '../hooks/toast.hook';
import PaymentCard from '../components/PaymentCard.component';

const PaymentCardListScreen: FC = () => {
  const dispatch = useAppDispatch();
  const { cards } = useAppSelector((state) => state.payment);
  const navigation = useNavigation();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchCards = useCallback(async () => {
    try {
      setLoading(true);

      await dispatch(fetchCardsAsync()).unwrap();
    } catch (err) {
      toast.show({
        action: 'error',
        text: _.defaultTo(
          _.get(err, 'data.message'),
          _.get(err, 'message'),
        ) as unknown as string,
      });
    } finally {
      setLoading(false);
    }
  }, [dispatch, toast]);

  useEffect(() => {
    handleFetchCards();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView flex={1} bg='$white'>
      {cards ? (
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
          <VStack alignItems='center' p='$20' space='sm'>
            {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
            <Text size='5xl'>💳</Text>

            <Text size='lg'>No Cards Found</Text>

            <Text size='lg' textAlign='center'>
              We recommend adding a card for easy payment
            </Text>

            <Button
              variant='link'
              onPress={() =>
                navigation.navigate('PaymentCardAddScreen' as never)
              }
            >
              <ButtonText size='lg' color='#4AD8DA'>
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
