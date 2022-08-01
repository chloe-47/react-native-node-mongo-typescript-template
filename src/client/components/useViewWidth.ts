import { useWindowDimensions } from 'react-native';

export function useViewWidth(): number {
  const { width } = useWindowDimensions();
  return Math.min(width, 504);
}
