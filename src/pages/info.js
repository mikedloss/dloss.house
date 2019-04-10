import React from 'react';
import { Link, graphql } from 'gatsby';
import { Flex, Box, Heading, Text } from 'rebass';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default props => {
  const { info } = props.data.allContentfulInfo;
  return (
    <Layout>
      <SEO title="Games" keywords={[`gatsby`, `application`, `react`]} />
      <Flex flexDirection="column" alignItems={["flex-start", "center"]}>
        <Box mb="1rem">
          <Heading>Info about the <span role="img" aria-label="house">🏠</span></Heading>
        </Box>
        <Box width={["100%", 0]}>
          <hr />
        </Box>
        {info.map(({ article }, index) => (
          <Link key={index} to={`/info/${article.slug}`}>
            <Text>{article.title}</Text>
          </Link>
        ))}
      </Flex>
    </Layout>
  );
};

export const pageQuery = graphql`
  {
    allContentfulInfo {
      info: edges {
        article: node {
          title
          slug
        }
      }
    }
  }
`;
