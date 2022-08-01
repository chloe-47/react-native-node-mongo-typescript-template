import { PUBLIC_DNS_DOMAIN } from 'src/shared/urls/PUBLIC_DNS_DOMAIN';

export function getEmailAddress({ emailUser }: { emailUser: string }): string {
  const address = `${emailUser}@${PUBLIC_DNS_DOMAIN}`;
  return address;
}
