import React, { useState } from 'react';
import { Link } from 'gatsby';
import { Heading, Button, Flex, Box, Text, Card } from 'rebass';

import GameCard from '../GameCard';
import { determineDifficulty } from '../../components/DifficultyBadge';
import * as Styles from './GameList.style';
import * as Media from '../../components/Elements/media';
// import SortDropdown from './components/SortDropdown';
// import { isLoggedIn, isAdmin } from '../../services/auth';

export const GameList = props => {
  const [sortKey, setSortKey] = useState('title:asc');
  const [showFilter, toggleFilter] = useState(false);
  const [filter, setFilter] = useState({});

  const difficultyFilter = filter.difficulty && filter.difficulty !== "All"

  props.games.sort((a, b) => {
    const [key, order] = sortKey.split(':');
    if (order === "asc") {
      return (a.game[key] > b.game[key] ? 1 : (b.game[key] > a.game[key] ? -1 : 0))
    } else {
      return (b.game[key] > a.game[key] ? 1 : (a.game[key] > b.game[key] ? -1 : 0))
    }
  });


  const filterGames = () => {
    let filteredGames = props.games;

    // filter difficulty
    if (difficultyFilter) {
      filteredGames = filteredGames.filter(({ game }) => determineDifficulty(game.difficulty).shortName === filter.difficulty)
    }

    // filter something else
    // console.log(filteredGames);
    return filteredGames;
  }

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex flexDirection="column">
          <Heading fontSize={5}>Board Games</Heading>
          <Media.NotSmall>
            <Text>Here's a list of all {props.games.length} board games we have at our house for you to play!</Text>
          </Media.NotSmall>
        </Flex>
      </Flex>
      <Flex justifyContent="space-between" my="1rem">
        <Box>
          <Text fontSize={2}>
            Sort by{' '}
            <Styles.SelectField value={sortKey} onChange={e => setSortKey(e.target.value)}>
              <option value="title:asc">Title (Ascending)</option>
              <option value="title:desc">Title (Descending)</option>
              <option value="bggRating:asc">Rating (Ascending)</option>
              <option value="bggRating:desc">Rating (Descending)</option>
              <option value="difficulty:asc">Difficulty (Ascending)</option>
              <option value="difficulty:desc">Difficulty (Descending)</option>
            </Styles.SelectField>
          </Text>
        </Box>
        <Flex onClick={() => toggleFilter(!showFilter)}>
          <Styles.FilterButton
            bg="alternate"
            color="white"
            py="0.25rem"
            px="0.5rem"
            fontSize={0}
          >
            {showFilter ? 'Close Filters' : 'Show Filters'}
          </Styles.FilterButton>
        </Flex>
      </Flex>
      {showFilter && (
        <Flex alignItems="center" justifyContent="flex-end">
          <Card my="1rem" bg="offWhite" p="1rem">
            <Box>
              <Text color={difficultyFilter ? 'alternate' : 'black'} fontSize={2}>
              {difficultyFilter && '➡ '}Only show{' '}
                <Styles.SelectField value={filter.difficulty} onChange={e => setFilter({...filter, difficulty: e.target.value})}>
                  <option value="All">All</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                  <option value="Expert">Expert</option>
                </Styles.SelectField>{' '}games
              </Text>
            </Box>
            <Box>another</Box>
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
