import React, { Dispatch, ReactElement, SetStateAction } from 'react';

import { Text, Alert, VStack, HStack, IconButton, CloseIcon } from 'native-base';

interface AlertComponentProps {
  errors: string[];
  setErrors: Dispatch<SetStateAction<never[]>>;
}

// Компонент вывода алерта
export default function AlertComponent({ errors, setErrors }: AlertComponentProps): ReactElement {
  return (
    <Alert w="100%" status="error">
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} justifyContent="space-between">
          <HStack space={2} flexShrink={1}>
            <Alert.Icon mt="1" />
            <Text fontSize={16} color="coolGray.800">
              {errors}
            </Text>
          </HStack>
          <IconButton
            variant="unstyled"
            _focus={{
              borderWidth: 0,
            }}
            icon={<CloseIcon size="3" />}
            _icon={{
              color: 'coolGray.600',
            }}
            onPress={() => setErrors([])}
          />
        </HStack>
      </VStack>
    </Alert>
  );
}
