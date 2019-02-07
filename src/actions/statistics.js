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
  EDIT_EVENT,
  WRITE_EDITED_EVENT,
  SELECT_EVENT_FOR_EDIT,
} from './types';
import { showMessage } from './messages';

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
  async (dispatch) => {
    try {
      const response = await axios.patch(`/api/v1/staff_events/${id}/`, {
        visitors,
        absent,
      });
      if (response.data.id) {
        dispatch(showMessage('Sikeres változtatás!', 'success'));
      }
    } catch (e) {
      dispatch(showMessage('Nem sikerült a változtatás!', 'error'));
    }
  }
);

export const writeEvent = ({ target: { name, value } }) => (
  (dispatch) => {
    dispatch({ type: WRITE_EVENT, payload: value, target: name });
  }
);

export const selectEventForEdit = editEvent => (
  (dispatch) => {
    dispatch({ type: SELECT_EVENT_FOR_EDIT, payload: editEvent });
  }
);

export const writeEditEvent = ({ target: { name, value } }) => (
  (dispatch) => {
    dispatch({ type: WRITE_EDITED_EVENT, payload: value, target: name });
  }
);

export const editEvent = ({ id, name, description, date }) => (
  async (dispatch) => {
    try {
      const response = await axios.patch(`/api/v1/staff_events/${id}/`, {
        name,
        description,
        date,
      });
      if (response.data.id) {
        dispatch(showMessage('Az alkalom módosítva!', 'success'));
        dispatch({
          type: EDIT_EVENT,
          payload: response.data,

        });
      } else {
        dispatch(showMessage('A módosítás nem sikerült!', 'error'));
      }
    } catch (e) {
      console.log(e);
    }
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
        dispatch(showMessage('Az alkalom hozzáadva!', 'success'));
        dispatch({
          type: ADD_EVENT,
          payload: response.data,
        });
      } else {
        dispatch(showMessage('A hozzáadás nem sikerült!', 'error'));
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
      dispatch(showMessage('Az alkalom törölve!', 'success'));
        dispatch({
          type: DELETE_EVENT,
          payload: event,
        });
      } else {
        dispatch(showMessage('A törlés nem sikerült!', 'error'));
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
        dispatch(showMessage('Státusz megváltoztatva!', 'success'));
        dispatch({
          type: SET_STATUS,
          payload: response.data,
        });
      }
      else {
        dispatch(showMessage('A változtatás nem sikerült!', 'error'));
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
