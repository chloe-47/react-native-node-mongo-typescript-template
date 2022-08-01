import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { useColor } from 'src/client/colors';
import { useViewWidth } from 'src/client/components/useViewWidth';
import { ChildrenPropsType } from 'src/client/utils/ChildrenPropsType';

export function Header({ children }: ChildrenPropsType): JSX.Element {
  const viewWidth = useViewWidth();
  const borderBottomColor = useColor('divider');
  const backgroundColor = useColor('background');

  return (
    <Appbar.Header
      style={{
        alignSelf: 'center',
        backgroundColor,
        borderBottomColor,
        borderBottomWidth: 1,
        elevation: 0,
        width: viewWidth,
      }}
    >
      {children}
    </Appbar.Header>
  );
}
