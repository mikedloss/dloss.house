import React, { useState, useEffect } from 'react';
import { Heading, Text, Flex, Box, Button } from 'rebass';
import axios from 'axios';

import GameProfile from '../GameProfile';

export const AddGame = ({ query }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [game, setGame] = useState({});
  const [gameType, setGameType] = useState('');
  const [error, setError] = useState({ error: false, errorMessage: '' });
  const [buttonText, setButtonText] = useState('Add Game');
  const [displayWaitMessage, setDisplayWaitMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const result = await axios(`/.netlify/functions/getGame?id=${query.id}`);
        setGame(result.data);
      } catch (error) {
        console.error('boardgames/add - error', error);
        setError({
          error: true,
          errorMessage: error.response.data.replace('Function invocation failed: ', ''),
        });
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Flex flexDirection={['column', 'row']} alignItems="center" justifyContent="space-between" mb="0.5rem">
        <Heading>Is this the game you want to add?</Heading>
        <Flex flexDirection={['column', 'row']} width={['100%', '50%']}>
          <Button variant="default" width="100%" mr={[0, '1rem']} my={['0.5rem', 0]}>
            Yes it is
          </Button>
          <Button variant="default" width="100%" mb={['0.5rem', 0]}>
            Nah
          </Button>
        </Flex>
      </Flex>
      <hr />
      <GameProfile game={game} />
    </>
  );
};
