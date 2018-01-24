import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import TodoReducer from './TodoReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  todos: TodoReducer,
});

export default rootReducer;
