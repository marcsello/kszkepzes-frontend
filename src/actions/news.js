import axios from './session';
import { GET_NEWS, WRITE_NEWS, ADD_NEWS, DELETE_NEWS,
  CLEAR_WRITE, SELECT_NEWS, EDIT_NEWS, SHOW_MESSAGE } from './types';
import { showMessage } from './messages';

export const getNews = () => (
  async (dispatch) => {
    try {
      const response = await axios.get('/api/v1/news');
      dispatch({
        type: GET_NEWS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  }
);

export const postNews = ({ title, author, text }) => (
  async (dispatch) => {
    try {
      const response = await axios.post('/api/v1/news/', {
        author,
        title,
        text,
      });
      if (response.data.id) {
        dispatch({
          type: ADD_NEWS,
          payload: response.data,
        });
        dispatch(showMessage('Hír hozzádva!', 'success'));
      } else {
        dispatch(showMessage('Nem sikerült a hírt hozáadni!', 'error'));
      }
    } catch (e) {
      dispatch(showMessage('Nem sikerült a hírt hozáadni!', 'error'));
    }
  }
);

export const editNews = ({ id, title, text, updated_by}) => (
  async (dispatch) => {
    try {
      const response = await axios.patch(`/api/v1/news/${id}/`, {
        updated_by,
        title,
        text,
      });
      if (response.data.id) {
        dispatch(showMessage('Hír módosítva!', 'success'));
        dispatch({
          type: EDIT_NEWS,
          payload: response.data,

        });
      } else {
        dispatch(showMessage('Nem sikerült a módosítás', 'error'));
      }
    } catch (e) {
      dispatch(showMessage('Nem sikerült a módosítás', 'error'));
    }
  }
);

export const deleteNews = news => (
  async (dispatch) => {
    try {
      const response = await axios.delete(`/api/v1/news/${news.id}/`);
      if (!response.data.id) {
        dispatch(showMessage('Sikeres törlés!', 'success'));
        dispatch({
          type: DELETE_NEWS,
          payload: news,
        });
      } else {
        dispatch(showMessage('A törlés nem sikerült!', 'error'));
      }
    } catch (e) {
      dispatch(showMessage('A törlés nem sikerült!', 'error'));
    }
  });

export const writeNews = ({ target: { name, value } }) => (
  (dispatch) => {
    dispatch({ type: WRITE_NEWS, payload: value, target: name });
  }
);

export const clearWrite = () => (
  (dispatch) => {
    dispatch({ type: CLEAR_WRITE });
  }
);

export const setSelectedNews = item => (
  (dispatch) => {
    dispatch({ type: SELECT_NEWS, payload: item });
  }
);
