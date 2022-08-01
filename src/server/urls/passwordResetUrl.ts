import { DOMAIN_AND_PROTOCOL } from 'src/server/urls/DOMAIN_AND_PROTOCOL';
import { PASSWORD_RESET_PATH } from 'src/shared/urls/PASSWORD_RESET_PATH';
import { TOKEN_URL_PARAM } from 'src/shared/urls/TOKEN_URL_PARAM';

const PREFIX = `${DOMAIN_AND_PROTOCOL}/${PASSWORD_RESET_PATH}?${TOKEN_URL_PARAM}=`;

export function passwordResetUrl(token: string): string {
  return PREFIX + token;
}
