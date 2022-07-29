import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import * as React from 'react';
import { useColor } from 'src/client/colors';
import Icon from 'src/client/components/Icon';
import {
  RootTabParamList,
  RootTabScreenProps,
} from 'src/client/navigation/NavigationTypes';
import { HomeTabStackContainer } from 'src/client/screens/home/HomeTabStackContainer';
import { MenuTabStackContainer } from 'src/client/screens/menu/MenuTabStackContainer';

const BottomTab = createMaterialBottomTabNavigator<RootTabParamList>();

export default function MainScreen(): React.ReactElement {
  const tabIconSelectedColor = useColor('tabIconSelected');
  const tabIconDefaultColor = useColor('tabIconDefault');
  const tabBarBackground = useColor('tabBarBackground');
  return (
    <BottomTab.Navigator
      activeColor={tabIconSelectedColor}
      barStyle={{ backgroundColor: tabBarBackground }}
      inactiveColor={tabIconDefaultColor}
      initialRouteName="HomeTabStackContainer"
      shifting={true}
    >
      <BottomTab.Screen
        component={HomeTabStackContainer}
        name="HomeTabStackContainer"
        options={() => {
          return {
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon color={color} focused={focused} name="handshake" />
            ),
            title: 'All Requests',
          };
        }}
      />
      <BottomTab.Screen
        component={MenuTabStackContainer}
        name="MenuTabStackContainer"
        options={({
          navigation: _navigation,
        }: RootTabScreenProps<'MenuTabStackContainer'>) => ({
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon color={color} focused={focused} name="menu" />
          ),
          title: 'Menu',
        })}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: { name: string; color: string; focused: boolean }) {
  return <Icon path={props.name} size={props.focused ? 23 : 19} />;
}
