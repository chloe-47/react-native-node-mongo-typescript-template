import { gql, useQuery } from '@apollo/client';
import * as React from 'react';
import type { LoadingType } from 'src/client/loading';
import { Loading } from 'src/client/loading';
import { createStore, useStore } from 'src/client/store';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { graphqlClient } from 'src/client/graphql/graphqlClient';
import type { ViewerQuery } from 'src/client/__generated__/ViewerQuery';
import { RootStackParamList } from './navigation/NavigationTypes';

export const ViewerStore = createStore<Viewer>(Loading);

export type LoggedInViewer = Readonly<{
  displayName: string;
  id: string;
  emailAddress: string;
}>;

export type OtherUser = {
  id: string;
  displayName: string;
};

export type LoggedOutViewer = undefined;

export type LoadingViewer = LoadingType;

export type Viewer = LoggedInViewer | LoggedOutViewer | LoadingViewer;

type Handler<TContext extends Viewer> = (
  viewer: TContext,
  goToMain: () => void,
) => Promise<void>;

type Handlers = Readonly<{
  loggedIn?: Handler<LoggedInViewer>;
  loggedOut?: Handler<LoggedOutViewer>;
}>;

const VIEWER_QUERY = gql`
  query ViewerQuery {
    me {
      _id
      emailAddress
      displayName
    }
  }
`;

export function useLoadViewer(): void {
  const { data, loading } = useQuery<ViewerQuery>(VIEWER_QUERY);
  const emailAddress = data?.me?.emailAddress;
  const id = data?.me?._id;
  const displayName = data?.me?.displayName || emailAddress;
  const viewer = React.useMemo((): Viewer => {
    if (loading) {
      return Loading;
    } else if (emailAddress == null || id == null || displayName == null) {
      return undefined;
    } else {
      return {
        displayName,
        id,
        emailAddress,
      };
    }
  }, [emailAddress, loading, id]);
  React.useEffect(() => {
    ViewerStore.update(viewer);
  }, [viewer]);
}

export async function reloadViewer(): Promise<void> {
  await graphqlClient.refetchQueries({ include: ['ViewerQuery'] });
}

export function useViewer(): Viewer {
  return useStore(ViewerStore);
}

export function useLoggedInViewer(): LoggedInViewer {
  const viewer = useViewer();
  if (viewer === undefined || viewer === Loading) {
    throw new Error('Only call useLoggedInViewer when the viewer is logged in');
  }
  return viewer;
}

export function useLoggedInViewerID(): string {
  const viewer = useLoggedInViewer();
  return viewer.id;
}

export function useViewerEmailAddress(): string {
  const { emailAddress } = useLoggedInViewer();
  return emailAddress;
}

export function useIsLoadingLoggedInStatus(): boolean {
  const viewer = useViewer();
  return viewer === Loading;
}

export function useIsLoggedOut(): boolean {
  const viewer = useViewer();
  return viewer === undefined;
}

export function useEncodedViewerForErrorReporting(): string {
  const viewer = useViewer();
  if (viewer === undefined) {
    return 'undefined';
  } else if (viewer === Loading) {
    return 'loading';
  } else {
    return viewer.id;
  }
}

export function useHandleViewer<Screen extends keyof RootStackParamList>(
  navigation: NativeStackNavigationProp<RootStackParamList, Screen>,
  screenKey: Screen,
  handlers: Handlers,
  dependencies?: ReadonlyArray<unknown>,
): void {
  const viewer = useViewer();
  React.useEffect(() => {
    handleUpdate();
    navigation.addListener('focus', handleUpdate);
    return () => navigation.removeListener('focus', handleUpdate);

    function handleUpdate(): void {
      setTimeout(() => {
        if (!navigation.isFocused()) {
          // This screen is not focused
          return;
        }
        if (viewer === Loading) {
          // Don't do anything if context is still loading
          return;
        }
        if (viewer !== undefined) {
          handlers.loggedIn?.(viewer, goToMain);
        } else {
          handlers.loggedOut?.(viewer as undefined, goToMain);
        }
      }, 250);
    }

    function goToMain(): void {
      navigation.canGoBack() ? navigation.goBack() : navigation.replace('Main');
    }
  }, [screenKey, navigation, handlers, viewer, ...(dependencies ?? [])]);
}
