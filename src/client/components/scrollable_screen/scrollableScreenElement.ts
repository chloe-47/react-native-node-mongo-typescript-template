import * as React from 'react';
import type { SectionRendererData } from 'src/client/components/scrollable_screen/ScrollableScreen';

type Props = Readonly<{
  render: () => React.ReactElement;
  key: string;
}>;

export function scrollableScreenElement({
  render,
  key,
}: Props): SectionRendererData {
  return {
    section: {
      data: [
        {
          key,
          render: render,
        },
      ],
      key,
    },
  };
}
