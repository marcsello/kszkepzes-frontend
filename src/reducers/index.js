import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import NewsReducer from './NewsReducer';
import AddNewsReducer from './AddNewsReducer';
import EditNewsReducer from './EditNewsReducer';
import HomeworksReducer from './HomeworksReducer';
import AddTaskReducer from './AddTaskReducer';
import AddSolutionReducer from './AddSolutionReducer';
import EventReducer from './EventReducer';
import NoteReducer from './NoteReducer';
import TraineeReducer from './TraineeReducer';

const rootReducer = combineReducers({
  user: UserReducer,
  news: NewsReducer,
  newNews: AddNewsReducer,
  selectedNews: EditNewsReducer,
  events: EventReducer,
  trainees: TraineeReducer,
  notes: NoteReducer,
  homeworks: HomeworksReducer,
  newTask: AddTaskReducer,
  newSolution: AddSolutionReducer,
});

export default rootReducer;
