// TODO: Separate actions

import ax from 'axios';
import { GET_USERDATA, PROFILE_CHANGE, GROUP_CHANGE, GET_NEWS } from './types';

export const axios = ax.create({
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

export const getUserData = () => (
  async (dispatch) => {
    try {
      const user = await axios.get('/api/v1/profiles/me');
      const {
        id,
        join_date: joinDate,
        nick,
        motivation_about: motivationAbout,
        motivation_profession: motivationProfession,
        motivation_exercise: motivationExercise,
        signed,
        groups,
      } = user.data;
      dispatch({
        type: GET_USERDATA,
        payload: {
          id, joinDate, nick, motivationAbout, motivationProfession, motivationExercise, signed, groups,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
);

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
  async () => {
    try {
      const response = await axios.patch(`/api/v1/profiles/${id}/`, {
        nick,
        groups,
        signed,
        motivation_about: motivationAbout,
        motivation_profession: motivationProfession,
        motivation_exercise: motivationExercise,
      });
      if (response.data.id === id) {
        alert('Sikeres mentés!');
      } else {
        alert('Mentés nem sikerült!');
      }
    } catch (e) {
      console.log(e);
    }
  }
);
