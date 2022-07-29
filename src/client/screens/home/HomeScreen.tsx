import * as React from 'react';
import { Card } from 'react-native-paper';
import { RequireLoggedInScreen } from 'src/client/components/RequireLoggedInScreen';
import { ScrollableScreen } from 'src/client/components/scrollable_screen/ScrollableScreen';
import { scrollableScreenElement } from 'src/client/components/scrollable_screen/scrollableScreenElement';
import { StyledCard } from 'src/client/components/StyledCard';

export function HomeScreen(): JSX.Element {
  return (
    <RequireLoggedInScreen>
      <ScrollableScreen
        configs={[
          scrollableScreenElement({
            key: 'HomeFilters',
            render: () => (
              <StyledCard>
                <Card.Title title="Welcome! This is the Home Screen." />
              </StyledCard>
            ),
          }),
        ]}
      />
    </RequireLoggedInScreen>
  );
}
