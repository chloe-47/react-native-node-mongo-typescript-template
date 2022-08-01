import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { LoadingScreen } from 'src/client/components/LoadingScreen';
import { ViewWithBackground } from 'src/client/components/ViewWithBackground';
import { RootStackParamList } from 'src/client/navigation/NavigationTypes';
import { ChildrenPropsType } from 'src/client/utils/ChildrenPropsType';
import {
  useHandleViewer,
  useIsLoadingLoggedInStatus,
  useIsLoggedOut,
} from 'src/client/viewer';

export function RequireLoggedInScreen({
  children,
}: ChildrenPropsType): JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Main'>>();
  const isLoadingLoggedInStatus = useIsLoadingLoggedInStatus();
  const isLoggedOut = useIsLoggedOut();
  useHandleViewer(navigation, 'Main', {
    loggedOut: async () => {
      navigation.push('NotLoggedIn');
    },
  });
  if (isLoadingLoggedInStatus) {
    return <LoadingScreen />;
  }
  if (isLoggedOut) {
    // useHandleViewer (above) will push NotLoggedInScreen
    return <ViewWithBackground />;
  }
  return <>{children}</>;
}
