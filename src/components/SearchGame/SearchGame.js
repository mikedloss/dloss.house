import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import axios from 'axios';
import { Flex, Box, Button, Text, Heading } from 'rebass';

import * as Styles from './SearchGame.style';
import * as Media from '../Elements/media';

export const SearchGame = () => {
  const [query, setQuery] = useState('Scythe');
  const [url, setUrl] = useState(`/.netlify/functions/searchGame?query=`);
  const [initialized, setInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState({ games: [] });
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      setResults({ games: [] });

      if (initialized) {
        try {
          const result = await axios(url);
          setResults(result.data);
        } catch (error) {
          setIsLoading(false);
          setIsError(true);
          setErrorMessage(error.response.data.replace('Function invocation failed: ', ''));
        }
      }

      setIsLoading(false);
    };

    searchInputRef.current.focus();
    fetchData();
  }, [url]);

  return (
    <Flex flexDirection="column">
      <form
        onSubmit={e => {
          e.preventDefault();
          setUrl(`/.netlify/functions/searchGame?query=${query}`);
        }}
        style={{ margin: 0 }}
      >
        <Flex flexDirection={['column', 'row']} width="100%">
          <Box width={['100%', '70%']}>
            <Styles.InputField
              ref={searchInputRef}
              type="text"
              width="100%"
              p="0.5rem"
              placeholder="Scythe"
              onChange={e => {
                setInitialized(true);
                setQuery(e.target.value);
              }}
            />
          </Box>
          <Media.SmallOnly>
            <Text color="grey" fontSize={1} mb="0.5rem">
              Search for a boardgame from Board Game Geek
            </Text>
          </Media.SmallOnly>
          <Box width={['100%', '30%']} ml={[null, '0.5rem']}>
            <Button type="submit" width="100%" variant="default">
              Search
            </Button>
          </Box>
        </Flex>
      </form>
      <Media.NotSmall>
        <Text color="grey" fontSize={1}>
          Search for a boardgame from Board Game Geek
        </Text>
      </Media.NotSmall>
      <Box mt="2rem" className="something">
        {isLoading ? (
          <Text>Loading...</Text>
        ) : initialized && results.games.length ? (
          <Box>
            <Heading color="black" mb="0.5rem">
              Search Results for{' '}
              <Text as="span" color="alternate">
                {url.replace('/.netlify/functions/searchGame?query=', '')}
              </Text>{' '}
              ({results.games.length} games)
            </Heading>
            {results.games.map(game => (
              <Link to={`/boardgames/add?id=${game.id}`} state={{ ...game }} key={game.id}>
                <Styles.GameResult color="black" p="0.5rem">
                  {game.title}{' '}
                  <Text as="span" fontSize={0} color="grey">
                    {game.id}
                  </Text>
                </Styles.GameResult>
              </Link>
            ))}
          </Box>
        ) : null}
        {isError && <Text>{errorMessage}</Text>}
      </Box>
    </Flex>
  );
};
