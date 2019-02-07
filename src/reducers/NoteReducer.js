import {
  GET_NOTES_BY_EVENT,
  WRITE_NOTE,
  ADD_EVENT_NOTE,
  CLEAR_WRITE,
  DELETE_NOTE,
  GET_NOTES_BY_PROFILE,
  ADD_PROFILE_NOTE,
} from '../actions/types';

const INITIAL_STATE = { eventNotes: [], actualNote: {}, profileNotes: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_NOTES_BY_EVENT:
      return { ...state, eventNotes: action.payload };
    case GET_NOTES_BY_PROFILE:
      return { ...state, profileNotes: action.payload };
    case WRITE_NOTE:
      return { ...state, actualNote: { ...state.actualNote, note: action.payload } };
    case ADD_EVENT_NOTE:
      return { ...state, eventNotes: [...state.eventNotes, action.payload] };
    case ADD_PROFILE_NOTE:
      return { ...state, profileNotes: [...state.profileNotes, action.payload] };
    case CLEAR_WRITE:
      return { ...state, actualNote: { note: '' } };
    case DELETE_NOTE:
      state.eventNotes.splice(state.eventNotes.indexOf(action.payload), 1);
      state.profileNotes.splice(state.profileNotes.indexOf(action.payload), 1);
      return { ...state, eventNotes: [...state.eventNotes], profileNotes: [...state.profileNotes] };
    default:
      return state;
  }
};
