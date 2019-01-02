import { GET_EVENTS, GET_EVENT_BY_ID } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return { ...state, events: [...action.payload] };
    case GET_EVENT_BY_ID:
      return { ...state, selectedEvent: action.payload };
    default:
      return state;
  }
};
