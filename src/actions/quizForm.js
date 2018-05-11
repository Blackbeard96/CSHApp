import {SAVE_QUIZ, TITLE_QUIZ, ADD_QUESTION, REMOVE_QUESTION} from './types';
import firebase from 'firebase';

const titleQuiz = title => ({type: TITLE_QUIZ, payload: title});
const newQuestion = question => ({type: ADD_QUESTION, payload: question});
const delQuestion = position => ({type: REMOVE_QUESTION, payload: position});
const saveQuiz = () => ({type: SAVE_QUIZ});

export const editName = name => dispatch => dispatch(titleQuiz(name));
export const addQuestion = quest => dispatch => dispatch(newQuestion(quest));
export const removeQuestion = pos => dispatch => dispatch(delQuestion(pos));

export const createQuiz = (name, questions) => dispatch => {
  console.log("adding this", name, questions);
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
  .catch(err => console.log(err))
  dispatch(saveQuiz());
};
