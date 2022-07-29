import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card as PaperCard } from 'react-native-paper';
import { useColorScheme } from 'src/client/colors';
import { ChildrenPropsType } from 'src/client/utils/ChildrenPropsType';

export function StyledCard({ children }: ChildrenPropsType): JSX.Element {
  const theme = useColorScheme();
  return (
    <PaperCard
      elevation={4}
      style={[styles.card, theme === 'light' ? styles.light : styles.dark]}
    >
      {children}
    </PaperCard>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'stretch',
    margin: 10,
  },
  dark: { backgroundColor: '#222' },
  light: {},
});
