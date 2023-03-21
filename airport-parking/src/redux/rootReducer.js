import { combineReducers } from 'redux';
import sessionReducer from '../pages/store/Reducer'

const rootReducer = combineReducers({
  session:sessionReducer,
});

export { rootReducer };
