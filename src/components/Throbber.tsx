import React, { ReactElement } from 'react';

import { Center, Spinner } from 'native-base';
import { useWindowDimensions } from 'react-native';

// Вывод троббера поверх контента
const Throbber = (): ReactElement => {
  const { height: windowHeight } = useWindowDimensions();
  
  return (
    <Center flex={1} position='absolute' w='100%' h={windowHeight} bgColor='rgba(0,0,0,0.4)' zIndex={10} px={3} rounded={0}>
      <Spinner size='lg' />
    </Center>
  );
};

export default Throbber;
