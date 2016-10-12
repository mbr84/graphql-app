import Immutable from 'immutable';

const immutableState = Immutable.map({
  fetching: false,
  data: Immutable.map({}),
});

export const queryReducer = (state = immutableState, action) => {
  switch (action.type) {
    case 'STARTING_REQUEST':
      return state.set('fetching', true);
    case 'FINISHED_REQUEST':
      return state.set('fetching', false)
        .set('data', Immutable.map(action.response.data.goldberg));
    default:
      return state;
  }
};
