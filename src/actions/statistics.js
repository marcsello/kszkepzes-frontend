import axios from './session';
import {
  GET_EVENTS,
  GET_EVENT_BY_ID,
  GET_TRAINEES,
  VISITOR_CHANGE,
  WRITE_EVENT,
  ADD_EVENT,
  DELETE_EVENT,
  GET_TRAINEE_BY_ID,
} from './types';

export const getStaffEvents = () => (
  async (dispatch) => {
    try {
      const response = await axios.get('/api/v1/staff_events/');
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
      const response = await axios.get(`/api/v1/staff_events/${id}`);
      dispatch({
        type: GET_EVENT_BY_ID,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  }
);

export const getTraineeById = id => (
  async (dispatch) => {
    try {
      const response = await axios.get(`/api/v1/profiles/${id}`);
      dispatch({
        type: GET_TRAINEE_BY_ID,
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

export const visitorChange = ({ id }) => {
  return (dispatch => (dispatch({ type: VISITOR_CHANGE, payload: id })));
};

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

export const deleteEvent = event => (
  async (dispatch) => {
    try {
      const response = await axios.delete(`/api/v1/events/${event.id}/`);
      if (!response.data.id) {
        alert('Sikeres törlés!');
        dispatch({
          type: DELETE_EVENT,
          payload: event,
        });
      } else {
        alert('A törlés nem sikerült!');
      }
    } catch (e) {
      console.log(e);
    }
  });
