import React, { useState, ReactElement } from 'react';

import { Text, Box, Input, Button } from 'native-base';
import { Keyboard } from 'react-native';

import { userSlice } from '../redux/reducers/user';
import { useAppDispatch } from '../hooks/redux';

import Throbber from '../components/Throbber';
import ViewPasswordButton from '../components/ViewPasswordButton';
import AlertComponent from '../components/AlertComponent';

import { apiWrapper, apiUrls } from '../config/api';

// Экран логина
export default function LoginScreen(): ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);

  const [loading, setLoading] = useState(false);

  const { updateUser } = userSlice.actions;
  const dispatch = useAppDispatch();

  // Отправка запроса на логин
  async function logIn() {
    setLoading(true);
    Keyboard.dismiss();

    const formData = {};

    formData.email = email;
    formData.password = password;

    const response: any = await apiWrapper.post(apiUrls.auth, formData);

    const { ok, data, headers } = response;

    if (ok && data) {
      const authData = {
        'access-token': headers['access-token'],
        client: headers.client,
        uid: headers.uid,
      };

      dispatch(updateUser({ ...authData, username: data.user.username, avatar_url: data.user.avatar_url }));
    } else if (data) setErrors(data.errors);
  }

  return (
    <Box flex={1} justifyContent="center" alignItems="center" safeArea>
      {errors.length > 0 && <AlertComponent errors={errors} setErrors={setErrors} />}
      {loading && <Throbber />}
      <Text fontSize={18}>Please, log in for continue</Text>
      <Input my={5} size="xl" w="90%" placeholder="Enter your email..." onChangeText={text => setEmail(text)} autoCapitalize='none' />
      <Input type={showPassword ? 'text' : 'password'}
             w="90%"
             size="xl"
             InputRightElement={ViewPasswordButton({ showPassword, setShowPassword })}
             placeholder="Enter your password..."
             onChangeText={text => setPassword(text)} />
      <Button mt="5" size="xl" w="2/3" h="50" onPress={() => logIn().then(() => setLoading(false))}>
        Login
      </Button>
    </Box>
  );
}
