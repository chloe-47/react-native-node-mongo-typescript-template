import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Appbar } from 'react-native-paper';
import Header from 'src/client/components/Header';
import StackNavigatorInsideTabNavigator from 'src/client/navigation/helpers/StackNavigatorInsideTabNavigator';
import {
  MenuStackParamList,
  RootTabScreenProps,
} from 'src/client/navigation/NavigationTypes';
import { MenuScreen } from 'src/client/screens/menu/MenuScreen';

const Stack = createNativeStackNavigator<MenuStackParamList>();

export function MenuTabStackContainer({
  navigation: _parentNavigation,
}: RootTabScreenProps<'MenuTabStackContainer'>): React.ReactElement {
  return (
    <StackNavigatorInsideTabNavigator>
      <Stack.Navigator>
        <Stack.Screen
          component={MenuScreen}
          name="Menu"
          options={() => ({
            header: ({ options }) => (
              <Header>
                <Appbar.Content title={options.title} />
              </Header>
            ),
            title: 'Menu',
          })}
        />
      </Stack.Navigator>
    </StackNavigatorInsideTabNavigator>
  );
}
