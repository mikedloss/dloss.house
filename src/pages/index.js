import React from 'react';
import { Link } from 'gatsby';
import { Flex, Box, Heading, Text } from 'rebass';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default () => (
  <Layout>
    <SEO title="Home" keywords={[`dloss`, `games`]} />
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Flex flexDirection="column" alignItems="center" mb="2rem">
        <Heading fontSize={5}>Welcome!</Heading>
        <Text>Here's what is available</Text>
      </Flex>
      <Flex flexDirection="column" alignItems="center" justifyContent="center" width="100%">
        <Box mb="1rem">
          <Link to="/boardgames">
            <Heading fontSize={4}>
              <span role="img" aria-label="dice">
                🎲
              </span>{' '}
              Board Games
            </Heading>
          </Link>
        </Box>
        <Box mb="1rem">
          <Link to="/info">
            <Heading fontSize={4}>
              <span role="img" aria-label="dice">
                ℹ️
              </span>{' '}
              Info
            </Heading>
          </Link>
        </Box>
      </Flex>
    </Flex>
  </Layout>
);
