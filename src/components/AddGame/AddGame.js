import React, { useState, useEffect } from 'react';
import { Flex, Text, Heading } from 'rebass';
import { navigate } from 'gatsby';
import axios from 'axios';

import Confirmation from './components/Confirmation';
import GameProfile from '../GameProfile';

export const AddGame = ({ query }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [game, setGame] = useState({});
  const [error, setError] = useState({ error: false, errorMessage: '' });
  const [waitMessage, setWaitMessage] = useState({ display: false, message: '', subMessage: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(`/.netlify/functions/getGame?id=${query.id}`);
        setGame(result.data);
      } catch (error) {
        console.error('boardgames/add - error', error);
        setError({
          error: true,
          errorMessage: error.response.data.replace('Function invocation failed: ', ''),
        });
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchData();
  }, []);

  const addGame = async e => {
    const contentfulGame = buildContentfulObject(game);

    setWaitMessage({ display: true, message: 'Adding game...' });
    try {
      const result = await axios.post(`/.netlify/functions/addGame`, contentfulGame);
      if (result.status === 200) {
        setWaitMessage({
          display: true,
          message: 'Game has been added!',
          subMessage: 'Please refresh in a minute or 2 to see this game in the list 😄',
        });
        setTimeout(() => {
          navigate('/boardgames');
        }, 3000);
      }
    } catch (error) {
      console.error('boardgames/add - Error saving game', error);
    }
  };

  return isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <>
      {waitMessage.display ? (
        <Flex flexDirection="column" alignItems="center" justifyContent="center" mb="0.5rem" mx="auto">
          <Heading>{waitMessage.message}</Heading>
          <Text fontSize={2}>{waitMessage.subMessage}</Text>
        </Flex>
      ) : (
        <Confirmation yes={addGame} />
      )}
      <hr />
      <GameProfile game={game} />
    </>
  );
};

const buildContentfulObject = game => {
  const contentfulFields = {};
  Object.keys(game).forEach(field => {
    contentfulFields[field] = {
      'en-US': game[field],
    };
  });

  return {
    fields: contentfulFields,
  };
};
