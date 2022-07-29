import { analytics } from 'src/server/analytics';
import type { CurrentUserPayload } from 'src/server/user/UserGraphQLTypes';
import { CurrentUserGraphQLType } from 'src/server/user/UserGraphQLTypes';

async function logoutResolver(
  _: unknown,
  _args: Record<string, never>,
  req: Express.Request,
): Promise<CurrentUserPayload> {
  const user = req.user;
  if (user != null) {
    analytics.track({
      event: 'Logged Out',
      user,
    });
  }
  await new Promise((done) => req.logout({ keepSessionInfo: false }, done));
  return { user: undefined };
}

export const logout = {
  resolve: logoutResolver,
  type: CurrentUserGraphQLType,
};
