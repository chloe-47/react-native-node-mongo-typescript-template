import { gql, useMutation } from '@apollo/client';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Paragraph } from 'react-native-paper';
import { EmailLink } from 'src/client/components/EmailLink';
import { ScrollableScreen } from 'src/client/components/scrollable_screen/ScrollableScreen';
import { scrollableScreenElement } from 'src/client/components/scrollable_screen/scrollableScreenElement';
import { SuccessNotice } from 'src/client/components/SuccessNotice';
import TextInput, { TextInputHandles } from 'src/client/components/TextInput';
import View from 'src/client/components/ViewWithBackground';
import { ErrorNotice } from 'src/client/error/ErrorNotice';
import { useCreateCrumbtrailsToLandingScreenIfNeeded } from 'src/client/navigation/helpers/useCreateCrumbtrailsToLandingScreenIfNeeded';
import { RootStackScreenProps } from 'src/client/navigation/NavigationTypes';
import type {
  SendPasswordResetEmail,
  SendPasswordResetEmailVariables,
} from 'src/client/screens/__generated__/SendPasswordResetEmail';
import { reloadViewer, useHandleViewer } from 'src/client/viewer';
import { getErrorMessage } from 'src/shared/error/getErrorMessage';
import type { Login } from './__generated__/Login';

WebBrowser.maybeCompleteAuthSession();

export function LoginScreen(props: RootStackScreenProps<'Login'>) {
  const { navigation } = props;
  useCreateCrumbtrailsToLandingScreenIfNeeded(props, props.route.params);
  const { message, email: initialEmail } = props.route.params;

  const [emailAddress, setEmail] = React.useState(initialEmail ?? '');
  const [password, setPassword] = React.useState('');
  const [runLoginMutation, loginMutationState] =
    useMutation<Login>(LOGIN_MUTATION);
  const { loading: loginLoading, error: loginError } = loginMutationState;
  const [
    runSendPasswordResetEmailMutation,
    sendPasswordResetEmailMutationState,
  ] = useMutation<SendPasswordResetEmail, SendPasswordResetEmailVariables>(
    SEND_PASSWORD_RESET_EMAIL_MUTATION,
  );
  const {
    data: sendPasswordResetEmailData,
    loading: sendPasswordResetEmailLoading,
    error: sendPasswordResetEmailError,
  } = sendPasswordResetEmailMutationState;
  const loading = loginLoading || sendPasswordResetEmailLoading;

  useHandleViewer(navigation, 'Login', {
    loggedIn: async (_, goToMain) => {
      goToMain();
    },
  });

  const emailRef = React.useRef<TextInputHandles | null>(null);
  const passwordRef = React.useRef<TextInputHandles | null>(null);

  return (
    <ScrollableScreen
      configs={[
        ...(message == null
          ? []
          : [
              scrollableScreenElement({
                key: 'message',
                render: () => (
                  <View style={styles.element}>
                    <SuccessNotice text={message} />
                  </View>
                ),
              }),
            ]),
        scrollableScreenElement({
          key: 'email',
          render: () => (
            <View style={styles.element}>
              <TextInput
                autoComplete="email"
                autoFocus={!initialEmail}
                disabled={loading}
                label="Email"
                onSubmitEditing={() => {
                  passwordRef.current?.focus();
                }}
                ref={(ref) => {
                  emailRef.current = ref;
                }}
                returnKeyType="next"
                setValue={(value: string) => !loading && setEmail(value)}
                value={emailAddress}
              />
            </View>
          ),
        }),
        scrollableScreenElement({
          key: 'password',
          render: () => (
            <View style={styles.element}>
              <TextInput
                autoComplete="password"
                autoFocus={!!initialEmail}
                disabled={loading}
                label="Password"
                onSubmitEditing={login}
                ref={(ref) => {
                  passwordRef.current = ref;
                }}
                returnKeyType="go"
                setValue={(value: string) => !loading && setPassword(value)}
                value={password}
              />
            </View>
          ),
        }),
        scrollableScreenElement({
          key: 'login-button',
          render: () => (
            <View style={[styles.button, styles.element]}>
              <Button
                disabled={loading}
                loading={loginLoading}
                mode="contained"
                onPress={login}
              >
                Login
              </Button>
            </View>
          ),
        }),
        scrollableScreenElement({
          key: 'forgot-password',
          render: () => (
            <View style={[styles.button, styles.element]}>
              <Button
                disabled={loading}
                loading={sendPasswordResetEmailLoading}
                mode="outlined"
                onPress={forgotPassword}
              >
                Forgot Password
              </Button>
            </View>
          ),
        }),
        ...(loginError == null
          ? []
          : [
              scrollableScreenElement({
                key: 'login-error',
                render: () => (
                  <View style={styles.element}>
                    <Paragraph>
                      {getErrorMessage(loginError)}. Please use the 'Forgot
                      Password' button if you need to reset your password. Email{' '}
                      <EmailLink
                        emailUser="support"
                        subject={`Login Support (${emailAddress})`}
                      />{' '}
                      if you need help with anything.
                    </Paragraph>
                  </View>
                ),
              }),
            ]),
        scrollableScreenElement({
          key: 'send-password-reset-email-error',
          render: () => (
            <View style={styles.element}>
              <ErrorNotice
                error={sendPasswordResetEmailError}
                manualChange={
                  'create a password reset link for ' + emailAddress
                }
                whenTryingToDoWhat="send you a password reset email"
              />
            </View>
          ),
        }),
        scrollableScreenElement({
          key: 'sendPasswordResetEmailData',
          render: () => (
            <View style={styles.element}>
              <SuccessNotice
                text={sendPasswordResetEmailData?.sendPasswordResetEmail}
              />
            </View>
          ),
        }),
      ]}
    />
  );

  async function login(): Promise<void> {
    await runLoginMutation({
      variables: { password, emailAddress },
    });
    reloadViewer();
  }

  async function forgotPassword(): Promise<void> {
    await runSendPasswordResetEmailMutation({
      variables: { emailAddress },
    });
  }
}

export const LOGIN_MUTATION = gql`
  mutation Login($emailAddress: String!, $password: String!) {
    login(emailAddress: $emailAddress, password: $password) {
      user {
        emailAddress
      }
    }
  }
`;

export const SEND_PASSWORD_RESET_EMAIL_MUTATION = gql`
  mutation SendPasswordResetEmail($emailAddress: String!) {
    sendPasswordResetEmail(emailAddress: $emailAddress)
  }
`;

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
  },
  element: {
    marginHorizontal: 8,
  },
});
