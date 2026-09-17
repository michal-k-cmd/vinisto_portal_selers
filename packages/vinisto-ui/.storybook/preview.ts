import type { Preview } from '@storybook/react';

import '../src/assets/styles/variables.css';
import '../src/assets/styles/bootstrap.min.css'
import 'react-loading-skeleton/dist/skeleton.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
