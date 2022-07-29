import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import type { ChildrenPropsType } from 'src/client/utils/ChildrenPropsType';

export function FullWidthElementWithPadding({
  children,
}: ChildrenPropsType): JSX.Element {
  return <View style={styles.outer}>{children}</View>;
}

const styles = StyleSheet.create({
  outer: {
    margin: 8,
  },
});
