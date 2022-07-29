import * as React from 'react';
import { Linking, Text } from 'react-native';
import { useColor } from 'src/client/colors';
import { createEmailLink, Props } from 'src/client/email_link/createEmailLink';
import getEmailAddress from 'src/shared/urls/getEmailAddress';

export function EmailLink(props: Props): JSX.Element {
  const linkColor = useColor({
    dark: '#2f95dc',
    light: '#2f95dc',
  });
  return (
    <Text
      onPress={() => Linking.openURL(createEmailLink(props))}
      style={{ color: linkColor }}
    >
      {getEmailAddress(props)}
    </Text>
  );
}
