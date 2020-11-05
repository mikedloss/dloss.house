export interface BoardGame {
  title: string;
  bggId: number;
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
}
