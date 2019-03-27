const difficultyEasy = {
  shortName: 'Easy',
  longName: 'Piece of cake!',
  color: '#3490DC',
};
const difficultyMedium = {
  shortName: 'Medium',
  longName: 'Will of iron, knees of Jello',
  color: '#6574CD',
};
const difficultyHard = {
  shortName: 'Hard',
  longName: 'Things just got real...',
  color: '#F6993F',
};
const difficultyExpert = {
  shortName: 'Expert',
  longName: 'No pain, no gain!',
  color: '#E3342F',
};
const difficultyIDK = {
  shortName: '???',
  longName: "I don't know!",
  color: '#8795A1',
};

export const difficulties = {
  easy: difficultyEasy,
  medium: difficultyMedium,
  hard: difficultyHard,
  expert: difficultyExpert,
};

export const determineDifficulty = difficulty => {
  let diff;
  if (difficulty <= 5 && difficulty >= 4) {
    diff = difficultyExpert;
  } else if (difficulty < 4 && difficulty >= 2.5) {
    diff = difficultyHard;
  } else if (difficulty < 2.5 && difficulty >= 1.5) {
    diff = difficultyMedium;
  } else if (difficulty < 1.5 && difficulty > 0) {
    diff = difficultyEasy;
  } else diff = difficultyIDK;

  return diff;
};
