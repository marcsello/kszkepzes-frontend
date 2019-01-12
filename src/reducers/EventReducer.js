import { GET_EVENTS, GET_EVENT_BY_ID, VISITOR_CHANGE, WRITE_EVENT, ADD_EVENT } from '../actions/types';

const INITIAL_STATE = { newEvent: {} };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return { ...state, events: [...action.payload] };
    case GET_EVENT_BY_ID:
      return { ...state, selectedEvent: action.payload };
    case VISITOR_CHANGE:
      return { ...state, selectedEvent: { ...state.selectedEvent, visitors: action.payload } };
    case WRITE_EVENT:
      return { ...state, newEvent: { ...state.newEvent, [action.target]: action.payload } };
    case ADD_EVENT:
      return { ...state, events: [...state.events, action.payload] };
    default:
      return state;
  }
};
