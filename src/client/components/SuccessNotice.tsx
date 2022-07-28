import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useColor } from 'src/client/colors';
import Text from 'src/client/components/Text';
import View from 'src/client/components/ViewWithBackground';

type Props = {
  text: string | undefined;
};

export function SuccessNotice({ text }: Props) {
  if (text == null) {
    return null;
  }
  const backgroundColor = useColor('successNotice');
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text>{text}</Text>
    </View>
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
