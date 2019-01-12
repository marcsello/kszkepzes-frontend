import axios from './session';
import {
  GET_EVENTS,
  GET_EVENT_BY_ID,
  GET_TRAINEES, VISITOR_CHANGE,
  GET_NOTES_BY_EVENT,
  WRITE_EVENT,
  ADD_EVENT,
} from './types';

export const getEvents = () => (
  async (dispatch) => {
    try {
      const response = await axios.get('/api/v1/events/');
      dispatch({
        type: GET_EVENTS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  }
);

export const getEventById = id => (
  async (dispatch) => {
    try {
      const response = await axios.get(`/api/v1/events/${id}`);
      dispatch({
        type: GET_EVENT_BY_ID,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  }
);

export const getTrainees = () => (
  async (dispatch) => {
    try {
      const response = await axios.get('/api/v1/profiles/');
      dispatch({
        type: GET_TRAINEES,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  }
);

export const visitorChange = visitors => (
  dispatch => (dispatch({ type: VISITOR_CHANGE, payload: visitors }))
);

export const getNotesByEvent = id => (
  async (dispatch) => {
    try {
      const response = await axios.get('/api/v1/notes/', { params: { eventID: id } });
      dispatch({
        type: GET_NOTES_BY_EVENT,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  }
);

export const submitVisitors = ({ id, visitors }) => (
  async () => {
    try {
      const response = await axios.patch(`/api/v1/events/${id}/`, {
        visitors
      });
    } catch (e) {
      console.log(e);
    }
  }
);

export const writeEvent = ({ target: { name, value } }) => (
  (dispatch) => {
    dispatch({ type: WRITE_EVENT, payload: value, target: name });
  }
);


export const eventDate = (name, value) => (
  (dispatch) => {
    dispatch({ type: WRITE_EVENT, payload: value, target: name });
  }
);

export const addEvent = ({ name, date }) => (
  async (dispatch) => {
    try {
      const response = await axios.post('/api/v1/events/', {
        name,
        date,
      });
      if (response.data.id) {
        alert('Sikeres mentés!');
        dispatch({
          type: ADD_EVENT,
          payload: response.data,
        });
      } else {
        alert('Mentés nem sikerült!');
      }
    } catch (e) {
      console.log(e);
    }
  }
);