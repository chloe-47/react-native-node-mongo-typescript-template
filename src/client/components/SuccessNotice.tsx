import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useColor } from 'src/client/colors';
import { Text } from 'src/client/components/Text';
import { ViewWithBackground } from 'src/client/components/ViewWithBackground';

type Props = Readonly<{
  text: string | undefined;
}>;

export function SuccessNotice({ text }: Props) {
  if (text == null) {
    return null;
  }
  const backgroundColor = useColor('successNotice');
  return (
    <ViewWithBackground style={[styles.container, { backgroundColor }]}>
      <Text>{text}</Text>
    </ViewWithBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
  },
});
