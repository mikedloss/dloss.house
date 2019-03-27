import React from 'react';
import { Heading, Flex, Button } from 'rebass';

export const Confirmation = ({ yes, no }) => {
  return (
    <Flex flexDirection={['column', 'row']} alignItems="center" justifyContent="space-between" mb="0.5rem">
      <Heading>Is this the game you want to add?</Heading>
      <Flex flexDirection={['column', 'row']} width={['100%', '50%']}>
        <Button variant="default" width="100%" mr={[0, '1rem']} my={['0.5rem', 0]} onClick={yes}>
          Yes it is
        </Button>
        <Button variant="default" width="100%" mb={['0.5rem', 0]} onClick={no}>
          Nah
        </Button>
      </Flex>
    </Flex>
  );
};
