import { gql } from '@apollo/client';
import { graphqlClient } from 'src/client/graphql/graphqlClient';
import {
  CreateErrorReportMutation,
  CreateErrorReportMutationVariables,
} from './__generated__/CreateErrorReportMutation';

type Result = Readonly<{
  uploadedSuccessfully: boolean;
  value: string;
  minifiedValue: string | undefined;
}>;

export async function uploadErrorReport(
  rawErrorReport: string,
): Promise<Result> {
  const res = await graphqlClient.mutate<
    CreateErrorReportMutation,
    CreateErrorReportMutationVariables
  >({
    mutation: CREATE_ERROR_REPORT_MUTATION,
    variables: { data: rawErrorReport },
  });
  const value = res?.data?.reportError;
  return {
    minifiedValue: value ?? undefined,
    uploadedSuccessfully: value != null,
    value: value ?? rawErrorReport,
  };
}

const CREATE_ERROR_REPORT_MUTATION = gql`
  mutation CreateErrorReportMutation($data: String!) {
    reportError(data: $data)
  }
`;
