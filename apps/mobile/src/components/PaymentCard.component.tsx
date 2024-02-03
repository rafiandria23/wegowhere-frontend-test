import React, { FC, useCallback, useMemo } from 'react';
import { Pressable, Box, HStack, VStack, Text } from '@gluestack-ui/themed';
import { faker } from '@faker-js/faker';

import { IPaymentCard } from '../interfaces/payment.interface';
import { parser } from '../utils/payment';
import VisaIcon from '../../assets/visa.svg';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import { createAsync as createPaymentAsync } from '../redux/payment.slice';

export interface IPaymentCardProps {
  card: IPaymentCard;
}

const PaymentCard: FC<IPaymentCardProps> = ({ card }) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.payment);

  const handleCreatePayment = useCallback(() => {
    const { number, name, expiration_month, expiration_year, security_code } =
      card;

    dispatch(
      createPaymentAsync({
        number,
        name,
        expiration_month,
        expiration_year,
        security_code,
        amount: faker.number.int({
          min: 20,
          max: 150000,
        }),
      })
    );
  }, [dispatch, card]);

  const parsedCardNumbers = useMemo(() => {
    return parser.card.number(card.number);
  }, [card.number]);

  return (
    <Pressable disabled={loading} onPress={handleCreatePayment}>
      <Box
        px='$8'
        pt='$4'
        pr='$20'
        pb='$8'
        elevation='$10'
        borderColor='$borderLight200'
        borderRadius='$xl'
        borderWidth='$1'
      >
        <VStack>
          <VisaIcon width={72} height={72} />

          <HStack
            space='2xl'
            justifyContent='space-between'
            alignItems='center'
          >
            <Text size='2xl' bold>
              ••••
            </Text>
            <Text size='2xl' bold>
              ••••
            </Text>
            <Text size='2xl' bold>
              ••••
            </Text>
            <Text size='lg'>
              {parsedCardNumbers[parsedCardNumbers.length - 1]}
            </Text>
          </HStack>

          <HStack mt='$5' space='4xl' justifyContent='space-between'>
            <VStack space='md'>
              <Text size='xs'>Name on Card</Text>
              <Text size='md'>{card.name}</Text>
            </VStack>

            <VStack space='md'>
              <Text size='xs'>Expires</Text>
              <Text size='md'>
                {`${card.expiration_month}/${card.expiration_year}`}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default PaymentCard;
