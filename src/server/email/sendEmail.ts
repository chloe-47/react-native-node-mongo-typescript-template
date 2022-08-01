import sendgridMail from '@sendgrid/mail';
import { analytics } from 'src/server/analytics';
import { EmailTemplateType } from 'src/server/email/EmailTemplateTypes';
import { envGet } from 'src/shared/env';
import { getEmailAddress } from 'src/shared/urls/getEmailAddress';

const SENDGRID_API_KEY = envGet('SENDGRID_API_KEY', { throwIfNotFound: true });

sendgridMail.setApiKey(SENDGRID_API_KEY);

type Args = EmailTemplateType & {
  recipient: Express.User;
  fromEmailUser: string;
};

export async function sendEmail({
  templateID,
  templateProps,
  recipient,
  fromEmailUser,
}: Args) {
  const from = getEmailAddress({ emailUser: fromEmailUser });
  const templateId = process.env[templateID];
  if (templateId == null) {
    throw new Error('Template ID not defined in .env: ' + templateID);
  }
  analytics.track({
    event: 'Sending Email',
    properties: {
      ...templateProps,
      templateID,
    },
    user: recipient,
  });
  const msg = {
    dynamicTemplateData: templateProps,
    from,
    templateId,
    to: recipient.emailAddress,
  };
  try {
    await sendgridMail.send(msg);
  } catch (e) {
    analytics.track({
      event: 'Send Email Failed',
      properties: {
        errors: tryToGetErrorsFromSendgridResponse(e),
      },
      user: recipient,
    });
    throw e;
  }
}

function tryToGetErrorsFromSendgridResponse(e: unknown): string {
  return JSON.stringify(
    (e as { response: { body: { errors: unknown } } }).response.body.errors,
  );
}
