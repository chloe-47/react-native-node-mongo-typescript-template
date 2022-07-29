import getDomainAndProtocol from 'src/server/urls/getDomainAndProtocol';
import { PASSWORD_RESET_PATH } from 'src/shared/urls/PASSWORD_RESET_PATH';
import { TOKEN_URL_PARAM } from 'src/shared/urls/TOKEN_URL_PARAM';

export default function aidRequestNotificationSettingsUrl(
  token: string,
): string {
  return `${getDomainAndProtocol()}/${PASSWORD_RESET_PATH}?${TOKEN_URL_PARAM}=${token}`;
}
