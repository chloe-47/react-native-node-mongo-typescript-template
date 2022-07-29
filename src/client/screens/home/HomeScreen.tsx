import * as React from 'react';
import { ScrollableScreen } from 'src/client/components/scrollable_screen/ScrollableScreen';
import { scrollableScreenElement } from 'src/client/components/scrollable_screen/scrollableScreenElement';
import Text from 'src/client/components/Text';

export function HomeScreen(): JSX.Element {
  return (
    <ScrollableScreen
      configs={[
        scrollableScreenElement({
          key: 'HomeFilters',
          render: () => (
            <Text style={{ textAlign: 'center' }}>
              Welcome! This is the HomeScreen.
            </Text>
          ),
        }),
      ]}
    />
  );
}
