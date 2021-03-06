export interface BoardGame {
  title: string;
  bggId: string;
  image: string;
  thumbnail: string;
  bggRating: string;
  difficulty: string;
  minPlayers: number;
  maxPlayers: number;
  minPlayingTime: number;
  maxPlayingTime: number;
  averagePlayingTime: number;
  categories: string[];
  mechanisms: string[];
  description: string;
  type: string;
  bggRank: number;
  playingTime: string;
  players: string;
}

export interface InspectedBoardGame extends BoardGame {
  alreadyExists: boolean;
}

export interface SearchedGame {
  id: string;
  title: string;
}
