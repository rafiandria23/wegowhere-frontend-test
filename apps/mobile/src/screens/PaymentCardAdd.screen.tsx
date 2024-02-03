import _ from 'lodash';
import React, { FC, useState, useCallback } from 'react';
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

import { useAppDispatch } from '../hooks/redux.hook';
import { addCardAsync } from '../redux/payment.slice';
import useToast from '../hooks/toast.hook';
import { IPaymentCardFormInput } from '../interfaces/payment.interface';
import PaymentCardForm from '../components/PaymentCardForm.component';
import VerifiedByVisaIcon from '../../assets/verified-by-visa-grey.svg';
import MasterCardSecureCodeIcon from '../../assets/mastercard-securecode-grey.svg';
import OmiseIcon from '../../assets/omise-grey.svg';

const PaymentCardAddScreen: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
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
      try {
        setLoading(true);

        const splittedExpiration = formInputData.expiration.split('/');

        await dispatch(
          addCardAsync({
            number: formInputData.number.replace(/\W/gi, ''),
            name: formInputData.name,
            expiration_month: splittedExpiration.shift() as string,
            expiration_year: splittedExpiration.pop() as string,
            security_code: formInputData.security_code,
          }),
        ).unwrap();

        navigation.navigate('PaymentCardListScreen' as never);
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
    },
    [dispatch, navigation, toast],
  );

  return (
    <FormProvider {...form}>
      <KeyboardAvoidingView flex={1} bg='$white'>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
          }}
        >
          <VStack flex={1} p='$6' justifyContent='space-between' space='4xl'>
            <VStack space='4xl'>
              <PaymentCardForm />

              <HStack justifyContent='center' space='2xl'>
                <VerifiedByVisaIcon width={56} height={56} />
                <MasterCardSecureCodeIcon width={56} height={56} />
                <OmiseIcon width={56} height={56} />
              </HStack>
            </VStack>

            <Button
              isDisabled={loading}
              size='xl'
              borderRadius='$full'
              bg='#4AD8DA'
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
