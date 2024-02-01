import { SafeAreaView, View } from '@gluestack-ui/themed';
import React, { FC, ReactNode } from 'react';

export interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <SafeAreaView bg='$white'>
      <View w='$full' h='$full' px='$6' py='$6'>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default Layout;
