import { SearchedGame } from '../../lib/models/Game';

export interface SearchState {
  searchTerm: string;
  searchResults: SearchedGame[];
  isSearching: boolean;
  isError: boolean;
}

export const searchInitialState = {
  searchTerm: '',
  searchResults: [],
  isSearching: false,
  isError: false,
};

export const searchReducer = (state: SearchState, action): SearchState => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload };
    case 'SET_SEARCHING':
      return { ...state, isSearching: action.payload };
    case 'SET_ERROR':
      return { ...state, isError: action.payload };
    case 'PARTIAL_RESET':
      return { ...state, isSearching: false, isError: false };
    case 'FULL_RESET':
      return searchInitialState;
    default:
      return state;
  }
};
