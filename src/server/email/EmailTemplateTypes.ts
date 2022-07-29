export const ALL_EMAIL_TEMPLATE_TYPES = {
  PASSWORD_RESET_EMAIL_TEMPLATE_ID: null,
};

interface EmailTemplateTypeBase {
  templateID: keyof typeof ALL_EMAIL_TEMPLATE_TYPES;
  templateProps: Record<string, string>;
}

interface PasswordResetEmail extends EmailTemplateTypeBase {
  templateID: 'PASSWORD_RESET_EMAIL_TEMPLATE_ID';
  templateProps: {
    password_reset_url: string;
  };
}

export type EmailTemplateType = PasswordResetEmail;
