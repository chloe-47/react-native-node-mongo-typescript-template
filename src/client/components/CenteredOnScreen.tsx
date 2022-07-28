import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import useViewWidth from 'src/client/components/useViewWidth';
import View from 'src/client/components/ViewWithBackground';
import type { ChildrenPropsType } from '../utils/ChildrenPropsType';

export function CenteredOnScreen({ children }: ChildrenPropsType): JSX.Element {
  const viewWidth = useViewWidth();
  const { width: screenWidth } = useWindowDimensions();

  return (
    <View style={{ alignItems: 'center', width: screenWidth }}>
      <View style={{ width: viewWidth }}>{children}</View>
    </View>
  );
}
