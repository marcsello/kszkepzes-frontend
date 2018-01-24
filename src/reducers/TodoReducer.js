import {
  ADD_TODO,
} from '../actions/types';

const INITIAL_STATE = {
  todos: [{ data: 'hello' }],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TODO:
      return { todos: [...state.todos, { data: action.payload }] };
    default:
      return state;
  }
};
