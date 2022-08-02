import React, { ReactElement } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAppSelector } from '../hooks/redux';

import LoginScreen from './LoginScreen';
import NewsScreen from './NewsScreen';
import NewsItemShowScreen from './NewsItemShowScreen';

import { loginRequestTransform } from '../config/api';

const Stack = createStackNavigator();

// Компонент навигации
export default function NavigationScreen(): ReactElement {
  const currentUser = useAppSelector(state => state.currentUser);

  Object.keys(currentUser).length > 0 &&
    loginRequestTransform({
      'access-token': currentUser['access-token'],
      client: currentUser.client,
      uid: currentUser.uid,
    });

  // Вывод навигации
  function _renderNavigation(): ReactElement {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Главная" 
                        component={Object.keys(currentUser).length > 0 ? NewsScreen : LoginScreen}
                        options={{
                          headerStyle: {
                            backgroundColor: '#00ffee',
                          }
                        }} />
          <Stack.Screen name="Подробнее о новости" 
                        component={NewsItemShowScreen}
                        options={{
                          headerStyle: {
                            backgroundColor: '#00ffee',
                          }
                        }}  />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return _renderNavigation();
}
