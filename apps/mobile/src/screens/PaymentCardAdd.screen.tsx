import React, { FC } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  ScrollView,
  VStack,
  HStack,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';
import { IPaymentCardFormInput } from '../interfaces/payment.interface';
import PaymentCardForm from '../components/PaymentCardForm.component';
import Layout from '../components/Layout.component';
import VerifiedByVisaIcon from '../../assets/verified-by-visa-grey.svg';
import MasterCardSecureCodeIcon from '../../assets/mastercard-securecode-grey.svg';
import OmiseIcon from '../../assets/omise-grey.svg';

const PaymentCardAddScreen: FC = () => {
  const form = useForm<IPaymentCardFormInput>({
    mode: 'onBlur',
    defaultValues: {
      number: '',
      name: '',
      expiration: '',
      security_code: '',
    },
  });

  return (
    <FormProvider {...form}>
      <Layout>
        <KeyboardAvoidingView>
          <ScrollView>
            <VStack space='4xl'>
              <PaymentCardForm />

              <HStack justifyContent='center' space='2xl'>
                <VerifiedByVisaIcon width={56} height={56} />
                <MasterCardSecureCodeIcon width={56} height={56} />
                <OmiseIcon width={56} height={56} />
              </HStack>

              <Button>
                <ButtonText>Add Card</ButtonText>
              </Button>
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </Layout>
    </FormProvider>
  );
};

export default PaymentCardAddScreen;
