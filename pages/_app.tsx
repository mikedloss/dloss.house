import { AppProps } from 'next/app';

import { Header } from '../components/Header';
import { Container, ChakraProvider } from '@chakra-ui/react';

import '../styles/global.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <Header />
      <Container maxWidth="1200px" marginY="1rem">
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  );
};

export default MyApp;
