import React from 'react';
import { Link } from 'gatsby';
import { Flex, Box, Heading, Text } from 'rebass';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

const BoardGamesPage = () => {
  return (
    <Layout>
      <SEO title="Games" keywords={[`gatsby`, `application`, `react`]} />
      <Heading>Board Games</Heading>
    </Layout>
  );
};

export default BoardGamesPage;
