import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import NewsReducer from './NewsReducer';
import AddNewsReducer from './AddNewsReducer';
import EditNewsReducer from './EditNewsReducer';
import EventReducer from './EventReducer';
import TraineeReducer from './TraineeReducer';
import NoteReducer from './NoteReducer';

const rootReducer = combineReducers({
  user: UserReducer,
  news: NewsReducer,
  newNews: AddNewsReducer,
  selectedNews: EditNewsReducer,
  events: EventReducer,
  trainees: TraineeReducer,
  notes: NoteReducer,
});

export default rootReducer;
