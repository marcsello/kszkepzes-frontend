import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import NewsReducer from './NewsReducer';
import AddNewsReducer from './AddNewsReducer';

const rootReducer = combineReducers({
  user: UserReducer,
  news: NewsReducer,
  newNews: AddNewsReducer,
});

export default rootReducer;
