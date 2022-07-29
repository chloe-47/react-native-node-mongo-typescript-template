import type { ObjectTypeComposerFieldConfigAsObjectDefinition } from 'graphql-compose';
import { assertLoggedIn } from 'src/server/assertLoggedIn';
import { UserModel } from 'src/server/user/UserModel';

async function emailAddressResolver(
  { _id: userID }: Express.User,
  _args: Record<string, never>,
  req: Express.Request,
): Promise<string> {
  const viewer = assertLoggedIn(req, 'emailAddress');
  const user = await UserModel.findById(userID);
  if (user == null) {
    throw new Error('User not found');
  }
  if (!viewer._id.equals(user._id)) {
    throw new Error("You cannot load another user's emailAddress");
  }
  return user.emailAddress;
}

export const emailAddress: ObjectTypeComposerFieldConfigAsObjectDefinition<
  Express.User,
  Express.Request,
  Record<string, never>
> = {
  resolve: emailAddressResolver,
  type: 'String!',
};
