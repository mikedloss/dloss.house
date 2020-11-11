import { BoardGame } from '../../lib/models/Game';

interface InspectState {
  inspectedGame: {
    id: string;
    title: string;
  };
  fetchedGame: BoardGame | null;
}

export const inspectInitialState: InspectState = {
  inspectedGame: {
    id: '',
    title: '',
  },
  fetchedGame: null,
};

export const inspectReducer = (state: InspectState, action): InspectState => {
  switch (action.type) {
    case 'SET_INSPECTED_GAME':
      return { ...state, inspectedGame: action.payload };
    case 'SET_FETCHED_GAME':
      return { ...state, fetchedGame: action.payload };
    default:
      return state;
  }
};
