import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TOKEN_URL_PARAM } from 'src/shared/urls/TOKEN_URL_PARAM';

export type RootStackParamList = Readonly<{
  Main: NavigatorScreenParams<RootTabParamList> | undefined;
  NotLoggedIn: NavigatorScreenParams<RootTabParamList> | undefined;
  ['Create Account']: NavigatorScreenParams<RootTabParamList> | undefined;
  ResetPassword: { [TOKEN_URL_PARAM]: string };
  ['Unverified Account']: NavigatorScreenParams<RootTabParamList> | undefined;
  ['Setting Up Account']: NavigatorScreenParams<RootTabParamList> | undefined;
  Login: { message?: string; email?: string };
  Modal: NavigatorScreenParams<RootTabParamList> | undefined;
  NotFound: NavigatorScreenParams<RootTabParamList> | undefined;
  ['Create Note']: NavigatorScreenParams<RootTabParamList> | undefined;
}>;

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type HomeStackParamList = Readonly<{
  Home: Record<never, never>;
}>;

export type HomeStackScreenProps<Screen extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, Screen>;

export type MenuStackParamList = Readonly<{
  Menu: NavigatorScreenParams<RootTabParamList> | undefined;
}>;

export type RootTabParamList = Readonly<{
  HomeTabStackContainer: undefined;
  MenuTabStackContainer: undefined;
}>;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type RootNavigationTypeParameterized<
  T extends keyof RootStackParamList,
> = RootStackScreenProps<T>['navigation'];

export type HomeNavigationTypeParameterized<
  T extends keyof HomeStackParamList,
> = HomeStackScreenProps<T>['navigation'];

export type RootNavigationAllTypes =
  // Idk how else to do this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  null | RootNavigationTypeParameterized<any>;

export type HomeNavigationAllTypes =
  // Idk how else to do this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  null | HomeNavigationTypeParameterized<any>;
