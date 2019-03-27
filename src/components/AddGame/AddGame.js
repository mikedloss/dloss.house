import React, { useState, useEffect } from 'react';
import { Flex, Text, Heading, Box } from 'rebass';
import { navigate } from 'gatsby';
import axios from 'axios';
import Confetti from 'react-dom-confetti';

import Confirmation from './components/Confirmation';
import GameProfile from '../GameProfile';

export const AddGame = ({ query }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [game, setGame] = useState({});
  const [error, setError] = useState({ error: false, errorMessage: '' });
  const [waitMessage, setWaitMessage] = useState({ display: false, confirmed: false, message: '', subMessage: '' });

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
          confirmed: true,
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

  const noWayJose = () => {
    navigate('/boardgames/search');
  }

  return isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <>
      <Flex alignItems="center" justifyContent="center" width="100%">
        <Confetti active={waitMessage.confirmed} config={confettiConfig} />
      </Flex>
      {waitMessage.display ? (
        <Flex flexDirection="column" alignItems="center" justifyContent="center" mb="0.5rem" mx="auto">
          <Heading>{waitMessage.message}</Heading>
          <Text fontSize={2}>{waitMessage.subMessage}</Text>
        </Flex>
      ) : (
        <Confirmation yes={addGame} no={noWayJose} />
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

const confettiConfig = {
  angle: 90,
  spread: 45,
  startVelocity: 45,
  elementCount: '150',
  dragFriction: 0.1,
  duration: 5000,
  delay: 0,
  width: '1rem',
  height: '1rem',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
};
