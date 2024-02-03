import React from 'react';
import { useToast as useGluestackToast } from '@gluestack-ui/themed';

import Snackbar, { ISnackbarProps } from '../components/Snackbar.component';

function useToast() {
  const toast = useGluestackToast();

  return {
    show: ({
      action,
      text,
    }: {
      action: ISnackbarProps['action'];
      text: string;
    }) => {
      toast.show({
        avoidKeyboard: true,
        placement: 'top',
        render: ({ id }) => (
          <Snackbar
            nativeId={id}
            action={action}
            text={text}
            onClose={toast.close}
          />
        ),
      });
    },
  };
}

export default useToast;
