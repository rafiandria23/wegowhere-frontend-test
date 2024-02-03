import React, { FC, useCallback, useMemo } from 'react';
import {
  Toast,
  HStack,
  VStack,
  ToastTitle,
  ToastDescription,
  Pressable,
  Icon,
  CloseIcon,
} from '@gluestack-ui/themed';

export interface ISnackbarProps {
  nativeId: string;
  text: string;
  action?: 'error' | 'warning' | 'success' | 'info' | 'attention';
  onClose?: (nativeId: string) => void;
}

const Snackbar: FC<ISnackbarProps> = ({
  nativeId,
  text,
  action = 'info',
  onClose,
}) => {
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose(nativeId);
    }
  }, [onClose, nativeId]);

  const title = useMemo(() => {
    switch (action) {
      case 'error':
        return 'Error!';

      case 'warning':
        return 'Warning!';

      case 'success':
        return 'Success!';

      case 'attention':
        return 'Attention!';

      case 'info':
      default:
        return 'Info';
    }
  }, [action]);

  return (
    <Toast nativeID={nativeId} action={action} variant='accent'>
      <HStack justifyContent='space-between' alignItems='center' space='4xl'>
        <VStack space='xs' width='$5/6'>
          <ToastTitle>{title}</ToastTitle>

          <ToastDescription>{text}</ToastDescription>
        </VStack>

        {onClose && (
          <Pressable onPress={handleClose}>
            <Icon as={CloseIcon} size='xl' />
          </Pressable>
        )}
      </HStack>
    </Toast>
  );
};

export default Snackbar;
