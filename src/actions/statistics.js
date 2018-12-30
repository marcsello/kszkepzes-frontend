import { axios } from './auth';
import { GET_EVENTS } from './types';

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
