import * as React from 'react';
import { EndOfListSpacer } from 'src/client/components/EndOfListSpacer';
import { RequireLoggedInScreen } from 'src/client/components/RequireLoggedInScreen';
import { ScrollableScreen } from 'src/client/components/scrollable_screen/ScrollableScreen';
import { scrollableScreenElement } from 'src/client/components/scrollable_screen/scrollableScreenElement';
import { AttributionCard } from 'src/client/screens/menu/cards/AttributionCard';
import { FeedbackCard } from 'src/client/screens/menu/cards/FeedbackCard';
import { YourAccountMenuCard } from 'src/client/screens/menu/cards/YourAccountMenuCard';

export function MenuScreen(): JSX.Element {
  return (
    <RequireLoggedInScreen>
      <ScrollableScreen
        configs={[
          scrollableScreenElement({
            key: 'YourAccountMenuCard',
            render: () => <YourAccountMenuCard />,
          }),
          scrollableScreenElement({
            key: 'FeedbackCard',
            render: () => <FeedbackCard />,
          }),
          scrollableScreenElement({
            key: 'AttributionCard',
            render: () => <AttributionCard />,
          }),
          scrollableScreenElement({
            key: 'EndOfListSpacer',
            render: () => <EndOfListSpacer />,
          }),
        ]}
      ></ScrollableScreen>
    </RequireLoggedInScreen>
  );
}
