import { AppProps } from 'next/app';
import { HouseProvider } from '@dloss/house';

import { Header } from '../components/Header';
import { Box, Center, Container } from '@chakra-ui/core';

import '../styles/global.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <HouseProvider>
      <Header />
      <Container maxWidth="1200px" marginY="1rem">
        <Component {...pageProps} />
      </Container>
    </HouseProvider>
  );
};

export default MyApp;
