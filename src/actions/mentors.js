import axios from './session';
import { GET_MENTORS } from './types';

export const getMentors = () => (
  async (dispatch) => {
    try {
      const response = await axios.get('/api/v1/mentors');
      dispatch({
        type: GET_MENTORS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  }
);