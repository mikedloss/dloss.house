import React, { useState } from 'react';
import { Link } from 'gatsby';
import { Heading, Button, Flex, Box, Text, Card } from 'rebass';
import { isEqual } from 'lodash';

import GameCard from '../GameCard';
import { determineDifficulty } from '../../components/DifficultyBadge';
import * as Styles from './GameList.style';
import * as Media from '../../components/Elements/media';
// import { isLoggedIn, isAdmin } from '../../services/auth';

export const GameList = props => {
  const defaultFilters = {
    difficulty: 'any',
    players: 'any',
    playingTime: 'any',
  };

  const [sortKey, setSortKey] = useState('title:asc');
  const [showFilters, toggleFilter] = useState(false);
  const [filters, setFilter] = useState(defaultFilters);

  const difficultyFilter = filters.difficulty && filters.difficulty !== 'any';
  const playersFilter = filters.players && filters.players !== 'any';
  const playingTimeFilter = filters.playingTime && filters.playingTime !== 'any';

  props.games.sort((a, b) => {
    const [key, order] = sortKey.split(':');
    if (order === 'asc') {
      return a.game[key] > b.game[key] ? 1 : b.game[key] > a.game[key] ? -1 : 0;
    } else {
      return b.game[key] > a.game[key] ? 1 : a.game[key] > b.game[key] ? -1 : 0;
    }
  });

  const filterGames = () => {
    let filteredGames = props.games;

    // filter difficulty
    if (difficultyFilter) {
      filteredGames = filteredGames.filter(
        ({ game }) => determineDifficulty(game.difficulty).shortName === filters.difficulty,
      );
    }

    // filter players
    if (playersFilter) {
      filteredGames = filteredGames.filter(
        ({ game }) => filters.players >= game.minPlayers && filters.players <= game.maxPlayers,
      );
    }

    // filter playing time (by average)
    if (playingTimeFilter) {
      filteredGames = filteredGames.filter(({ game }) => filters.playingTime >= game.averagePlayingTime);
    }

    return filteredGames;
  };

  const disableFilterButton = showFilters && !isEqual(filters, defaultFilters);

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex flexDirection="column">
          <Heading fontSize={5}>Board Games</Heading>
          <Media.NotSmall>
            <Text>Here's a list of all {props.games.length} board games we have at our house for you to play!</Text>
          </Media.NotSmall>
          <Media.SmallOnly>
            <Text fontSize={2}>Showing {props.games.length} games</Text>
          </Media.SmallOnly>
        </Flex>
      </Flex>
      <Flex
        flexDirection={['column', 'row']}
        alignItems="flex-start"
        justifyContent={[null, 'space-between']}
        my="1rem"
      >
        <Box mb={['0.5rem', 0]}>
          <Text fontSize={2}>
            Sort by{' '}
            <Styles.SelectField value={sortKey} onChange={e => setSortKey(e.target.value)}>
              <option value="title:asc">Title (A-Z)</option>
              <option value="bggRating:desc">Highest rated first</option>
              <option value="difficulty:asc">Least difficult first</option>
              <option value="difficulty:desc">Most difficult first</option>
              <option value="averagePlayingTime:asc">Shortest playing time first</option>
              <option value="averagePlayingTime:desc">Longest playing time first</option>
            </Styles.SelectField>
          </Text>
        </Box>
        <Flex onClick={() => toggleFilter(!showFilters)}>
          <Styles.FilterButton
            bg="alternate"
            color="white"
            py="0.25rem"
            px="0.5rem"
            fontSize={0}
            disabled={disableFilterButton}
          >
            {showFilters ? 'Close Filters' : 'Show Filters'}
          </Styles.FilterButton>
        </Flex>
      </Flex>
      {showFilters && (
        <Flex alignItems="center" justifyContent={['flex-start', 'flex-end']}>
          <Card bg="offWhite" p="1rem" mb={showFilters ? '1rem' : '0'}>
            <Box my="0.5rem">
              <Text color={difficultyFilter ? 'alternate' : 'black'} fontSize={2}>
                {difficultyFilter && (
                  <Styles.ClearFilterButton
                    bg="white"
                    color="black"
                    mr="0.5rem"
                    fontSize={0}
                    onClick={() => setFilter({ ...filters, difficulty: 'any' })}
                  >
                    Clear
                  </Styles.ClearFilterButton>
                )}{' '}
                I want to play games with{' '}
                <Styles.SelectField
                  value={filters.difficulty}
                  onChange={e => setFilter({ ...filters, difficulty: e.target.value })}
                >
                  <option value="any">Any</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                  <option value="Expert">Expert</option>
                </Styles.SelectField>{' '}
                difficulty
              </Text>
            </Box>
            <Box my="0.5rem">
              <Text color={playersFilter ? 'alternate' : 'black'} fontSize={2}>
                {playersFilter && (
                  <Styles.ClearFilterButton
                    bg="white"
                    color="black"
                    mr="0.5rem"
                    fontSize={0}
                    onClick={() => setFilter({ ...filters, players: 'any' })}
                  >
                    Clear
                  </Styles.ClearFilterButton>
                )}{' '}
                I have{' '}
                <Styles.SelectField
                  value={filters.players}
                  onChange={e => setFilter({ ...filters, players: e.target.value })}
                >
                  <option value="any">Some</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8+</option>
                </Styles.SelectField>{' '}
                players playing with me
              </Text>
            </Box>
            <Box my="0.5rem">
              <Text color={playingTimeFilter ? 'alternate' : 'black'} fontSize={2}>
                {playingTimeFilter && (
                  <Styles.ClearFilterButton
                    bg="white"
                    color="black"
                    mr="0.5rem"
                    fontSize={0}
                    onClick={() => setFilter({ ...filters, playingTime: 'any' })}
                  >
                    Clear
                  </Styles.ClearFilterButton>
                )}{' '}
                I have about{' '}
                <Styles.SelectField
                  value={filters.playingTime}
                  onChange={e => setFilter({ ...filters, playingTime: e.target.value })}
                >
                  <option value="any">Unlimited</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                  <option value="60">60</option>
                  <option value="90">90 (1hr 30min)</option>
                </Styles.SelectField>{' '}
                minutes of time to play a game (uses average playing time)
              </Text>
            </Box>
            {!isEqual(defaultFilters, filters) && (
              <Box>
                <Styles.ClearFilterButton
                  bg="white"
                  color="black"
                  mr="0.5rem"
                  fontSize={0}
                  onClick={() => setFilter({ ...defaultFilters })}
                >
                  Clear All Filters
                </Styles.ClearFilterButton>
              </Box>
            )}
          </Card>
        </Flex>
      )}
      <Flex flexDirection="column" alignItems="flex-start" as="section">
        {filterGames().map(({ game }) => {
          return <GameCard key={game.title} game={game} />;
        })}
      </Flex>
    </>
  );
};
