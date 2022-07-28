import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import reportError from 'src/client/error/reportError';

export function useLoadPrerenderDependencies(): boolean {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        // Do any preloading here
      } catch (e) {
        reportError(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
