import {} from '../actions/types';
const defaultState = {
  name: '',
  questions: ''
};


export default function (state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
