import React, { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  VStack,
  HStack,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
  Input,
  InputField,
  InputSlot,
} from '@gluestack-ui/themed';
import dayjs from 'dayjs';

import { formatter } from '../utils/payment';
import VisaIcon from '../../assets/visa.svg';
import MasterCardIcon from '../../assets/mastercard.svg';
import JcbIcon from '../../assets/jcb.svg';
import { IPaymentCardFormInput } from '../interfaces/payment.interface';

export interface IPaymentCardFormProps {
  loading: boolean;
}

const PaymentCardForm: FC<IPaymentCardFormProps> = ({ loading }) => {
  const { control } = useFormContext<IPaymentCardFormInput>();

  return (
    <VStack space='2xl' bg='$white'>
      <Controller
        control={control}
        name='number'
        rules={{
          required: {
            value: true,
            message: 'Number cannot be empty!',
          },
          validate: (value) => {
            if (value.replace(/\W/gi, '').length !== 16) {
              return 'Number must be 16 digits!';
            }

            return true;
          },
        }}
        render={({ field, fieldState }) => (
          <FormControl isDisabled={loading} isInvalid={!!fieldState.error}>
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

            {fieldState.error && (
              <FormControlError>
                <FormControlErrorText>
                  {fieldState.error.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name='name'
        rules={{
          required: {
            value: true,
            message: 'Name cannot be empty!',
          },
        }}
        render={({ field, fieldState }) => (
          <FormControl isDisabled={loading} isInvalid={!!fieldState.error}>
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

            {fieldState.error && (
              <FormControlError>
                <FormControlErrorText>
                  {fieldState.error.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        )}
      />

      <HStack justifyContent='space-between'>
        <Controller
          control={control}
          name='expiration'
          rules={{
            required: {
              value: true,
              message: 'Expiration cannot be empty!',
            },
            validate: (value) => {
              const splittedExpiration = value.split('/');
              const expirationMonth = parseInt(splittedExpiration[0], 10);
              const expirationYear = splittedExpiration[1];

              if (expirationMonth <= 0) {
                return 'Expiration month must be greater than 01!';
              } else if (expirationMonth > 12) {
                return 'Expiration month must be less than 12!';
              }

              const now = dayjs();
              const expiration = dayjs()
                .set('month', expirationMonth - 1)
                .set('year', parseInt(`20${expirationYear}`, 10));

              if (
                now.diff(expiration, 'year', false) < 0 ||
                now.diff(expiration, 'year', false) > 5
              ) {
                return 'Invalid expiration year!';
              }

              if (expiration.isBefore(now)) {
                return 'Already expired!';
              }

              return true;
            },
          }}
          render={({ field, fieldState }) => (
            <FormControl
              isDisabled={loading}
              isInvalid={!!fieldState.error}
              w='$1/2'
              pr='$2'
            >
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
                      formatter.card.expiration(field.value, newValue),
                    );
                  }}
                />
              </Input>

              {fieldState.error && (
                <FormControlError>
                  <FormControlErrorText>
                    {fieldState.error.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='security_code'
          rules={{
            required: {
              value: true,
              message: 'Security code cannot be empty!',
            },
            minLength: {
              value: 3,
              message: 'Security code must be 3 digits!',
            },
            maxLength: {
              value: 3,
              message: 'Security code must be 3 digits!',
            },
          }}
          render={({ field, fieldState }) => (
            <FormControl
              isDisabled={loading}
              isInvalid={!!fieldState.error}
              w='$1/2'
              pl='$2'
            >
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
                      formatter.card.securityCode(field.value, newValue),
                    );
                  }}
                />
              </Input>

              {fieldState.error && (
                <FormControlError>
                  <FormControlErrorText>
                    {fieldState.error.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          )}
        />
      </HStack>
    </VStack>
  );
};

export default PaymentCardForm;
