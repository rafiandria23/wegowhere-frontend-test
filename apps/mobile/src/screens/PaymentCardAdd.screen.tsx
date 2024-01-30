import React, { FC } from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { IPaymentCardFormInput } from '../interfaces/payment.interface';
import PaymentCardForm from '../components/PaymentCardForm.component';

const PaymentCardAddScreen: FC = () => {
  const { control } = useForm<IPaymentCardFormInput>({
    defaultValues: {
      number: '',
      holder_name: '',
      expiry_date: null,
      cvv: '',
    },
  });

  return (
    <View>
      <PaymentCardForm control={control} />
    </View>
  );
};

export default PaymentCardAddScreen;
