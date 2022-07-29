import passport from 'passport';
import { analytics } from 'src/server/analytics';
import type { CurrentUserPayload } from 'src/server/user/UserGraphQLTypes';
import { CurrentUserGraphQLType } from 'src/server/user/UserGraphQLTypes';
import { UserModel } from 'src/server/user/UserModel';

async function registerResolver(
  _: unknown,
  {
    emailAddress: emailAddress_,
    password,
  }: { emailAddress: string; password: string },
  req: Express.Request,
): Promise<CurrentUserPayload> {
  const emailAddress = emailAddress_.toLowerCase();

  // Passport expects these to be in the request body, not in
  // the GraphQL argument payload.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (req as any).body.emailAddress = emailAddress;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (req as any).body.password = password;
  return await new Promise((resolve, reject) => {
    passport.authenticate('local', async (err, existingUser, _info) => {
      if (err) {
        return reject(err);
      }

      if (existingUser) {
        throw new Error('User already exists');
      }
      const user = await UserModel.register(
        {
          displayName: 'No Name',
          emailAddress,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
        password,
      );
      analytics.track({
        event: 'Create Account',
        user,
      });
      req.logIn(user, function (err) {
        if (err) {
          return reject(err);
        }
        return resolve({
          user,
        });
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })(req, (req as any).response, (req as any).next);
  });
}

export const register = {
  args: {
    password: 'String!',
    emailAddress: 'String!',
  },
  resolve: registerResolver,
  type: CurrentUserGraphQLType,
};
