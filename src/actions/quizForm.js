import {SAVE_QUIZ, TITLE_QUIZ, ADD_QUESTION, REMOVE_QUESTION, CLEAR_QUESTION_FORM, CLEAR_QUIZ_FORM, GET_QUIZ} from './types';
import firebase from 'firebase';

const titleQuiz = title => ({type: TITLE_QUIZ, payload: title});
const newQuestion = question => ({type: ADD_QUESTION, payload: question});
const delQuestion = position => ({type: REMOVE_QUESTION, payload: position});
const saveQuiz = () => ({type: SAVE_QUIZ});
const clearQuestionForm = () => ({type: CLEAR_QUESTION_FORM});
const clearQuizForm = () => ({type: CLEAR_QUIZ_FORM});
const getQuiz = quiz => ({type: GET_QUIZ, payload: quiz});


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

export const fetchQuiz = qId => dispatch => {
  const db = firebase.firestore();
  db.collection('Quiz').doc(qId).get()
  .then(quizRef => {
    let data = quizRef.data();
    dispatch(titleQuiz(data.name));
    return data;
  })
  .then(quiz =>
    quiz.questions.forEach( questionRef =>
      questionRef.get()
      .then(val => dispatch(newQuestion(val.data())))
    )
  )
  .catch(err => console.log('Error getting quiz', err));

}
