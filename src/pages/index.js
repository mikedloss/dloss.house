import React from 'react';
import { Link } from 'gatsby';
import { Flex, Box, Heading, Text } from 'rebass';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Box>
        <Heading>Welcome</Heading>
        <Text>Tap an icon below</Text>
      </Box>
      <Flex flexDirection={['column', 'row']} alignItems="center" justifyContent="center">
        <Box>
          <Text fontSize={8}>
            <Link to="/boardgames">
              <span role="img" aria-label="dice">
                🎲
              </span>
            </Link>
          </Text>
          <Text fontSize={8}>
            <span role="img" aria-label="pizza">
              🍕
            </span>
          </Text>
          <Text fontSize={3}>
            <span role="img" aria-label="house">
              🏠
            </span>
          </Text>
          <Text fontSize={3}>
            <Link to="/boardgames">
              <span role="img" aria-label="clown">
                🤡
              </span>
            </Link>
          </Text>
        </Box>
      </Flex>
    </Flex>
  </Layout>
);
