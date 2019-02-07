import axios from './session';
import {
  GET_NOTES_BY_EVENT,
  WRITE_NOTE,
  ADD_EVENT_NOTE,
  CLEAR_WRITE,
  DELETE_NOTE,
  GET_NOTES_BY_PROFILE,
  ADD_PROFILE_NOTE,
} from './types';

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

export const getNotesByProfile = id => (
  async (dispatch) => {
    try {
      const response = await axios.get('/api/v1/notes/', { params: { profileID: id } });
      dispatch({
        type: GET_NOTES_BY_PROFILE,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  }
);

export const writeNote = (event) => {
  return (dispatch => (dispatch({ type: WRITE_NOTE, payload: event.target.value })));
};

export const postNote = ({ eventid, userid, note }) => (
  async (dispatch) => {
    try {
      const response = await axios.post('/api/v1/notes/', {
        event: eventid ? eventid : '',
        profile: userid ? userid : '',
        note,
      });
      if (response.data.id) {
        alert('Sikeres mentés!');
        if (eventid) {
          dispatch({
            type: ADD_EVENT_NOTE,
            payload: response.data,
          });
        }
        if (userid) {
          dispatch({
            type: ADD_PROFILE_NOTE,
            payload: response.data,
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  });

export const clearWrite = () => (
  (dispatch) => {
    dispatch({ type: CLEAR_WRITE });
  }
);

export const deleteNote = note => (
  async (dispatch) => {
    try {
      const response = await axios.delete(`/api/v1/notes/${note.id}/`);
      if (!response.data.id) {
        alert('Sikeres törlés!');
        dispatch({
          type: DELETE_NOTE,
          payload: note,
        });
      } else {
        alert('A törlés nem sikerült!');
      }
    } catch (e) {
      console.log(e);
    }
  });
