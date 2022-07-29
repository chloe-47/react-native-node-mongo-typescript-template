import { schemaComposer } from 'graphql-compose';
import { decrypt } from 'src/server/crypto/encryption';
import { UserModel } from 'src/server/user/UserModel';

const ResetPasswordLinkDetailsGraphQLType =
  schemaComposer.createObjectTC<ResetPasswordLinkDetails>({
    fields: {
      expiration_time: 'Date!',
      is_valid: 'Boolean!',
      emailAddress: 'String!',
    },
    name: 'ResetPasswordLinkDetails',
  });

type ResetPasswordLinkDetails = {
  expiration_time: Date;
  is_valid: boolean;
  emailAddress: string;
};

type Args = {
  token: string;
};

async function resetPasswordLinkDetailsResolver(
  _: unknown,
  { token }: Args,
  _req: Express.Request,
): Promise<ResetPasswordLinkDetails> {
  try {
    const [expireTime, userID] = decrypt(token).split('.');
    const user = await UserModel.findById(userID);
    if (user == null) {
      return {
        expiration_time: new Date(),
        is_valid: false,
        emailAddress: '',
      };
    }
    return {
      expiration_time: new Date(parseInt(expireTime, 10) * 1000),
      is_valid: true,
      emailAddress: user.emailAddress,
    };
  } catch (e) {
    return {
      expiration_time: new Date(),
      is_valid: false,
      emailAddress: '',
    };
  }
}

export const resetPasswordLinkDetails = {
  args: {
    token: 'String!',
  },
  resolve: resetPasswordLinkDetailsResolver,
  type: ResetPasswordLinkDetailsGraphQLType,
};
