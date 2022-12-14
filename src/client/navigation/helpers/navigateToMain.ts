import { RootNavigationStore } from 'src/client/root/RootNavigationStore';

export function navigateToMain(): void {
  const navigation = RootNavigationStore.getValue();
  navigation?.canGoBack() ? navigation?.goBack() : navigation?.replace('Main');
}
