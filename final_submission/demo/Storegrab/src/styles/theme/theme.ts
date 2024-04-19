import { MD3LightTheme as DefaultTheme, configureFonts, useTheme } from 'react-native-paper';
import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import fontConfig from '../fonts';
import ColorPalette from './colorPalette';

const theme = {
  ...DefaultTheme,
  ...NavigationDefaultTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...DefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    ...ColorPalette
  }
};
export type AppTheme = typeof theme;

export const useAppTheme = () => useTheme<AppTheme>();

export default theme;
