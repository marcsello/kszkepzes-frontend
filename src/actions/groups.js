import axios from './session';
import { GET_GROUPS } from './types';

export const getGroups = () => (
  async (dispatch) => {
    try {
      const response = await axios.get('/api/v1/groups');
      dispatch({
        type: GET_GROUPS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  }
);
