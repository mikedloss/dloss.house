import React from 'react';
import { Tag } from '@chakra-ui/react';

import { determineDifficulty, Difficulty } from './difficulty';

export interface DifficultyBadgeProps {
  difficulty: string;
  showLongName?: boolean;
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty, showLongName = false }) => {
  const difficultyInfo = determineDifficulty(difficulty);
  return (
    <Tag size="sm" width="fit-content" color={difficultyInfo.color}>
      {showLongName ? difficultyInfo.longName : difficultyInfo.shortName}
    </Tag>
  );
};
