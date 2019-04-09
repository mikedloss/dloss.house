import React from 'react';
import { Link } from 'gatsby';
import { Flex, Box, Heading, Text } from 'rebass';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Flex flexDirection="column" alignItems="center" mb="2rem">
        <Heading fontSize={5}>Welcome!</Heading>
        <Text>Here's what is available</Text>
      </Flex>
      <Flex flexDirection={['column', 'row']} alignItems="center" justifyContent="center">
        <Box>
          <Link to="/boardgames">
            <Heading fontSize={4}>
              <span role="img" aria-label="dice">
                🎲
              </span>{' '}
              Board Games
            </Heading>
          </Link>
        </Box>
      </Flex>
    </Flex>
  </Layout>
);
