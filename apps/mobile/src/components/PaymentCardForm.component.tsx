import React, { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  VStack,
  HStack,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  InputSlot,
} from '@gluestack-ui/themed';
import { formatter } from '../utils/payment';
import VisaIcon from '../../assets/visa.svg';
import MasterCardIcon from '../../assets/mastercard.svg';
import JcbIcon from '../../assets/jcb.svg';

const PaymentCardForm: FC = () => {
  const { control } = useFormContext();

  return (
    <VStack space='2xl'>
      <Controller
        control={control}
        name='number'
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <FormControl>
            <FormControlLabel mb='$2'>
              <FormControlLabelText>
                ATM/Debit/Credit card number
              </FormControlLabelText>
            </FormControlLabel>

            <Input size='lg'>
              <InputField
                keyboardType='number-pad'
                autoComplete='cc-number'
                placeholder='0000 0000 0000 0000'
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={(newValue) => {
                  field.onChange(formatter.card.number(field.value, newValue));
                }}
              />

              <InputSlot>
                <HStack space='sm'>
                  <VisaIcon width={32} height={32} />
                  <MasterCardIcon width={32} height={32} />
                  <JcbIcon width={32} height={32} />
                </HStack>
              </InputSlot>
            </Input>
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name='holder'
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <FormControl>
            <FormControlLabel mb='$2'>
              <FormControlLabelText>Name on Card</FormControlLabelText>
            </FormControlLabel>

            <Input size='lg'>
              <InputField
                autoComplete='name'
                placeholder='Ty Lee'
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
              />
            </Input>
          </FormControl>
        )}
      />

      <HStack justifyContent='space-between'>
        <Controller
          control={control}
          name='expiry_date'
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <FormControl w='$1/2' pr='$2'>
              <FormControlLabel mb='$2'>
                <FormControlLabelText>Expiry date</FormControlLabelText>
              </FormControlLabel>

              <Input size='lg'>
                <InputField
                  keyboardType='number-pad'
                  autoComplete='cc-exp'
                  placeholder='MM/YY'
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={(newValue) => {
                    field.onChange(
                      formatter.card.expiryDate(field.value, newValue)
                    );
                  }}
                />
              </Input>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='cvv'
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <FormControl w='$1/2' pl='$2'>
              <FormControlLabel mb='$2'>
                <FormControlLabelText>CVV</FormControlLabelText>
              </FormControlLabel>

              <Input size='lg'>
                <InputField
                  keyboardType='number-pad'
                  autoComplete='cc-csc'
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                />
              </Input>
            </FormControl>
          )}
        />
      </HStack>
    </VStack>
  );
};

export default PaymentCardForm;
