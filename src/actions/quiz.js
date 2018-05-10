import {EDIT_QUIZ, EDIT_QUESTIONS, CREATE_QUIZ} from './types';
import firebase from 'firebase';

const editQuizName = name => ({type: EDIT_QUIZ, payload: name});
const changeQuestion = question => ({type: EDIT_QUESTIONS, payload: question});
const saveQuiz = () => ({type: CREATE_QUIZ});

export const editName = name => dispatch => dispatch(editQuizName(name));
export const addQuestion = quest => dispatch => dispatch(changeQuestion(quest));

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
  .catch(err => console.log(err))
  dispatch(saveQuiz());
};
