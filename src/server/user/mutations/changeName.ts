import { assertLoggedIn } from 'src/server/assertLoggedIn';
import { UserGraphQLType } from 'src/server/user/UserGraphQLTypes';
import { UserModel } from 'src/server/user/UserModel';

async function changeNameResolver(
  _: unknown,
  { displayName }: { displayName: string },
  req: Express.Request,
): Promise<Express.User | null> {
  if (displayName.length === 0) {
    throw new Error('Name cannot be empty');
  }
  const viewer = assertLoggedIn(req, 'changeName');
  const updated = await UserModel.findByIdAndUpdate(
    viewer._id,
    { displayName },
    { updated: true },
  );
  return updated;
}

export const changeName = {
  args: {
    displayName: 'String!',
  },
  resolve: changeNameResolver,
  type: UserGraphQLType,
};
