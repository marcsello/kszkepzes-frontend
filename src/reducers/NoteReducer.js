import { GET_NOTES_BY_EVENT, WRITE_NOTE, ADD_EVENT_NOTE } from '../actions/types';

const INITIAL_STATE = { eventNotes: [], actualNote: {} };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_NOTES_BY_EVENT:
      return { ...state, eventNotes: action.payload };
    case WRITE_NOTE:
      return { ...state, actualNote: { ...state.actualNote, note: action.payload } };
    case ADD_EVENT_NOTE:
      return { ...state, eventNotes: [...state.eventNotes, action.payload] };
    default:
      return state;
  }
};
