import { TRACK_QUESTION, CHOOSE_ANSWER, GET_USER_COUNT, OPEN_ROOM, START_GAME, UPDATE_STANDING, ENTER_ROOM, EXIT_ROOM } from './types';
import firebase from 'firebase';


const roomOpen = (roomId) => ({type: OPEN_ROOM, payload: roomId});
const startGame = () => ({type: START_GAME});

const getStanding = inGame => ({type: UPDATE_STANDING, payload: inGame});
const trackQuestions = (currentQuestion) => ({type: TRACK_QUESTION, payload: currentQuestion});
const chooseAnswer = () => ({type: CHOOSE_ANSWER});
const getUserCount = count => ({type: GET_USER_COUNT, payload: count});
const rollCall = () => ({type: ENTER_ROOM});
const leave = () => ({type: EXIT_ROOM});

export const enterRoom = () => dispatch => {
  dispatch(rollCall());
  const user = firebase.auth().currentUser.uid;

  const realTimeDb = firebase.database();
  realTimeDb.ref('/activeGame').once('value')
  .then(dbRef => {
    let data = dbRef.val();
    if (data.started) {
      realTimeDb.ref('/attendees/' + user).set({inGame: false});
    }
    else {
      realTimeDb.ref('/attendees/' + user).set({inGame: true});
    }
    dispatch(getUserCount(data.players));
  })
  .then(() => {
    realTimeDb.ref('/activeGame/activeQuestion')
    .on('value', snapShot => {
      if (snapShot.val()) {
        dispatch(trackQuestions(snapShot.val()));
      }
    });
  })
  .catch(err => console.log('Error entering room', err));
};

export const exitRoom = () => dispatch => {
  const currentUser = firebase.auth().currentUser.uid;

  const realTimeDb = firebase.database();
  realTimeDb.ref('/attendees/' + currentUser).set({inGame: false});
  realTimeDb.ref('/activeGame/activeQuestion').off();
  dispatch(leave());

};

export const submitAnswer = choice => dispatch => {
  const currentUser = firebase.auth().currentUser.uid;
  const realTimeDb = firebase.database();
  dispatch(chooseAnswer());
  realTimeDb.ref('/activeGame/activeQuestion/answer').once('value')
  .then(snapShot => {
    if (choice != snapShot.val()) {
      realTimeDb.ref('/attendees').doc(currentUser).set({inGame: false});
      getStanding(false);
    }
  });
};


const clearActive = () => {
  const realTimeDb = firebase.database();
  realTimeDb.ref('/activeGame').remove();
  realTimeDb.ref('/activeQuestions').remove();
};

export const openRoom = quizId => dispatch => {
  clearActive();
  const firestoreDb = firebase.firestore();
  const realTimeDb = firebase.database();
  firestoreDb.collection('Quiz').doc(`${quizId}`).get()
  .then(quizData => {
      let quiz = quizData.data();
      realTimeDb.ref('/activeGame').set({
        name: quiz.name,
        questionCount: quiz.questions.length,
        currentQuestionIndex: 0,
        started: false,
        quizId: quizData.id,
        activeQuestion: {},
        players: 0
      });
      return quizData;
  })
  .then(quizData => {
    const questions = quizData.data().questions;
    return questions.map((ref, index) => {
      return ref.get()
      .then(val =>
        realTimeDb.ref(`/activeQuestions/${index}`).add(val.data())
      );
    });
  })
  .catch(err => {
    console.log('Error opening room', err);
    clearActive();

  });
};


export const beginQuiz = () => dispatch => {
  const realTimeDb = firebase.database();
  realTimeDb.ref('/activeGame').update({started: true})
  .then()
  .catch(err => console.log('Error starting Quiz', err));
};

export const nextQuestion = () => dispatch => {
  const realTimeDb = firebase.database();
  realTimeDb.ref('/activeGame/currentQuestionIndex').get()
};

// const realTimeDb = firebase.database();
// realTimeDb.ref('/activeGame/currentQuestionIndex').get()
// .then(idx => {
//   console.log()
// })
