import React, { Dispatch, ReactElement, SetStateAction } from 'react';

import { Button } from 'native-base';

interface ViewPasswordButtonProps {
  showPassword: boolean; // переменная стейта показа пароля
  setShowPassword: Dispatch<SetStateAction<boolean>>; // функия изменения стейта показа пароля
}

// Вывод кнопки показать пароль
export default function ViewPasswordButton({ showPassword, setShowPassword }: ViewPasswordButtonProps): ReactElement {
  return (
    <Button size="xl" w="1/6" h="full" onPress={() => setShowPassword(!showPassword)}>
      {showPassword ? 'Hide' : 'Show'}
    </Button>
  );
}
