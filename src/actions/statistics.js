import axios from './session';
import {
  GET_EVENTS,
  GET_EVENT_BY_ID,
  GET_TRAINEES,
  VISITOR_CHANGE,
  WRITE_EVENT,
  ADD_EVENT,
  DELETE_EVENT,
  GET_PROFILES,
  GET_SELECTED_PROFILE,
  SET_STATUS,
  ABSENT_CHANGE,
  CHANGE_NO,
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

export const getStudentEvents = () => (
  async (dispatch) => {
    try {
      const response = await axios.get('/api/v1/student_events/');
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

export const getTrainees = () => (
  async (dispatch) => {
    try {
      const response = await axios.get('/api/v1/profiles/', { params: { role: 'Student' } });
      dispatch({
        type: GET_TRAINEES,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  }
);

export const visitorChange = ({ id, value }) => {
  switch (value){
    case 'Visitor':
      return (dispatch => (dispatch({ type: VISITOR_CHANGE, payload: id })));
    case 'Absent':
      return (dispatch => (dispatch({ type: ABSENT_CHANGE, payload: id })));
    case 'No':
      return (dispatch => (dispatch({ type: CHANGE_NO, payload: id })));
    default:
  }
};

export const submitVisitors = ({ id, visitors, absent }) => (
  async () => {
    try {
      const response = await axios.patch(`/api/v1/staff_events/${id}/`, {
        visitors,
        absent,
      });
      if (response.data.id) {
        alert('Sikeres mentés!');
      }
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

export const addEvent = ({ name, date, description }) => (
  async (dispatch) => {
    try {
      const response = await axios.post('/api/v1/staff_events/', {
        name,
        date,
        description,
        absent: [],
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
      const response = await axios.delete(`/api/v1/staff_events/${event.id}/`);
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

export const getProfiles = () => (
  async (dispatch) => {
    try {
      const response = await axios.get('/api/v1/profiles/');
      dispatch({
        type: GET_PROFILES,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  }
);

export const setStatus = (id, status) => (
  async (dispatch) => {
    try {
      const response = await axios.patch(`/api/v1/profiles/${id}/`, {
        role: status,
      });
      if (response.data.id) {
        dispatch({
          type: SET_STATUS,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const getSelectedProfile = id => (
  async (dispatch) => {
    try {
      const response = await axios.get(`/api/v1/profiles/${id}/`);
      dispatch({
        type: GET_SELECTED_PROFILE,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  }
);
