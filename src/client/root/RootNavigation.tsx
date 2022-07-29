import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Colors } from 'src/client/colors';
import Header from 'src/client/components/Header';
import navigateToMain from 'src/client/navigation/helpers/navigateToMain';
import LinkingConfiguration from 'src/client/navigation/LinkingConfiguration';
import type {
  RootStackParamList,
  RootStackScreenProps,
} from 'src/client/navigation/NavigationTypes';
import { RootNavigationStore } from 'src/client/root/RootNavigationStore';
import { CreateAccountScreen } from 'src/client/screens/CreateAccountScreen';
import { LoginScreen } from 'src/client/screens/LoginScreen';
import MainScreen from 'src/client/screens/main/MainScreen';
import { NotFoundScreen } from 'src/client/screens/NotFoundScreen';
import { NotLoggedInScreen } from 'src/client/screens/NotLoggedInScreen';
import ResetPasswordScreen from 'src/client/screens/reset_password/ResetPasswordScreen';

const LIGHT_THEME = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: Colors.light.background },
};

const DARK_THEME = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: Colors.dark.background },
};

export function RootNavigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}): JSX.Element {
  const theme = colorScheme === 'dark' ? DARK_THEME : LIGHT_THEME;
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={wrapComponent(MainScreen)}
        name="Main"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={wrapComponent(NotFoundScreen)}
        name="NotFound"
        options={{ headerShown: false, title: 'Not Found' }}
      />
      <Stack.Screen
        component={wrapComponent(NotLoggedInScreen)}
        name="NotLoggedIn"
        options={() => ({
          header: ({ options }) => (
            <Header>
              <Appbar.Content title={options.title} />
            </Header>
          ),
          title: 'Welcome!',
        })}
      />
      <Stack.Screen
        component={wrapComponent(CreateAccountScreen)}
        name="Create Account"
        options={optionsForHeaderWithBackToMainButton('Sign Up')}
      />
      <Stack.Screen
        component={wrapComponent(LoginScreen)}
        name="Login"
        options={optionsForHeaderWithBackToMainButton('Log In')}
      />
      <Stack.Screen
        component={wrapComponent(ResetPasswordScreen)}
        name="ResetPassword"
        options={optionsForHeaderWithBackToMainButton('Reset Password')}
      />
    </Stack.Navigator>
  );

  function optionsForHeaderWithBackToMainButton(
    title: string,
  ): () => NativeStackNavigationOptions {
    return () => ({
      header: ({ options }: NativeStackHeaderProps) => (
        <Header>
          <Appbar.BackAction onPress={navigateToMain} />
          <Appbar.Content title={options.title} />
        </Header>
      ),
      title,
    });
  }

  function wrapComponent<T extends keyof RootStackParamList>(
    Component: (props: RootStackScreenProps<T>) => JSX.Element,
  ): (props: RootStackScreenProps<T>) => JSX.Element {
    return React.useCallback((props: RootStackScreenProps<T>) => {
      const { navigation } = props;
      React.useEffect(() => {
        RootNavigationStore.update(navigation);
      }, [navigation]);
      return <Component {...props} />;
    }, []);
  }
}
