import { lighten } from 'polished';

//    0   1   2   3   4   5   6   7   8
// [ 12, 14, 16, 20, 24, 32, 48, 64, 72 ]
export const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 72];

const SMALL = 800;
const MEDIUM = 1040;
const LARGE = 1280;
export const breakpointValues = {
  SMALL,
  MEDIUM,
  LARGE,
};
export const breakpoints = [`${SMALL}px`, `${MEDIUM}px`, `${LARGE}px`];

export const colors = {
  primary: '#FFED4A',
  primaryLight: 'papayawhip',
  primaryLightest: '#FCFBEB',
  alternate: 'palevioletred',
  black: '#22292F',
  white: '#fff',
  realBlack: '#000',
  offWhite: '#f8fafc',
  grey: '#8795a1',
};

export const fonts = {
  body: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  heading:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

export const buttons = {
  default: {
    backgroundColor: colors.alternate,
    transition: 'all 0.2s ease-in-out',
    ':hover': {
      cursor: 'pointer',
      backgroundColor: lighten(0.1, colors.alternate),
    },
  },
  inverse: {
    backgroundColor: colors.white,
    color: colors.alternate,
    transition: 'all 0.2s ease-in-out',
    ':hover': {
      cursor: 'pointer',
      color: colors.white,
      backgroundColor: colors.alternate,
    },
  },
};

export default {
  colors,
  fontSizes,
  fonts,
  breakpoints,
  buttons,
};
