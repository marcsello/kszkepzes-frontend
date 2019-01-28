import axios from './session';
import {
  GET_NOTES_BY_EVENT,
  WRITE_NOTE,
  ADD_EVENT_NOTE,
  CLEAR_WRITE,
  DELETE_NOTE,
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

export const writeNote = (event) => {
  return (dispatch => (dispatch({ type: WRITE_NOTE, payload: event.target.value })));
};

export const postEventNote = ({ eventid, userid, note }) => (
  async (dispatch) => {
    try {
      const response = await axios.post('/api/v1/notes/', {
        event: eventid ? eventid : '',
        profile: userid ? userid : '',
        note,
      });
      if (response.data.id) {
        alert('Sikeres mentés!');
        dispatch({
          type: ADD_EVENT_NOTE,
          payload: response.data,
        });
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
