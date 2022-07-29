import getDomain from 'src/server/urls/getDomain';
import getProtocol from 'src/server/urls/getProtocol';

export default function getDomainAndProtocol(): string {
  return getProtocol() + getDomain();
}
