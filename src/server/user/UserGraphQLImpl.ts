import { changeName } from 'src/server/user/mutations/changeName';
import { login } from 'src/server/user/mutations/login';
import { logout } from 'src/server/user/mutations/logout';
import { register } from 'src/server/user/mutations/register';
import { resetPassword } from 'src/server/user/mutations/resetPassword';
import { sendPasswordResetEmail } from 'src/server/user/mutations/sendPasswordResetEmail';
import { emailAddress } from 'src/server/user/object_fields/emailAddress';
import { me } from 'src/server/user/root_fields/me';
import { resetPasswordLinkDetails } from 'src/server/user/root_fields/resetPasswordLinkDetails';
import { UserGraphQLType } from 'src/server/user/UserGraphQLTypes';

UserGraphQLType.addFields({
  emailAddress,
});

export const User = {
  MutationFields: {
    changeName,
    login,
    logout,
    register,
    resetPassword,
    sendPasswordResetEmail,
  },
  QueryFields: {
    me,
    resetPasswordLinkDetails,
  },
};
