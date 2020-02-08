import axios from './session';
import { GET_IMAGES } from './types';

export const getImages = () => (
  async (dispatch) => {
    try {
      const response = await axios.get('/api/v1/images');
      dispatch({
        type: GET_IMAGES,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  }
);