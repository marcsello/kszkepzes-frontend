import { GET_NOTES_BY_EVENT } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_NOTES_BY_EVENT:
      return { ...state, eventNotes: action.payload };
    default:
      return state;
  }
};
