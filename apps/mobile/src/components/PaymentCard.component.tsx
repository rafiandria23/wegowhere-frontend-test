import _ from 'lodash';
import React, { FC, useState, useCallback, useMemo } from 'react';
import { Pressable, HStack, VStack, Spinner, Text } from '@gluestack-ui/themed';
import { faker } from '@faker-js/faker';

import { IPaymentCard } from '../interfaces/payment.interface';
import { parser } from '../utils/payment';
import VisaIcon from '../../assets/visa.svg';
import { useAppDispatch } from '../hooks/redux.hook';
import { createPayment } from '../redux/thunks/payment.thunk';
import useToast from '../hooks/toast.hook';

export interface IPaymentCardProps {
  card: IPaymentCard;
}

const PaymentCard: FC<IPaymentCardProps> = ({ card }) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreatePayment = useCallback(async () => {
    try {
      setLoading(true);

      const { number, name, expiration_month, expiration_year, security_code } =
        card;

      const randomAmount = faker.number.int({
        min: 20,
        max: 150000,
      });

      await dispatch(
        createPayment({
          number,
          name,
          expiration_month,
          expiration_year,
          security_code,
          amount: randomAmount,
        }),
      ).unwrap();

      toast.show({
        action: 'success',
        text: `You just paid BHT ${randomAmount}!`,
      });
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
  }, [card, setLoading, dispatch, toast]);

  const parsedCardNumbers = useMemo(() => {
    return parser.card.number(card.number);
  }, [card.number]);

  return (
    <Pressable
      disabled={loading}
      px='$8'
      pt='$4'
      pb='$8'
      bg='$white'
      hardShadow='5'
      borderRadius='$xl'
      onPress={handleCreatePayment}
    >
      <VStack>
        <HStack justifyContent='space-between' space='4xl'>
          <VisaIcon width={72} height={72} />

          {loading && <Spinner />}
        </HStack>

        <HStack
          pr='$20'
          justifyContent='space-between'
          alignItems='center'
          space='2xl'
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

        <HStack mt='$5' pr='$20' justifyContent='space-between' space='4xl'>
          <VStack space='md'>
            <Text size='xs' color='$coolGray400'>
              Name on Card
            </Text>
            <Text size='md' bold>
              {card.name}
            </Text>
          </VStack>

          <VStack space='md'>
            <Text size='xs' color='$coolGray400'>
              Expires
            </Text>
            <Text size='md' bold>
              {`${card.expiration_month}/${card.expiration_year}`}
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </Pressable>
  );
};

export default PaymentCard;
