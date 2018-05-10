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
      if (item.id) {
        let qRef = db.collection('Questions').doc(`${item.id}`);
        questionReferences.push(qRef);
      }
      else {
        let newQ = db.collection('Questions').doc();
        newQ.set(item);
        questionReferences.push(newQ);

      }
    });
    db.collection('Quiz').doc(`${name}`).update({questions: questionReferences});
  })
  .catch(err => console.log(err))
  dispatch(saveQuiz());
};
