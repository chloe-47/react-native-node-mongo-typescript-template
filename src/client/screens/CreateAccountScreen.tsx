import { gql, useMutation } from '@apollo/client';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Paragraph } from 'react-native-paper';
import { ScrollableScreen } from 'src/client/components/scrollable_screen/ScrollableScreen';
import { scrollableScreenElement } from 'src/client/components/scrollable_screen/scrollableScreenElement';
import { TextInput, TextInputHandles } from 'src/client/components/TextInput';
import { ViewWithBackground } from 'src/client/components/ViewWithBackground';
import { useCreateCrumbtrailsToLandingScreenIfNeeded } from 'src/client/navigation/helpers/useCreateCrumbtrailsToLandingScreenIfNeeded';
import { RootStackScreenProps } from 'src/client/navigation/NavigationTypes';
import { reloadViewer, useHandleViewer } from 'src/client/viewer';
import { ErrorNotice } from '../error/ErrorNotice';
import type { Register } from './__generated__/Register';

WebBrowser.maybeCompleteAuthSession();

export function CreateAccountScreen(
  props: RootStackScreenProps<'Create Account'>,
) {
  const { navigation } = props;
  useCreateCrumbtrailsToLandingScreenIfNeeded(props, undefined);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [runRegisterMutation, { loading, error }] =
    useMutation<Register>(REGISTER_MUTATION);
  useHandleViewer(navigation, 'Create Account', {
    loggedIn: async (_, goToMain) => {
      goToMain();
    },
  });

  const emailRef = React.useRef<TextInputHandles | null>(null);
  const passwordRef = React.useRef<TextInputHandles | null>(null);
  const confirmPasswordRef = React.useRef<TextInputHandles | null>(null);

  const isEmailValid = /.+@.+\..+/.test(email);
  const isPasswordValid = password.length >= 8;
  const isConfirmPasswordValid = password === confirmPassword;
  const areInputsValid =
    isEmailValid && isPasswordValid && isConfirmPasswordValid;
  const hints = `${isEmailValid ? '' : 'Please enter a valid email address.'} ${
    isPasswordValid ? '' : 'Please use a password of at least 8 characters.'
  } ${isConfirmPasswordValid ? '' : 'Passwords do not match.'}`;

  return (
    <ScrollableScreen
      configs={[
        scrollableScreenElement({
          key: 'email',
          render: () => (
            <TextInput
              autoComplete="email"
              autoFocus={true}
              label="Email"
              onSubmitEditing={() => {
                passwordRef.current?.focus();
              }}
              ref={(ref) => {
                emailRef.current = ref;
              }}
              returnKeyType="next"
              setValue={(value: string) => !loading && setEmail(value)}
              value={email}
            />
          ),
        }),
        scrollableScreenElement({
          key: 'password',
          render: () => (
            <TextInput
              autoComplete="password"
              autoFocus={false}
              label="Password"
              onSubmitEditing={() => {
                confirmPasswordRef.current?.focus();
              }}
              ref={(ref) => {
                passwordRef.current = ref;
              }}
              returnKeyType="next"
              setValue={(value: string) => !loading && setPassword(value)}
              value={password}
            />
          ),
        }),
        scrollableScreenElement({
          key: 'confirmPassword',
          render: () => (
            <TextInput
              autoComplete="password"
              autoFocus={false}
              label="Confirm Password"
              onSubmitEditing={() => {
                if (areInputsValid) {
                  createAccount();
                }
              }}
              ref={(ref) => {
                confirmPasswordRef.current = ref;
              }}
              returnKeyType="go"
              setValue={(value: string) =>
                !loading && setConfirmPassword(value)
              }
              value={confirmPassword}
            />
          ),
        }),
        scrollableScreenElement({
          key: 'create-account-button',
          render: () => (
            <ViewWithBackground style={styles.button}>
              <Button
                disabled={!areInputsValid}
                loading={loading}
                mode="contained"
                onPress={createAccount}
              >
                Create Account
              </Button>
              <Paragraph>{hints}</Paragraph>
            </ViewWithBackground>
          ),
        }),
        scrollableScreenElement({
          key: 'error-message',
          render: () => (
            <ErrorNotice error={error} whenTryingToDoWhat="create an account" />
          ),
        }),
      ]}
    />
  );

  async function createAccount(): Promise<void> {
    await runRegisterMutation({ variables: { password, emailAddress: email } });
    await reloadViewer();
  }
}

const REGISTER_MUTATION = gql`
  mutation Register($emailAddress: String!, $password: String!) {
    register(emailAddress: $emailAddress, password: $password) {
      user {
        emailAddress
      }
    }
  }
`;

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
  },
  container: {
    marginHorizontal: 20,
  },
});
