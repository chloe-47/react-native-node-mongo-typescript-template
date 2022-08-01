import * as React from 'react';
import { View as ReactNativeView } from 'react-native';
import { useColor } from 'src/client/colors';

export type ViewProps = ReactNativeView['props'];

export function ViewWithBackground(props: ViewProps) {
  const { style, ...otherProps } = props;
  const backgroundColor = useColor('background');

  return (
    <ReactNativeView style={[{ backgroundColor }, style]} {...otherProps} />
  );
}
