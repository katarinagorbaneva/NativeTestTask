import React, { ReactElement } from 'react';

import { Text, Card, Box, Image, Button, View } from 'native-base';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { userSlice } from '../redux/reducers/user';

// Компонент вывода шапки с пользователем и кнопкой выйти
export default function Header (): ReactElement {
  const { navigate } = useNavigation();

  const currentUser = useAppSelector(state => state.currentUser);

  const { deleteUser } = userSlice.actions;
  const dispatch = useAppDispatch();

  // При нажатии на кнопку выйти обновление редукса и переход на главную
  function onClickLogOut (): void {
    dispatch(deleteUser());
    navigate('Главная');
  }

  // Вывод даных пользователя
  function _renderUser (): ReactElement {
    const { avatar_url: avatarUrl, username } = currentUser;

    return (
      <View flexDirection='row' alignItems='center'>
        <Image size={30} source={{uri: avatarUrl}} alt='avatar'/>
        <Text>{username}</Text>
      </View>
    );
  }

  return (
    <Box flexDirection='row' justifyContent='space-between' alignItems='center' style={styles.header}>
      {_renderUser()}

      <Button onPress={() => onClickLogOut()}>Выйти</Button>
    </Box>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 'auto',
    height: 40,
    width: '100%',
    borderColor: '#000',
    borderBottomWidth: 2,
    backgroundColor: '#00ffee'
  },
});
