import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import NewsReducer from './NewsReducer';
import AddNewsReducer from './AddNewsReducer';
import EditNewsReducer from './EditNewsReducer';
import HomeworksReducer from './HomeworksReducer';
import AddTaskReducer from './AddTaskReducer';
import AddSolutionReducer from './AddSolutionReducer';
import EventReducer from './EventReducer';
import TraineeReducer from './TraineeReducer';
import NoteReducer from './NoteReducer';
import CorrectSolutionReducer from './CorrectSolutionReducer';

const rootReducer = combineReducers({
  user: UserReducer,
  news: NewsReducer,
  newNews: AddNewsReducer,
  selectedNews: EditNewsReducer,
  homeworks: HomeworksReducer,
  correction: CorrectSolutionReducer,
  newTask: AddTaskReducer,
  newSolution: AddSolutionReducer,
  events: EventReducer,
  trainees: TraineeReducer,
  notes: NoteReducer,
});

export default rootReducer;
