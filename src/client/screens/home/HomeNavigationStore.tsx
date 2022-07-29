import { HomeNavigationAllTypes } from 'src/client/navigation/NavigationTypes';
import { createStore } from 'src/client/store';

const HomeNavigationStore = createStore<HomeNavigationAllTypes | null>(null);

export default HomeNavigationStore;
