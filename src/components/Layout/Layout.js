import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import Header from '../Header';
import Footer from '../Footer';

import GlobalStyle from '../../global.css';
import theme from '../Elements/theme';
import * as Styles from './Layout.styles';

export const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <Header />
      <Styles.Content>
        {children}
        <Footer />
      </Styles.Content>
    </>
  </ThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
