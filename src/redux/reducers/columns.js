import uuid from 'uuid/v4';
import itens from './itens';

const itensReducers = itens(null, { type: 'ALL_ITENS' });

const INITIAL_STATE = {
  [uuid()]: {
    name: 'To Do',
    items: itensReducers,
    tag: 1,
  },
  [uuid()]: {
    name: 'In Progress',
    items: [],
    tag: 2,
  },
  [uuid()]: {
    name: 'Done',
    items: [],
    tag: 3,
  },
};

const columns = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TEST':
      return action.newState;
    case 'ADD_COLUMN':
      return {
        ...state,
        [uuid()]: { name: action.name, items: [] },
      };
    case 'ADD_ITEM':
      return action.newState;
    case 'REMOVE_ITEM':
      return {
        ...state,
        [action.columnId]: action.newState,
      };
    default:
      return state;
  }
};

export default columns;
