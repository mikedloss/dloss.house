import React from 'react';
import { Link } from 'gatsby';
import { Flex, Box, Heading, Text } from 'rebass';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <Box>
        <Heading>Welcome</Heading>
        <Text>Tap an icon below</Text>
      </Box>
      <Flex flexDirection={['column', 'row']} alignItems="center" justifyContent="center">
        <Box>
          <Link to="/boardgames">
            <Text as="span" role="img" aria-label="dice" fontSize="8">
              🎲
            </Text>
          </Link>
        </Box>
      </Flex>
    </Flex>
  </Layout>
);

export default IndexPage;
