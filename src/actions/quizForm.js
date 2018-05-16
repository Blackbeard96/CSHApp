import {SAVE_QUIZ, TITLE_QUIZ, ADD_QUESTION, REMOVE_QUESTION, CLEAR_QUESTION_FORM, CLEAR_QUIZ_FORM, UPDATED_QUIZ} from './types';
import firebase from 'firebase';

const titleQuiz = title => ({type: TITLE_QUIZ, payload: title});
const newQuestion = question => ({type: ADD_QUESTION, payload: question});
const delQuestion = position => ({type: REMOVE_QUESTION, payload: position});
const saveQuiz = () => ({type: SAVE_QUIZ});
const clearQuestionForm = () => ({type: CLEAR_QUESTION_FORM});
const clearQuizForm = () => ({type: CLEAR_QUIZ_FORM});
const updatingQuiz = quiz => ({type: UPDATED_QUIZ, payload: quiz});


export const editName = name => dispatch => dispatch(titleQuiz(name));

export const removeQuestion = pos => dispatch => dispatch(delQuestion(pos));

export const addQuestion = quest => dispatch => {
  dispatch(newQuestion(quest));
  dispatch(clearQuestionForm());
};

const getQuestionRefs = questions => {
  const db = firebase.firestore();
  return questions.map(item => {
    let qRef;
    if (item.id) {
      qRef = db.collection('Questions').doc(`${item.id}`);
    }
    else {
      qRef = db.collection('Questions').doc();
      qRef.set(item);
    }
    return qRef;
  });
};

export const postQuiz = (name, questions) => dispatch => {
  const db = firebase.firestore();
  db.collection('Quiz').doc(`${name}`).set({name, questions: []})
  .then(() => getQuestionRefs(questions)
  )
  .then(questionReferences => {
    db.collection('Quiz').doc(`${name}`).update({questions: questionReferences});
  })
  .then(() => {
    dispatch(saveQuiz());
    dispatch(clearQuizForm());
  })
  .catch(err => console.log(err));
};

export const putQuiz = (id, update) => dispatch => {
  const db = firebase.firestore();
  db.collection('Quiz').doc(`${id}`).get()
  .then(() => {
    if (update.questions) {
      update.questions = getQuestionRefs(update.questions);
    }
  })
  .then(() => db.collection('Quiz').doc(`${id}`).update(update)
  )
  .then(() => dispatch(updatingQuiz()))
  .catch(err => console.log('Error updating Quiz', err));
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
};

export const clearForms = () => dispatch => {
  dispatch(clearQuestionForm());
  dispatch(clearQuizForm());
};
