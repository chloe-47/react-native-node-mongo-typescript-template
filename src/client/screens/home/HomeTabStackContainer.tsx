import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { RequireLoggedInScreen } from 'src/client/components/RequireLoggedInScreen';
import StackNavigatorInsideTabNavigator from 'src/client/navigation/helpers/StackNavigatorInsideTabNavigator';
import {
  HomeStackParamList,
  HomeStackScreenProps,
} from 'src/client/navigation/NavigationTypes';
import HomeNavigationStore from 'src/client/screens/home/HomeNavigationStore';
import { HomeScreen } from 'src/client/screens/home/HomeScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export type ExtraProps = { navigateToProfile: () => void };

export function HomeTabStackContainer(): JSX.Element {
  return (
    <StackNavigatorInsideTabNavigator>
      <Stack.Navigator>
        <Stack.Screen component={wrapComponent(HomeScreen)} name="Home" />
      </Stack.Navigator>
    </StackNavigatorInsideTabNavigator>
  );

  function wrapComponent<T extends keyof HomeStackParamList>(
    Component: (props: HomeStackScreenProps<T>) => JSX.Element,
  ): (props: HomeStackScreenProps<T>) => JSX.Element {
    return React.useCallback((props: HomeStackScreenProps<T>) => {
      const { navigation } = props;
      React.useEffect(() => {
        HomeNavigationStore.update(navigation);
      }, [navigation]);
      return (
        <RequireLoggedInScreen>
          <Component {...props} />
        </RequireLoggedInScreen>
      );
    }, []);
  }
}
