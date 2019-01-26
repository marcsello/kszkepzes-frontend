import {
  GET_EVENTS,
  GET_EVENT_BY_ID,
  VISITOR_CHANGE,
  WRITE_EVENT,
  ADD_EVENT,
  DELETE_EVENT,
  CLEAR_WRITE,
  ABSENT_CHANGE,
  CHANGE_NO,
  SELECT_EVENT_FOR_EDIT,
  EDIT_EVENT,
  WRITE_EDITED_EVENT,
} from '../actions/types';

const INITIAL_STATE = { events: [], newEvent: {}, editedEvent: {} };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return { ...state, events: [...action.payload] };
    case GET_EVENT_BY_ID:
      return { ...state, selectedEvent: action.payload };
    case VISITOR_CHANGE:
      if (state.selectedEvent.visitors.includes(action.payload)) {
        // Benne van nem kell megváltoztatni
        return { ...state }
      }
      if (state.selectedEvent.absent.indexOf(action.payload) > -1) {
        // Ha az absentbe van ki kell venni
        state.selectedEvent.absent.splice(state.selectedEvent.absent.indexOf(action.payload), 1);
      }
      state.selectedEvent.visitors.push(action.payload)
      return {
        ...state,
        selectedEvent: {
          ...state.selectedEvent,
          visitors: state.selectedEvent.visitors,
          absent: state.selectedEvent.absent,
        },
      };
    case ABSENT_CHANGE:
      if (state.selectedEvent.absent.includes(action.payload)) {
        return { ...state };
      }
      if (state.selectedEvent.visitors.indexOf(action.payload) > -1) {
        state.selectedEvent.visitors.splice(state.selectedEvent.visitors.indexOf(action.payload), 1);
      }
      state.selectedEvent.absent.push(action.payload);
      return {
        ...state,
        selectedEvent: {
          ...state.selectedEvent,
          visitors: state.selectedEvent.visitors,
          absent: state.selectedEvent.absent,
        },
      };
    case CHANGE_NO:
      if (state.selectedEvent.visitors.indexOf(action.payload) > -1) {
        state.selectedEvent.visitors.splice(state.selectedEvent.visitors.indexOf(action.payload), 1);
      }
      if (state.selectedEvent.absent.indexOf(action.payload) > -1) {
        // Ha az absentbe van ki kell venni
        state.selectedEvent.absent.splice(state.selectedEvent.absent.indexOf(action.payload), 1);
      }
      return {
        ...state,
        selectedEvent: {
          ...state.selectedEvent,
          visitors: state.selectedEvent.visitors,
          absent: state.selectedEvent.absent,
        },
      };
    case WRITE_EVENT:
      return { ...state, newEvent: { ...state.newEvent, [action.target]: action.payload } };
    case ADD_EVENT:
      return { ...state, events: [...state.events, action.payload] };
    case DELETE_EVENT:
      state.events.splice(state.events.indexOf(action.payload), 1);
      return { ...state, events: [...state.events] };
    case SELECT_EVENT_FOR_EDIT:
      return { ...state, editedEvent: action.payload }
    case WRITE_EDITED_EVENT:
      return { ...state, editedEvent: { ...state.editedEvent, [action.target]: action.payload } };
    case EDIT_EVENT:
      const index = state.events.findIndex(item => item.id === action.payload.id);
      state.events.splice(index, 1, action.payload);
      return { ...state, events: [...state.events] };
    case CLEAR_WRITE:
      return { ...state, newEvent: {}, editedEvent: {} };
    default:
      return state;
  }
};
