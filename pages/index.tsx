import Head from 'next/head';
import Link from 'next/link';
import { Heading, Text, Flex, Divider } from '@chakra-ui/core';

import { links } from '../components/Header';

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Home | dloss🏡</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex flexDirection="column" alignItems="center">
        <Heading>Welcome!</Heading>
        <Text>Here's whats available</Text>
        <Divider m="1.5rem" />
        {links.map((link) => {
          return (
            <Heading size="md" key={link.path}>
              <Link href={link.path}>{link.title}</Link>
            </Heading>
          );
        })}
      </Flex>
    </>
  );
};

export default HomePage;
