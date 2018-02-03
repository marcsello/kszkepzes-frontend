import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import NewsReducer from './NewsReducer';

const rootReducer = combineReducers({
  user: UserReducer,
  news: NewsReducer,
});

export default rootReducer;
