import { axios } from './auth'
import { GET_NEWS, CLEAR_WRITE, WRITE_NEWS } from './types'

export const getNews = () => (
  async (dispatch) => {
    try {
      const response = await axios.get('/api/v1/news');
      dispatch({
        type: GET_NEWS,
        payload: response.data,
      });
    } catch(e) {
    }

  }
);

export const postNews = ({title, author, text}) =>(
  async(dispatch) =>{
    try{
      const response = await axios.post('/api/v1/news/', {
        "author": author,
        "title": title,
        "text": text,
      })
      if (response.data.id) {
        alert('Sikeres mentés!');
      } else {
        alert('Mentés nem sikerült!');
      }
    }catch(e){
        console.log(e);
      }
    }
);

export const writeNews = ({target : {name, value}}) => (
  (dispatch) => {
    dispatch({ type: WRITE_NEWS, payload: value, target: name });
  }
);
