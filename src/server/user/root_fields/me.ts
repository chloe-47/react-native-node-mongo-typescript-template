import { UserGraphQLType } from 'src/server/user/UserGraphQLTypes';

async function meResolver(
  _: unknown,
  _args: Record<string, never>,
  req: Express.Request,
): Promise<Express.User | undefined> {
  const user = req.user;
  if (user == null) {
    return undefined;
  }
  return user;
}

export const me = {
  resolve: meResolver,
  type: UserGraphQLType,
};
