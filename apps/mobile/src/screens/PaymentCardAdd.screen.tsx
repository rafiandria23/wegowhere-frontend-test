import React, { FC, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  ScrollView,
  VStack,
  HStack,
  Button,
  ButtonSpinner,
  ButtonText,
} from '@gluestack-ui/themed';

import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import { addCardAsync } from '../redux/payment.slice';
import { IPaymentCardFormInput } from '../interfaces/payment.interface';
import PaymentCardForm from '../components/PaymentCardForm.component';
import VerifiedByVisaIcon from '../../assets/verified-by-visa-grey.svg';
import MasterCardSecureCodeIcon from '../../assets/mastercard-securecode-grey.svg';
import OmiseIcon from '../../assets/omise-grey.svg';

const PaymentCardAddScreen: FC = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.payment);
  const navigation = useNavigation();
  const form = useForm<IPaymentCardFormInput>({
    mode: 'onBlur',
    defaultValues: {
      number: '',
      name: '',
      expiration: '',
      security_code: '',
    },
  });

  const handleAddPaymentCard = useCallback<
    SubmitHandler<IPaymentCardFormInput>
  >(
    async (formInputData) => {
      const splittedExpiration = formInputData.expiration.split('/');

      await dispatch(
        addCardAsync({
          number: formInputData.number.replace(/\W/gi, ''),
          name: formInputData.name,
          expiration_month: splittedExpiration.shift() as string,
          expiration_year: splittedExpiration.pop() as string,
          security_code: formInputData.security_code,
        })
      );

      navigation.navigate('PaymentCardListScreen' as never);
    },
    [dispatch, navigation]
  );

  return (
    <FormProvider {...form}>
      <KeyboardAvoidingView flex={1}>
        <ScrollView>
          <VStack p='$6' space='4xl'>
            <PaymentCardForm />

            <HStack justifyContent='center' space='2xl'>
              <VerifiedByVisaIcon width={56} height={56} />
              <MasterCardSecureCodeIcon width={56} height={56} />
              <OmiseIcon width={56} height={56} />
            </HStack>

            <Button
              isDisabled={loading}
              size='xl'
              borderRadius='$full'
              bgColor='$cyan400'
              onPress={form.handleSubmit(handleAddPaymentCard)}
            >
              {loading && <ButtonSpinner mr='$3' />}

              <ButtonText size='md'>
                {loading ? 'Please wait...' : 'Add Card'}
              </ButtonText>
            </Button>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </FormProvider>
  );
};

export default PaymentCardAddScreen;
