import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import styles from './styles';
import Button from './components/button';

const colors = {
  brand: {
    900: '#180f04',
    800: '#472e0c',
    700: '#774e14',
    600: '#a66d1c',
    500: '#ED9B28',
    400: '#ED9B28',
    300: '#f1af53',
    200: '#f4c37e',
    100: '#f8d7a9',
    50: '#fdf5ea',
  },
};

export default extendTheme(
  {
    colors,
    styles,
    components: {
      Button,
    },
  },
  withDefaultColorScheme({ colorScheme: 'brand' }),
);
