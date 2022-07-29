import * as React from 'react';
import { Paragraph } from 'react-native-paper';
import { Button } from 'src/client/components/Button';
import { ScrollableScreen } from 'src/client/components/scrollable_screen/ScrollableScreen';
import { scrollableScreenElement } from 'src/client/components/scrollable_screen/scrollableScreenElement';
import Text from 'src/client/components/Text';
import { RootStackScreenProps } from 'src/client/navigation/NavigationTypes';
import { useHandleViewer } from 'src/client/viewer';
import { FullWidthElementWithPadding } from '../components/FullWidthElementWithPadding';
import { FeedbackCard } from './menu/cards/FeedbackCard';

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
          key: 'welcome',
          render: () => (
            <FullWidthElementWithPadding>
              <Text style={{ textAlign: 'center' }}>Welcome</Text>
            </FullWidthElementWithPadding>
          ),
        }),
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
          key: 'description',
          render: () => (
            <FullWidthElementWithPadding>
              <Paragraph style={{ textAlign: 'center' }}>
                App description
              </Paragraph>
            </FullWidthElementWithPadding>
          ),
        }),
        scrollableScreenElement({
          key: 'FeedbackCard',
          render: () => (
            <FullWidthElementWithPadding>
              <FeedbackCard />
            </FullWidthElementWithPadding>
          ),
        }),
      ]}
    />
  );
}
