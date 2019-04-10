import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import axios from 'axios';
import { Box, Text, Heading, Flex } from 'rebass';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

const NotFoundPage = () => {
  const [dogLink, setDogLink] = useState();

  useEffect(() => {
    const fetchDog = async () => {
      try {
        const result = await axios('https://random.dog/woof.json?filter=mp4,webm,m4a,3gp,wmv,avi');
        setDogLink(result.data.url);
      } catch (error) {
        console.error('no doggo');
      }
    };

    fetchDog();
  }, []);

  return (
    <Layout>
      <SEO title="404: Not found" />
      <Flex flexDirection="column" alignItems="center">
        <Heading fontSize={6}>NOT FOUND</Heading>
        <Box>
          <Text>You went somewhere that doesn't exist.</Text>
        </Box>
        {dogLink && (
          <Flex flexDirection="column" alignItems="center" width="400px">
            <Text>Will this picture cheer you up?</Text>
            <img src={dogLink} alt="a picture of a dog" />
          </Flex>
        )}
        <Box mt="1rem">
          <Link to="/">
            <Text>← Go back home</Text>
          </Link>
        </Box>
      </Flex>
    </Layout>
  );
};

export default NotFoundPage;
