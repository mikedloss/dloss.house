import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, Box } from 'rebass';

export const Footer = () => {
  const [dogLink, setDogLink] = useState("https://images.dog.ceo/breeds/shiba/shiba-12.jpg")

  useEffect(() => {
    const fetchDog = async () => {
      try {
        const result = await axios('https://dog.ceo/api/breeds/image/random')
        setDogLink(result.data.message);
      } catch (error) {
        console.error('no doggo')
      }
    }

    fetchDog();
  }, [])

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
