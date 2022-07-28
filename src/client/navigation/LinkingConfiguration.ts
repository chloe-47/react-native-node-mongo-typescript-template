import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { PASSWORD_RESET_PATH } from 'src/shared/urls/PASSWORD_RESET_PATH';
import { RootStackParamList } from './NavigationTypes';

const linking: LinkingOptions<RootStackParamList> = {
  config: {
    screens: {
      ['Create Account']: 'create_account',
      Login: 'login',
      Main: {
        screens: {
          MenuTabStackContainer: {
            screens: {
              Menu: 'menu',
            },
          },
          HomeTabStackContainer: {
            screens: {
              Home: 'home',
            },
          },
        },
      },
      NotFound: '*',
      NotLoggedIn: 'loggedout',
      ResetPassword: PASSWORD_RESET_PATH,
    },
  },
  prefixes: [Linking.createURL('/')],
};

export default linking;
