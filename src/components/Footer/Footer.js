import React from 'react';
import { Text, Box } from 'rebass';

export const Footer = () => {
  return (
    <Box mt="1rem" width="100%">
      <Text fontSize={1}>
        mike made this{' '}
        <span role="img" aria-label="puppy face">
          🐶
        </span>
      </Text>
    </Box>
  );
};
