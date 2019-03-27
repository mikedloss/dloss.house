import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, Box } from 'rebass';

export const Footer = () => {
  const [dogLink, setDogLink] = useState('https://random.dog/80a8c758-1ee8-4460-96c6-cb31716a269c.jpg');

  useEffect(() => {
    const fetchDog = async () => {
      try {
        const result = await axios('https://random.dog/woof.json');
        setDogLink(result.data.url);
      } catch (error) {
        console.error('no doggo');
      }
    };

    fetchDog();
  }, []);

  return (
    <Box mt="1rem" width="100%">
      <Text fontSize={1}>
        mike made this{' '}
        <a href={`${dogLink}`} target="_blank" rel="noopener noreferrer">
          <span role="img" aria-label="puppy face">
            🐶
          </span>
        </a>
      </Text>
    </Box>
  );
};
