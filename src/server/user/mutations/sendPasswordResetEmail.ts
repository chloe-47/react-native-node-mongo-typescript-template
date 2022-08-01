import { encrypt } from 'src/server/crypto/encryption';
import { sendEmail } from 'src/server/email/sendEmail';
import { passwordResetUrl } from 'src/server/urls/passwordResetUrl';
import { UserModel } from 'src/server/user/UserModel';
import { wait } from 'src/server/wait';

async function sendPasswordResetEmailResolver(
  _: unknown,
  { emailAddress }: { emailAddress: string },
  _req: Express.Request,
): Promise<string> {
  if (!emailAddress.trim()) {
    return 'Please enter your email address in the box above.';
  }
  const user = await UserModel.findOne({ emailAddress });
  if (user != null) {
    const expireTime = Math.ceil(new Date().getTime() / 1000) + 3600;
    const userID = user._id.toString();
    const token = encrypt(`${expireTime}.${userID}`);
    await sendEmail({
      recipient: user,
      templateID: 'PASSWORD_RESET_EMAIL_TEMPLATE_ID',
      templateProps: {
        password_reset_url: passwordResetUrl(token),
      },
      fromEmailUser: 'password-reset',
    });
  }

  // Wait a couple seconds for the email to send
  await wait({ ms: 2500 }, { loggingTag: 'sendPasswordResetEmail' });

  return `If ${emailAddress} is a valid email address and is associated with an account, we emailed a password reset link to that address. Please check your email to continue.`;
}

export const sendPasswordResetEmail = {
  args: {
    emailAddress: 'String!',
  },
  resolve: sendPasswordResetEmailResolver,
  type: 'String!',
};
