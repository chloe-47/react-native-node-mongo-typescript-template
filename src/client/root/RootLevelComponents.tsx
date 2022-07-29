// import PinnedInputProvider from 'src/client/global/pinned_input/PinnedInputProvider';
// import DialogProvider from 'src/client/dialog/DialogProvider';
// import DrawerProvider from 'src/client/drawer/DrawerProvider';
import React from 'react';
import ToastProvider from 'src/client/toast/ToastProvider';
import type { ChildrenPropsType } from 'src/client/utils/ChildrenPropsType';
import { useLoadViewer } from 'src/client/viewer';

export default function RootLevelComponents({
  children,
}: ChildrenPropsType): JSX.Element {
  useLoadViewer();
  return (
    // <PinnedInputProvider>
    /* <DialogProvider> */
    <ToastProvider>
      {/* <DrawerProvider> */}
      {children}
      {/* </DrawerProvider> */}
    </ToastProvider>
    // </DialogProvider>
    // </PinnedInputProvider>
  );
}
