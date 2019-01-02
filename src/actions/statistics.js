import { axios } from './auth';
import { GET_EVENTS, GET_EVENT_BY_ID } from './types';

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
