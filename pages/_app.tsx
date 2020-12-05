import { AppProps } from 'next/app';
import { Container, ChakraProvider } from '@chakra-ui/react';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';

import { Header } from '../components/Header';
import '../styles/global.scss';

const queryCache = new QueryCache();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <ChakraProvider>
        <Header />
        <Container maxWidth="1200px" marginY="1rem">
          <Component {...pageProps} />
        </Container>
      </ChakraProvider>
    </ReactQueryCacheProvider>
  );
};

export default MyApp;
