import * as React from 'react';
import type { SectionRendererData } from 'src/client/components/scrollable_screen/ScrollableScreen';

type Props = {
  render: () => React.ReactElement;
  key: string;
};

export default function singleElement({
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
