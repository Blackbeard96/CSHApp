import { TRACK_QUESTION, CHOOSE_ANSWER, GET_USER_COUNT, OPEN_ROOM, START_GAME } from './types';
import firebase from 'firebase';

const trackQuestions = (currentQuestion) => ({type: TRACK_QUESTION, payLoad: currentQuestion});
const chooseAnswer = () => ({type: CHOOSE_ANSWER});
const getUserCount = count => ({type: GET_USER_COUNT, payLoad: count});
const roomOpen = (roomId) => ({type: OPEN_ROOM, payload: roomId});
const startGame = () => ({type: START_GAME});

export const getCurrentQuestion = () => dispatch => {
  const {currentUser} = firebase.auth();

};

export const submitAnswer = choice => dispatch => {

};

export const openRoom = quizId => dispatch => {
  const {user} = firebase.auth();
  const firestoreDb = firebase.firestore();
  const realTimeDb = firebase.database();
  // const realTimeDbAttendance = firebase.database().ref('/activeAttendance');
  firestoreDb.collection('Quiz').doc(`${quizId}`).get()
  .then(quizData => {
      let quiz = quizData.data();
      realTimeDb.ref('/activeGame').set({
        name: quiz.name,
        questionCount: quiz.questions.length,
        currentQuestionIndex: 0,
        started: false,
        id: quizData.id,
        activeQuestion: {}
      });
      return quizData;
  })
  .then(quizData => {
    const questions = quizData.data().questions;
    return questions.map(ref => {
      return ref.get()
      .then(val =>
        realTimeDb.ref('/activeQuestions').push(val.data())
      );
    });
  })
  .catch(err => {
    console.log('Error opening room', err);
    realTimeDb.ref('/activeGame').remove();
    realTimeDb.ref('/activeQuestions').remove();

  });
};

export const beginQuiz = quizId => dispatch => {


};
