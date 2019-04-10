import * as React from 'react';
import { Link, graphql } from 'gatsby';
import { Flex, Heading, Text, Box } from 'rebass';
import dayjs from 'dayjs';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Layout from '../components/Layout';

const ArticleTemplate = ({ data: { article } }) => {
  return (
    <Layout>
      <Flex flexDirection="column" alignItems="flex-start">
        <Link to="/info">
          <Heading fontSize={2} mb="0.5rem">
            ← Return to all info
          </Heading>
        </Link>
        <Box width="100%">
          <hr />
        </Box>
        <Box>
          <Heading fontSize={6} mb="1rem">{ article.title }</Heading>
          { documentToReactComponents(JSON.parse(article.content.content)) }
          <Text fontSize={0}>Last updated on {dayjs(article.updatedAt).format('MMMM DD, YYYY')}</Text>
        </Box>
      </Flex>
      
    </Layout>
  );
};

export default ArticleTemplate;

export const pageQuery = graphql`
  query ArticleById($id: String) {
    article: contentfulInfo(id: { eq: $id }) {
      title
      content {
        content
      }
      updatedAt
    }
  }
`;
