// TODO: Separate actions

import ax from 'axios';
import { GET_USERDATA, PROFILE_CHANGE, GROUP_CHANGE, LOGOUT, GET_NEWS } from './types';

const axios = ax.create({
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

export const getUserData = () => (
  async (dispatch) => {
    const user = await axios.get('/api/v1/profiles/me');
    const {
      id, join_date: joinDate, nick, motivation, signed, groups,
    } = user.data;
    const motivationJSON = JSON.parse(motivation);
    const motivationAbout = motivationJSON.first;
    const motivationProfession = motivationJSON.second;
    const motivationExercise = motivationJSON.third;
    dispatch({
      type: GET_USERDATA,
      payload: {
        id, joinDate, nick, motivationAbout, motivationProfession, motivationExercise, signed, groups,
      },
    });
  }
);

export const getNews = () => (
  async (dispatch) => {
    const response= await axios.get('/api/v1/news');
    if(response) {
      dispatch({
        type: GET_NEWS,
        payload: response.data,
      });
    }

  }
);

export const textChange = ({ target: { name, value } }) => (
  (dispatch) => {
    dispatch({ type: PROFILE_CHANGE, payload: value, target: name });
  }
);

export const groupChange = groups => (
  dispatch => (dispatch({ type: GROUP_CHANGE, payload: groups }))
);

export const submitRegistration = ({
  nick, groups, signed, motivationAbout, motivationProfession, motivationExercise, id,
}) => (
  async (dispatch) => {
    const response = await axios.patch(`/api/v1/profiles/${id}/`, {
      nick, groups, signed, motivation: JSON.stringify({ first: motivationAbout, second: motivationProfession, third: motivationExercise }),
    });
    if (response.data.id === id) {
      alert('Sikeres mentés!');
    } else {
      alert('Mentés nem sikerült!');
    }
  }
);
