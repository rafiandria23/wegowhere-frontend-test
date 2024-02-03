import React, { FC, useCallback, useMemo } from 'react';
import { Pressable, Box, HStack, VStack, Text } from '@gluestack-ui/themed';
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
        amount: 500000,
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
        elevation='$1'
        borderColor='$borderLight200'
        borderRadius='$xl'
        borderWidth='$1'
      >
        <VStack>
          <VisaIcon width={64} height={64} />

          <HStack
            space='4xl'
            justifyContent='space-between'
            alignItems='center'
          >
            <Text size='2xl'>••••</Text>
            <Text size='2xl'>••••</Text>
            <Text size='2xl'>••••</Text>
            <Text size='md'>
              {parsedCardNumbers[parsedCardNumbers.length - 1]}
            </Text>
          </HStack>

          <HStack mt='$5' space='4xl' justifyContent='space-between'>
            <VStack space='md'>
              <Text>Name on Card</Text>
              <Text>{card.name}</Text>
            </VStack>

            <VStack space='md'>
              <Text>Expires</Text>
              <Text>{`${card.expiration_month}/${card.expiration_year}`}</Text>
            </VStack>
          </HStack>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default PaymentCard;
