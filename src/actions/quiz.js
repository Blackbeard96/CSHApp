import {GET_QUIZZES, DELETE_QUIZ} from './types';
import firebase from 'firebase';

const getQuizzes = quizData => ({type: GET_QUIZZES, payload: quizData});
const destroyQuiz = () => ({type: DELETE_QUIZ});

export const fetchQuizzes = () => dispatch => {
  const currentUser = firebase.auth().currentUser.uid;
  const db = firebase.firestore();
  db.collection('Quiz')
  .onSnapshot(function(querySnapshot) {
    var quizzes = [];
    querySnapshot.forEach(function(doc) {
        quizzes.push({id: doc.id, name: doc.data().name, questons: doc.questions});
    });
    dispatch(getQuizzes(quizzes));
  });
};

export const deleteQuiz = id => dispatch => {
  const db = firebase.firestore();
  db.collection('Quiz').doc(id).delete()
  .then(() => dispatch(destroyQuiz()))
  .catch(err => console.log('Error deleting quiz', err));
};

