import { combineReducers } from 'redux';
import movies from './nodes';

const rootReducer = combineReducers({
  movies,
});

export default rootReducer;
