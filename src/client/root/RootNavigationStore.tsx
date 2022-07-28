import { RootNavigationAllTypes } from 'src/client/navigation/NavigationTypes';
import { createStore, useStore } from 'src/client/store';

export const RootNavigationStore = createStore<RootNavigationAllTypes | null>(
  null,
);

export function useEncodedRootNavigationStoreForErrorReporting(): string {
  const navState = useStore(RootNavigationStore)?.getState();
  if (navState == null) {
    return 'null';
  } else {
    return JSON.stringify(navState.routes);
  }
}
