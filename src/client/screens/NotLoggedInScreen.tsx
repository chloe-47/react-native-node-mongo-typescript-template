import * as React from 'react';
import { Button } from 'src/client/components/Button';
import { ScrollableScreen } from 'src/client/components/scrollable_screen/ScrollableScreen';
import { scrollableScreenElement } from 'src/client/components/scrollable_screen/scrollableScreenElement';
import { RootStackScreenProps } from 'src/client/navigation/NavigationTypes';
import { useHandleViewer } from 'src/client/viewer';
import { FullWidthElementWithPadding } from '../components/FullWidthElementWithPadding';
import { ContactCard } from './menu/cards/ContactCard';

export function NotLoggedInScreen({
  navigation,
}: RootStackScreenProps<'NotLoggedIn'>): JSX.Element {
  useHandleViewer(navigation, 'NotLoggedIn', {
    loggedIn: async (_, goToMain) => goToMain(),
  });
  return (
    <ScrollableScreen
      configs={[
        scrollableScreenElement({
          key: 'create-account',
          render: () => (
            <FullWidthElementWithPadding>
              <Button
                onPress={() => {
                  navigation.push('Create Account');
                }}
                text="Create new account"
              />
            </FullWidthElementWithPadding>
          ),
        }),
        scrollableScreenElement({
          key: 'login',
          render: () => (
            <FullWidthElementWithPadding>
              <Button
                onPress={() => {
                  navigation.push('Login', {});
                }}
                text="Login to existing account"
              />
            </FullWidthElementWithPadding>
          ),
        }),
        scrollableScreenElement({
          key: 'ContactCard',
          render: () => (
            <FullWidthElementWithPadding>
              <ContactCard />
            </FullWidthElementWithPadding>
          ),
        }),
      ]}
    />
  );
}
