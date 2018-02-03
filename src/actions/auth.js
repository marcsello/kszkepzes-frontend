import ax from 'axios';
import { GET_USERDATA, PROFILE_CHANGE, GROUP_CHANGE, LOGOUT } from './types';

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
    dispatch({
      type: GET_USERDATA,
      payload: {
        id, joinDate, nick, motivation, signed, groups,
      },
    });
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
  nick, groups, signed, motivation, id,
}) => (
  async (dispatch) => {
    const response = await axios.patch(`/api/v1/profiles/${id}/`, {
      nick, groups, signed, motivation,
    });
    if (response.data.id === id) {
      alert('Sikeres mentés!');
    } else {
      alert('Mentés nem sikerült!');
    }
  }
);

export const logout = () => (
  async (dispatch) => {
    const response = await axios.get('/api/v1/logout/');
    if (response) {
      dispatch({ action: LOGOUT });
    }
  }
);
