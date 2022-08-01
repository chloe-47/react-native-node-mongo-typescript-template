import { initErrorLogging } from 'src/client/error/initErrorLogging';

initErrorLogging();

export function ErrorBoundary({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  // TODO - Implement error boundary
  return children;
  //   FallbackComponent={({ error, info }) => {
  //     return (
  //       <ErrorNotice
  //         error={new ApolloError({ clientErrors: [error], extraInfo: info })}
  //         whenTryingToDoWhat="load this module"
  //       />
  //     );
  //   }}
  // >
}
