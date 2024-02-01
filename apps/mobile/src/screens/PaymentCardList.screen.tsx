import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView,
  VStack,
  Text,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';
import { useAppSelector } from '../hooks/redux.hook';
import PaymentCard from '../components/PaymentCard.component';
import Layout from '../components/Layout.component';

const PaymentCardListScreen: FC = () => {
  const { cards } = useAppSelector((state) => state.payment);
  const navigation = useNavigation();

  return (
    <Layout>
      {cards.length ? (
        <ScrollView>
          <VStack>
            {cards.map((card) => (
              <PaymentCard key={card._id} card={card} />
            ))}
          </VStack>
        </ScrollView>
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
            onPress={() => navigation.navigate('PaymentCardAddScreen' as never)}
          >
            <ButtonText size='lg'>Add New Card</ButtonText>
          </Button>
        </VStack>
      )}
    </Layout>
  );
};

export default PaymentCardListScreen;
