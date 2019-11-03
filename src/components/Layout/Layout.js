import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';

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
      <Styles.ContentContainer>
        {children}
        <Footer />
      </Styles.ContentContainer>
    </>
  </ThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
