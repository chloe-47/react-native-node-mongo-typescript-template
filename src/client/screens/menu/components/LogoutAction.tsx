import { gql, useMutation } from '@apollo/client';
import * as React from 'react';
import { ProgressBar } from 'react-native-paper';
import { Button } from 'src/client/components/Button';
import { Text } from 'src/client/components/Text';
import { resetCache } from 'src/client/graphql/resetCache';
import type { LogoutActionMutation } from './__generated__/LogoutActionMutation';

export function LogoutAction(): JSX.Element {
  const [runLogoutMutation, logoutMutationState] =
    useMutation<LogoutActionMutation>(LOGOUT_MUTATION);
  const { loading, error } = logoutMutationState;
  return loading ? (
    <ProgressBar indeterminate={true} />
  ) : (
    <>
      <Button loading={loading} onPress={logout} text="Sign out" />
      {error ? <Text>{error}</Text> : null}
    </>
  );
  async function logout(): Promise<void> {
    await runLogoutMutation({ variables: {} });
    await resetCache();
  }
}

export const LOGOUT_MUTATION = gql`
  mutation LogoutActionMutation {
    logout {
      user {
        emailAddress
      }
    }
  }
`;
