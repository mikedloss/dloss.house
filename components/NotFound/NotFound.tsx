import React from 'react';
import { Center, Text, Image, Flex } from '@chakra-ui/react';

import { usePupper } from '../hooks/usePupper';

export const NotFound: React.FC = ({ children }) => {
  const { url, error } = usePupper();

  console.log(`url`, url);

  return (
    <Center flexDirection="column">
      {children}
      {url ? (
        <Flex flexDirection="column" alignItems="center" marginTop="2rem">
          <Text fontSize="sm">But here's a picture of a doggo</Text>
          <Image alt="doggo" src={url} />
        </Flex>
      ) : (
        <></>
      )}
    </Center>
  );
};
