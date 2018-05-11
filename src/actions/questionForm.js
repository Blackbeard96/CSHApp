import {EDIT_CHOICE, EDIT_QUESTION, PICK_ANSWER} from './types';

const editChoice = ({index, text}) => ({type: EDIT_CHOICE, index, text});
const editQuestion = text => ({type: EDIT_QUESTION, payload: text});
const pickAnswer = option => ({type: PICK_ANSWER, payload: option});

export const putChoice = (index, text) => dispatch => dispatch(editChoice({index, text}));
export const putQuestion = text => dispatch => dispatch(editQuestion(text));
export const putAnswer = index => dispatch => dispatch(pickAnswer(index));
