import { createStore } from 'src/client/store';

export type ToastConfig = Readonly<{
  message: string;
  retry?: null | (() => unknown);
  undo?: null | (() => Promise<void>);
}>;

export const ToastStore = createStore<ToastConfig | undefined>(undefined);
