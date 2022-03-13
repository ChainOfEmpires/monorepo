import { ComponentStyleConfig } from '@chakra-ui/react';

const Button: ComponentStyleConfig = {
  variants: {
    secondary: {
      defaultProps: {
        colorScheme: 'purple',
      },
    },
  },
};

export default Button;
