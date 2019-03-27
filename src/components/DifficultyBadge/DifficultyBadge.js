import React from 'react';

import { determineDifficulty } from './difficulty';

import * as Styles from './DifficultyBadge.styles';

export const DifficultyBadge = ({ difficulty, longName, ...props }) => {
  const difficultyInfo = determineDifficulty(difficulty);
  return (
    <Styles.SmallBadge
      bg={difficultyInfo.color}
      color="white"
      fontSize={0}
      px="4px"
      border="0"
      borderRadius="4px"
      width="fit-content"
      {...props}
    >
      {longName ? difficultyInfo.longName : difficultyInfo.shortName}
    </Styles.SmallBadge>
  );
};
