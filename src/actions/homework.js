import { axios } from './auth';
import { GET_HOMEWORKS, GET_SOLUTIONS } from './types';

export const getHomeworks = () => (
  async (dispatch) => {
    try {
      const response = await axios.get('/api/v1/homework/tasks/');
      dispatch({
        type: GET_HOMEWORKS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  }
);

export const getSolutions = () => (
  async (dispatch) => {
    try {
      const response = await axios.get('/api/v1/homework/solutions/');
      dispatch({
        type: GET_SOLUTIONS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  }
);
