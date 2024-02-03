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
import { useAppSelector } from '../hooks/redux.hook';
import { formatter } from '../utils/payment';
import VisaIcon from '../../assets/visa.svg';
import MasterCardIcon from '../../assets/mastercard.svg';
import JcbIcon from '../../assets/jcb.svg';

const PaymentCardForm: FC = () => {
  const { loading } = useAppSelector((state) => state.payment);
  const { control } = useFormContext();

  return (
    <VStack space='2xl' bg='$white'>
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

            <Input isDisabled={loading} size='lg'>
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
        name='name'
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <FormControl>
            <FormControlLabel mb='$2'>
              <FormControlLabelText>Name on Card</FormControlLabelText>
            </FormControlLabel>

            <Input isDisabled={loading} size='lg'>
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
          name='expiration'
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <FormControl w='$1/2' pr='$2'>
              <FormControlLabel mb='$2'>
                <FormControlLabelText>Expiry date</FormControlLabelText>
              </FormControlLabel>

              <Input isDisabled={loading} size='lg'>
                <InputField
                  keyboardType='number-pad'
                  autoComplete='cc-exp'
                  placeholder='MM/YY'
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={(newValue) => {
                    field.onChange(
                      formatter.card.expiration(field.value, newValue)
                    );
                  }}
                />
              </Input>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='security_code'
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <FormControl w='$1/2' pl='$2'>
              <FormControlLabel mb='$2'>
                <FormControlLabelText>CVV</FormControlLabelText>
              </FormControlLabel>

              <Input isDisabled={loading} size='lg'>
                <InputField
                  keyboardType='number-pad'
                  autoComplete='cc-csc'
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={(newValue) => {
                    field.onChange(
                      formatter.card.securityCode(field.value, newValue)
                    );
                  }}
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
