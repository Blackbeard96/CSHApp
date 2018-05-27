import { TRACK_QUESTION, CHOOSE_ANSWER, GET_USER_COUNT, OPEN_ROOM, START_GAME, UPDATE_STANDING, ENTER_ROOM, EXIT_ROOM, GET_QUESTION_COUNT, GET_QUESTION_NUMBER, LAST_QUESTION } from './types';
import firebase from 'firebase';


const roomOpen = (roomId) => ({type: OPEN_ROOM, payload: roomId});
const startGame = () => ({type: START_GAME});

const getStanding = inGame => ({type: UPDATE_STANDING, payload: inGame});
const trackQuestions = (currentQuestion) => ({type: TRACK_QUESTION, payload: currentQuestion});
const chooseAnswer = () => ({type: CHOOSE_ANSWER});
const getUserCount = count => ({type: GET_USER_COUNT, payload: count});
const rollCall = () => ({type: ENTER_ROOM});
const leave = () => ({type: EXIT_ROOM});
const getQuestionCount = count => ({type: GET_QUESTION_COUNT, payload: count});
const trackQuestionNumber = number => ({type: GET_QUESTION_NUMBER, payload: number});
const lastQuestion = () => ({type: LAST_QUESTION});

export const enterRoom = () => dispatch => {
  dispatch(rollCall());
  const user = firebase.auth().currentUser.uid;

  const realTimeDb = firebase.database();
  realTimeDb.ref('/activeGame/started').once('value')
  .then(dataRef => {
    let data = dataRef.val();
    if (data) {
      realTimeDb.ref('/attendees/' + user).set({inGame: false});
    }
    else {
      realTimeDb.ref('/attendees/' + user).set({inGame: true});
    }
  })
  .then(() => {
    realTimeDb.ref('/activeGame/activeQuestion')
    .on('value', snapShot => {
      if (snapShot.val()) {
        dispatch(trackQuestions(snapShot.val()));
      }
    });
  })
  .then(() => {
    realTimeDb.ref('/activeGame/currentQuestionIndex')
    .on('value', snapShot => {
        dispatch(trackQuestionNumber(snapShot.val() + 1));
    });
  })
  .then(() =>
  realTimeDb.ref('/activeGame').child('questionCount').once('value')
  )
  .then(dataRef => {
    let data = dataRef.val();
    dispatch(getQuestionCount(data));
  })
  .then(() => {
    realTimeDb.ref('/activeGame/players')
    .on('value', snapShot => {
        dispatch(getUserCount(snapShot.val()));
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
      realTimeDb.ref('/attendees').child(currentUser).set({inGame: false});
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
        currentQuestionIndex: -1,
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
        realTimeDb.ref('/activeQuestions').child(index).set(val.data())
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
  realTimeDb.ref('/activeGame').once('value')
  .then(snapshot => {
    const {currentQuestionIndex, questionCount} = snapshot.val();
    if (currentQuestionIndex + 1 == questionCount - 1) {
      dispatch(lastQuestion());
    }
    return currentQuestionIndex + 1;
  })
  .then(newIndex => {
    realTimeDb.ref('/activeGame/currentQuestionIndex').set(newIndex);
    return newIndex;
  })
  .then(index => {
    return realTimeDb.ref('/activeQuestions/').child(index).once('value');
  })
  .then(questionSnapshot => {
    const question = questionSnapshot.val();
    return realTimeDb.ref('/activeGame/activeQuestion').set(question);
  })
  .catch(err => console.log('Error switching questions', err));
};
