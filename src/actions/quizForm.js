import {SAVE_QUIZ, TITLE_QUIZ, ADD_QUESTION, REMOVE_QUESTION, CLEAR_QUESTION_FORM, CLEAR_QUIZ_FORM} from './types';
import firebase from 'firebase';

const titleQuiz = title => ({type: TITLE_QUIZ, payload: title});
const newQuestion = question => ({type: ADD_QUESTION, payload: question});
const delQuestion = position => ({type: REMOVE_QUESTION, payload: position});
const saveQuiz = () => ({type: SAVE_QUIZ});
const clearQuestionForm = () => ({type: CLEAR_QUESTION_FORM});
const clearQuizForm = () => ({type: CLEAR_QUIZ_FORM});

export const editName = name => dispatch => dispatch(titleQuiz(name));
export const removeQuestion = pos => dispatch => dispatch(delQuestion(pos));
export const addQuestion = quest => dispatch => {
  dispatch(newQuestion(quest));
  dispatch(clearQuestionForm());
};


export const createQuiz = (name, questions) => dispatch => {
  const db = firebase.firestore();
  db.collection('Quiz').doc(`${name}`).set({name, questions: []})
  .then(() => {
    let questionReferences = [];
    questions.forEach(item => {
      let qRef;
      if (item.id) {
        qRef = db.collection('Questions').doc(`${item.id}`);
      }
      else {
        qRef = db.collection('Questions').doc();
        qRef.set(item);
      }
      questionReferences.push(qRef);
    });
    db.collection('Quiz').doc(`${name}`).update({questions: questionReferences});
  })
  .catch(err => console.log(err));
  dispatch(saveQuiz());
  dispatch(clearQuizForm());
};
