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
    let ids = [];
    questions.forEach(item => {
      if (item.id) {
        ids.push(item.id);
      }
      else {
        let qRef = db.collection('Questions').add(item);
        ids.push(qRef.id);
      }
    });
    // quizRef.collection('questions').update(ids);
    db.collection('Quiz').doc(`${name}`).update({questions: ids});
  })
  .catch(err => console.log(err))
  dispatch(saveQuiz());
};
