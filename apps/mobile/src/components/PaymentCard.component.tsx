import React, { FC, useMemo } from 'react';
import { Box, HStack, VStack, Text } from '@gluestack-ui/themed';
import { IPaymentCard } from '../interfaces/payment.interface';
import { parser } from '../utils/payment';
import VisaIcon from '../../assets/visa.svg';

export interface IPaymentCardProps {
  card: IPaymentCard;
}

const PaymentCard: FC<IPaymentCardProps> = ({ card }) => {
  const parsedCardNumbers = useMemo(() => {
    return parser.card.number(card.number);
  }, [card.number]);

  return (
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

        <HStack space='4xl' justifyContent='space-between' alignItems='center'>
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
            <Text>{card.holder}</Text>
          </VStack>

          <VStack space='md'>
            <Text>Expires</Text>
            <Text>{card.expiry_date.toString()}</Text>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
};

export default PaymentCard;
