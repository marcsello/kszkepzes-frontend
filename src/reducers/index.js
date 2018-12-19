import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import NewsReducer from './NewsReducer';
import AddNewsReducer from './AddNewsReducer';
import EditNewsReducer from './EditNewsReducer';

const rootReducer = combineReducers({
  user: UserReducer,
  news: NewsReducer,
  newNews: AddNewsReducer,
  selectedNews: EditNewsReducer,
});

export default rootReducer;
