// theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      100: '#f7c6c7',
      900: '#1a202c',
    },
  },
  styles: {
    global: {
      body: {
        fontFamily: 'Arial, sans-serif',
        lineHeight: 'tall',
        bg: 'gray.100',
        color: 'gray.800',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
      sizes: {
        lg: {
          h: '48px',
          fontSize: 'lg',
          px: '32px',
        },
      },
    },
  },
});

export default theme;
