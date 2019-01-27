import axios from './session';
import { GET_TASKS,
  GET_SOLUTIONS,
  ADD_TASK,
  WRITE_TASK,
  CLEAR_WRITE,
  ADD_SOLUTION,
  WRITE_SOLUTION,
  WRITE_SOLUTION_FILE,
  GET_PROFILES,
  ADD_DOCUMENT } from './types';

export const getTasks = () => (
  async (dispatch) => {
    try {
      const response = await axios.get('/api/v1/homework/tasks/');
      dispatch({
        type: GET_TASKS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  }
);

export const getSolutions = id => (
  async (dispatch) => {
    try {
      const response = await axios.get('/api/v1/homework/solutions/', { params: { profileID: id } });
      dispatch({
        type: GET_SOLUTIONS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  }
);

export const addTask = ({ title, text, deadline }) => (
  async (dispatch) => {
    try {
      const response = await axios.post('/api/v1/homework/tasks/', {
        title,
        text,
        deadline,
      });
      if (response.data.id) {
        alert('Sikeres mentés!');
        dispatch({
          type: ADD_TASK,
          payload: response.data,
        });
      } else {
        alert('Mentés nem sikerült!');
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const addSolution = ({
  task, accepted, corrected, note,
}) => (
  async (dispatch) => {
    try {
      const response = await axios.post('/api/v1/homework/solutions/', {
        task,
        accepted,
        corrected,
        note,
      });
      if (response.data.id) {
        dispatch({
          type: ADD_SOLUTION,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const addDocument = ({
  name, description, file, solution,
}) => (
  async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('file', file);
      formData.append('solution', solution);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      const response = await axios.post('/api/v1/documents/', formData, config);
      if (response.data.id) {
        dispatch({
          type: ADD_DOCUMENT,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const writeSolution = ({ target: { name, value } }) => (
  (dispatch) => {
    dispatch({ type: WRITE_SOLUTION, payload: value, target: name });
  }
);

export const writeSolutionFile = ({ target: { files } }) => (
  (dispatch) => {
    dispatch({ type: WRITE_SOLUTION_FILE, payload: files[0], target: 'file' });
  }
);

export const writeTask = ({ target: { name, value } }) => (
  (dispatch) => {
    dispatch({ type: WRITE_TASK, payload: value, target: name });
  }
);

export const writeTaskDeadline = ({ name, value }) => (
  (dispatch) => {
    dispatch({ type: WRITE_TASK, payload: value, target: name });
  }
);

export const clearWrite = () => (
  (dispatch) => {
    dispatch({ type: CLEAR_WRITE });
  }
);

export const getProfiles = () => (
  async (dispatch) => {
    try {
      const response = await axios.get('/api/v1/profiles/');
      dispatch({
        type: GET_PROFILES,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  }
);
