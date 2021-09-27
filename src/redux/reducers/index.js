import { combineReducers } from 'redux';
import itens from './itens';
import columns from './columns';

export default combineReducers({
  itens,
  columns,
});
