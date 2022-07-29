import { gql } from '@apollo/client';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Paragraph, ProgressBar } from 'react-native-paper';
import InlineEditableText from 'src/client/components/InlineEditableText';
import { StyledCard } from 'src/client/components/StyledCard';
import Text from 'src/client/components/Text';
import { ErrorNotice } from 'src/client/error/ErrorNotice';
import resetCache from 'src/client/graphql/resetCache';
import useMutateWithToast from 'src/client/graphql/useMutateWithToast';
import { LogoutAction } from 'src/client/screens/menu/components/LogoutAction';
import { useLoggedInViewer } from 'src/client/viewer';
import {
  ChangeNameMutation,
  ChangeNameMutationVariables,
} from './__generated__/ChangeNameMutation';

export function YourAccountMenuCard(): React.ReactElement {
  const viewer = useLoggedInViewer();
  const { mutate, loading, error } = useMutateWithToast<
    ChangeNameMutation,
    ChangeNameMutationVariables
  >({
    errorMessage: 'Unable to update your name',
    mutation: CHANGE_NAME_MUTATION,
    onSuccess: resetCache,
    successMessage: 'Successfully updated your name',
  });
  return (
    <StyledCard>
      <Card.Title title="Your Account" />
      <ProgressBar indeterminate={true} visible={loading} />
      <Card.Content>
        <Text style={styles.fieldHeader}>Name</Text>
        <InlineEditableText
          save={save}
          style={styles.rowTitle}
          value={viewer.displayName}
        />
        <ErrorNotice
          error={error}
          manualChange={`Change name to ${viewer.displayName}`}
          whenTryingToDoWhat="change your name"
        />
        <Paragraph>
          The email address for your account is {viewer.emailAddress}.
        </Paragraph>
      </Card.Content>
      <Card.Actions>
        <LogoutAction />
      </Card.Actions>
    </StyledCard>
  );

  async function save(displayName: string): Promise<void> {
    if (displayName) {
      await mutate({ displayName });
    }
  }
}

export const CHANGE_NAME_MUTATION = gql`
  mutation ChangeNameMutation($displayName: String!) {
    payload: changeName(displayName: $displayName) {
      _id
      displayName
    }
  }
`;

const styles = StyleSheet.create({
  fieldHeader: {
    fontSize: 12,
    opacity: 0.6,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
});
