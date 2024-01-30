import React, { FC } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Control, Controller } from 'react-hook-form';
import { IPaymentCardFormInput } from '../interfaces/payment.interface';

export interface IPaymentCardFormProps {
  control: Control<IPaymentCardFormInput>;
}

const PaymentCardForm: FC<IPaymentCardFormProps> = ({ control }) => {
  return (
    <View>
      <Controller
        control={control}
        name='number'
        rules={{
          required: true,
        }}
        render={({
          field: { onChange, onBlur, value },
          formState: { errors },
        }) => <TextInput />}
      />

      <Controller
        control={control}
        name='holder_name'
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => <TextInput />}
      />

      <Controller
        control={control}
        name='expiry_date'
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => <TextInput />}
      />

      <Controller
        control={control}
        name='cvv'
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => <TextInput />}
      />
    </View>
  );
};

export default PaymentCardForm;
