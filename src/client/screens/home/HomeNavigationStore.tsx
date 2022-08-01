import { HomeNavigationAllTypes } from 'src/client/navigation/NavigationTypes';
import { createStore } from 'src/client/store';

export const HomeNavigationStore = createStore<HomeNavigationAllTypes | null>(
  null,
);
