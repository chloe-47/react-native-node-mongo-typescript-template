import { gql, useMutation, useQuery } from '@apollo/client';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Paragraph } from 'react-native-paper';
import { ScrollableScreen } from 'src/client/components/scrollable_screen/ScrollableScreen';
import { scrollableScreenElement } from 'src/client/components/scrollable_screen/scrollableScreenElement';
import { TextInput, TextInputHandles } from 'src/client/components/TextInput';
import { ViewWithBackground } from 'src/client/components/ViewWithBackground';
import { ErrorNotice } from 'src/client/error/ErrorNotice';
import { RootStackScreenProps } from 'src/client/navigation/NavigationTypes';
import { useHandleViewer } from 'src/client/viewer';
import { PasswordResetLinkDetails } from './PasswordResetLinkDetails';
import {
  ResetPasswordLinkDetailsQuery,
  ResetPasswordLinkDetailsQueryVariables,
} from './__generated__/ResetPasswordLinkDetailsQuery';
import {
  ResetPasswordMutation,
  ResetPasswordMutationVariables,
} from './__generated__/ResetPasswordMutation';

export function ResetPasswordScreen(
  props: RootStackScreenProps<'ResetPassword'>,
) {
  const { navigation } = props;
  const { token } = props.route.params;
  const {
    data,
    loading: detailsLoading,
    error: detailsError,
  } = useQuery<
    ResetPasswordLinkDetailsQuery,
    ResetPasswordLinkDetailsQueryVariables
  >(RESET_PASSWORD_LINK_DETAILS_QUERY, {
    variables: { token },
  });
  const emailAddress = data?.resetPasswordLinkDetails?.emailAddress;
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [runResetPasswordMutation, resetPasswordMutationState] = useMutation<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >(RESET_PASSWORD_MUTATION);
  const { loading: resetLoading, error: resetError } =
    resetPasswordMutationState;
  useHandleViewer(navigation, 'Create Account', {
    loggedIn: async (_, goToMain) => {
      goToMain();
    },
  });

  const passwordRef = React.useRef<TextInputHandles | null>(null);
  const confirmPasswordRef = React.useRef<TextInputHandles | null>(null);

  const isPasswordValid = password.length >= 8;
  const isConfirmPasswordValid = password === confirmPassword;
  const areInputsValid = isPasswordValid && isConfirmPasswordValid;
  const hints = `${
    isPasswordValid ? '' : 'Please use a password of at least 8 characters.'
  } ${isConfirmPasswordValid ? '' : 'Passwords do not match.'}`;

  return (
    <ScrollableScreen
      configs={[
        scrollableScreenElement({
          key: 'link-details',
          render: () => (
            <ViewWithBackground style={styles.element}>
              <PasswordResetLinkDetails
                details={data?.resetPasswordLinkDetails}
                error={detailsError}
                loading={detailsLoading}
              />
            </ViewWithBackground>
          ),
        }),
        scrollableScreenElement({
          key: 'password',
          render: () => (
            <ViewWithBackground style={styles.element}>
              <TextInput
                autoComplete="password"
                autoFocus={true}
                label="Password"
                onSubmitEditing={() => {
                  confirmPasswordRef.current?.focus();
                }}
                ref={(ref) => {
                  passwordRef.current = ref;
                }}
                returnKeyType="next"
                setValue={(value: string) =>
                  !resetLoading && setPassword(value)
                }
                value={password}
              />
            </ViewWithBackground>
          ),
        }),
        scrollableScreenElement({
          key: 'confirmPassword',
          render: () => (
            <ViewWithBackground style={styles.element}>
              <TextInput
                autoComplete="password"
                autoFocus={false}
                label="Confirm Password"
                onSubmitEditing={() => {
                  if (areInputsValid) {
                    saveNewPassword();
                  }
                }}
                ref={(ref) => {
                  confirmPasswordRef.current = ref;
                }}
                returnKeyType="go"
                setValue={(value: string) =>
                  !resetLoading && setConfirmPassword(value)
                }
                value={confirmPassword}
              />
            </ViewWithBackground>
          ),
        }),
        scrollableScreenElement({
          key: 'save-new-password-button',
          render: () => (
            <ViewWithBackground style={[styles.element, styles.button]}>
              <Button
                disabled={!areInputsValid}
                loading={resetLoading}
                mode="contained"
                onPress={saveNewPassword}
              >
                Save New Password
              </Button>
              <Paragraph>{hints}</Paragraph>
            </ViewWithBackground>
          ),
        }),
        scrollableScreenElement({
          key: 'reset-error',
          render: () => (
            <ViewWithBackground style={styles.element}>
              <ErrorNotice
                error={resetError}
                manualChange={
                  'create a password reset link' +
                  (emailAddress ? ' for ' + emailAddress : '')
                }
                whenTryingToDoWhat="send you a password reset email"
              />
            </ViewWithBackground>
          ),
        }),
      ]}
    />
  );

  async function saveNewPassword(): Promise<void> {
    const { data } = await runResetPasswordMutation({
      variables: { password, token },
    });
    const message = data?.resetPassword;
    if (message != null) {
      navigation.push('Login', {
        email: emailAddress ?? '',
        message,
      });
    }
  }
}

const RESET_PASSWORD_LINK_DETAILS_QUERY = gql`
  query ResetPasswordLinkDetailsQuery($token: String!) {
    resetPasswordLinkDetails(token: $token) {
      emailAddress
      expiration_time
      is_valid
    }
  }
`;

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPasswordMutation($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password)
  }
`;

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
  },
  container: {
    marginHorizontal: 20,
  },
  element: {
    marginHorizontal: 8,
  },
});
