import { WRITE_TASK, WRITE_TASK_DEADLINE, CLEAR_WRITE } from '../actions/types';

const INITIAL_STATE = { title: '', text: '', deadline: '' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WRITE_TASK:
      return { ...state, [action.target]: action.payload };
    case WRITE_TASK_DEADLINE:
      return { ...state, [action.target]: action.payload };
    case CLEAR_WRITE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
