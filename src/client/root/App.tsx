import { ApolloProvider } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoadingScreen from 'src/client/components/LoadingScreen';
import ErrorBoundary from 'src/client/error/ErrorBoundary';
import initErrorLogging from 'src/client/error/initErrorLogging';
import { graphqlClient } from 'src/client/graphql/graphqlClient';
import Navigation from 'src/client/navigation/root/RootNavigation';
import RootLevelComponents from 'src/client/root/RootLevelComponents';
import { useLoadPrerenderDependencies } from 'src/client/root/useLoadPrerenderDependencies';
import { useColorScheme } from 'src/client/colors';
import {
  DARK_THEME,
  LIGHT_THEME,
} from 'src/client/theme/ReactNativePaperTheme';

initErrorLogging();

export default function App() {
  const isLoadingComplete = useLoadPrerenderDependencies();
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === 'dark' ? DARK_THEME : LIGHT_THEME;

  if (!isLoadingComplete) {
    return <LoadingScreen />;
  } else {
    return (
      <ErrorBoundary>
        <SafeAreaProvider>
          <PaperProvider theme={paperTheme}>
            <ApolloProvider client={graphqlClient}>
              <RootLevelComponents>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
              </RootLevelComponents>
            </ApolloProvider>
          </PaperProvider>
        </SafeAreaProvider>
      </ErrorBoundary>
    );
  }
}

AppRegistry.registerComponent('react-native-safe-area-context', () => App);
