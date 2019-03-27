import React from 'react';
import { Link } from 'gatsby';
import { Heading, Button, Flex } from 'rebass';

import GameCard from '../GameCard';
// import SortDropdown from './components/SortDropdown';
// import { isLoggedIn, isAdmin } from '../../services/auth';

export const GameList = props => {
  const sortKey = 'title';
  // const [sortKey] = useState('title');
  // const [direction, setDirection] = useState('asc');

  // const sortGames = (sortKey, direction) => {
  //   setSortKey(sortKey);
  //   setDirection(direction);
  // };

  // console.log(props);

  props.games.sort((a, b) => {
    if (a.node[sortKey] > b.node[sortKey]) {
      return 1;
    } else if (b.node[sortKey] > a.node[sortKey]) {
      return -1;
    } else {
      return 0;
    }
  });

  return (
    <>
      {/* TODO: build a filtering tool */}
      {/* <SortDropdown sort={sortGames} sortKey={sortKey} direction={direction} /> */}
      <Flex flexDirection="column" alignItems="flex-start" as="section">
        {props.games.map(({ node }) => {
          return <GameCard key={node.title} game={node} />;
        })}
      </Flex>
    </>
  );
};