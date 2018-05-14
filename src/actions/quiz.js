import {GET_QUIZZES} from './types';
import firebase from 'firebase';

const getQuizzes = quizData => ({type: GET_QUIZZES, payload: quizData});

export const fetchQuizzes = () => dispatch => {
  const {user} = firebase.auth();
  const db = firebase.firestore();
  db.collection('Quiz')
  .onSnapshot(function(querySnapshot) {
    var quizzes = [];
    querySnapshot.forEach(function(doc) {
      // console.log(doc)
        quizzes.push({id: doc.id, name: doc.data().name});
    });
    dispatch(getQuizzes(quizzes));
  });
};
