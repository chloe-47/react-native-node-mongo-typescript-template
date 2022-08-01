import * as React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Text } from 'src/client/components/Text';
import { ViewWithBackground } from 'src/client/components/ViewWithBackground';

type Props = Readonly<{
  message?: string;
  progress?: number;
}>;

export function LoadingScreen({ message, progress }: Props) {
  const windowWidth = Dimensions.get('window').width;
  return (
    <ViewWithBackground style={styles.container}>
      {message ? <Text>{message}</Text> : null}
      {progress == null ? (
        <ProgressBar indeterminate={true} />
      ) : (
        <ViewWithBackground
          style={{ marginVertical: 20, minWidth: windowWidth * 0.5 }}
        >
          <ProgressBar progress={progress} />
        </ViewWithBackground>
      )}
    </ViewWithBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
