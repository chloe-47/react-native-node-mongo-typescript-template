import { ApolloError, gql } from '@apollo/client';
import * as React from 'react';
import {
  CreateErrorReportMutation,
  CreateErrorReportMutationVariables,
} from 'src/client/error/__generated__/CreateErrorReportMutation';
import { graphqlClient } from 'src/client/graphql/graphqlClient';
import useErrorReport from './useErrorReport';

export function useMaybeMinifiedErrorReport(arg: ApolloError | ApolloError[]): {
  errorMessage: string;
  debugInfo: string;
} {
  const { errorMessage, rawDebugInfo: rawValue } = useErrorReport(arg);

  const [minifiedValue, setMinifiedValue] = React.useState<string | undefined>(
    undefined,
  );

  React.useEffect(() => {
    setMinifiedValue(undefined);
    uploadErrorReport(rawValue).then(({ minifiedValue }) =>
      setMinifiedValue(minifiedValue),
    );
  }, [rawValue]);

  return {
    debugInfo: minifiedValue ?? rawValue,
    errorMessage,
  };
}

type Result = {
  uploadedSuccessfully: boolean;
  value: string;
  minifiedValue: string | undefined;
};

async function uploadErrorReport(rawErrorReport: string): Promise<Result> {
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
