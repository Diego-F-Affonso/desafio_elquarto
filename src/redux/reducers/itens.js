import uuid from 'uuid/v4';

const INITIAL_STATE = [
  { id: uuid(), content: 'First task' },
  { id: uuid(), content: 'Second task' },
];

const itens = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ALL_ITENS':
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default itens;
