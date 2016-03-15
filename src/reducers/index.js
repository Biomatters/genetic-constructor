import { routerReducer as router } from 'react-router-redux';
import { combineReducers } from 'redux';
import undoReducerCreator from '../store/undo/reducerEnhancer';

const undoReducerWrapper = undoReducerCreator();

import blocks from './blocks';
import inventory from './inventory';
import inspector from './inspector';
import projects from './projects';
import ui from './ui';
import user from './user';

const rootReducer = combineReducers({
  router,
  blocks,
  inventory,
  inspector,
  projects,
  ui,
  user,
});

const undoableReducer = undoReducerWrapper(rootReducer);

export default undoableReducer;
