import {
  GET_EVENTS,
  GET_EVENT_BY_ID,
  VISITOR_CHANGE,
  WRITE_EVENT,
  ADD_EVENT,
  DELETE_EVENT,
} from '../actions/types';

const INITIAL_STATE = { newEvent: {} };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return { ...state, events: [...action.payload] };
    case GET_EVENT_BY_ID:
      return { ...state, selectedEvent: action.payload };
    case VISITOR_CHANGE:
      const index = state.selectedEvent.visitors.indexOf(action.payload);
      if (index !== -1) {
        state.selectedEvent.visitors.splice(index, 1);
        return {
          ...state,
          selectedEvent: {
            ...state.selectedEvent,
            visitors: state.selectedEvent.visitors,
          },
        };
      }
      state.selectedEvent.visitors.push(action.payload)
      return {
        ...state,
        selectedEvent: {
          ...state.selectedEvent,
          visitors: state.selectedEvent.visitors,
        },
      };
    case WRITE_EVENT:
      return { ...state, newEvent: { ...state.newEvent, [action.target]: action.payload } };
    case ADD_EVENT:
      return { ...state, events: [...state.events, action.payload] };
    case DELETE_EVENT:
      state.events.splice(state.events.indexOf(action.payload), 1);
      return { ...state, events: [...state.events] };
    default:
      return state;
  }
};
