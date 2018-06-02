import { TRACK_QUESTION, CHOOSE_ANSWER, GET_USER_COUNT, OPEN_ROOM, START_GAME, UPDATE_STANDING, ENTER_ROOM, EXIT_ROOM, GET_QUESTION_COUNT, GET_QUESTION_NUMBER, LAST_QUESTION, GET_RESULTS, VIEW_STATS, HIDE_RESULTS } from './types';
import firebase from 'firebase';

//Action Creators --> Return actions to update application' global state
const roomOpen = (roomId) => ({type: OPEN_ROOM, payload: roomId});
const startGame = () => ({type: START_GAME});
const userOut = message => ({type: UPDATE_STANDING, payload: message});
const trackQuestions = (currentQuestion) => ({type: TRACK_QUESTION, payload: currentQuestion});
const chooseAnswer = () => ({type: CHOOSE_ANSWER});
const getUserCount = count => ({type: GET_USER_COUNT, payload: count});
const rollCall = () => ({type: ENTER_ROOM});
const leave = () => ({type: EXIT_ROOM});
const getQuestionCount = count => ({type: GET_QUESTION_COUNT, payload: count});
const trackQuestionNumber = number => ({type: GET_QUESTION_NUMBER, payload: number});
const lastQuestion = () => ({type: LAST_QUESTION});
const showResults = results => ({type: GET_RESULTS, payload: results});
const timeUp = val => ({type: VIEW_STATS, payload: val});
const noShowResults = () => ({type: HIDE_RESULTS});
const answered = () => ({type: CHOOSE_ANSWER});


/*Functions:
//All User Functions
  -enterRoom : Sets listeners for Firebase RealTime database
  -exitRoom : Updates the RealTime Db so that the user is neither in the game, nor set as a watcher
  -setUserAsWatcher : Removes the user from being in the game but sets the user as a watcher
  -getResults : return the amount of users that picked each answer option

//Admin Functions
  -clearActive: resets the firebase realTime db to empty
  -openRoom: Allows other users to enter game prior to starting
  -nextQuestion: Moves to the next question in the quiz
  -beginQuiz: Starts the quiz; showing first question; users entering after quiz has started will be watchers
  -hideResults: Allows admin to hide the current result component on personal screen
  -getWinners: Displays a list of users still in the game
*/

export const enterRoom = () => dispatch => {
  dispatch(rollCall());
  const user = firebase.auth().currentUser.uid;
  const realTimeDb = firebase.database();
  realTimeDb.ref('/activeGame/started').once('value')
  .then(dataRef => {
    let data = dataRef.val();
    if (data) {
      realTimeDb.ref('/attendees/watching').child(user).set(true);
    }
    else {
      realTimeDb.ref('/attendees/inGame').child(user).set(true);
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
    realTimeDb.ref('/activeGame/showResults')
    .on('value', snapShot => {
     if (snapShot.val()) {
        dispatch(timeUp(snapShot.val()));
     }
    })
  )
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
  realTimeDb.ref('/attendees/inGame').child(currentUser).remove();
  realTimeDb.ref('/attendees/watching').child(currentUser).set(false);
  realTimeDb.ref('/activeGame/activeQuestion').off();
  dispatch(leave());
};

const setUserAsWatcher = (currentUser, dispatch) => {
  const realTimeDb = firebase.database();
  return realTimeDb.ref('/attendees/inGame').child(currentUser).remove()
  .then(() => realTimeDb.ref('/attendees/watching').child(currentUser).set(false)
  )
  .then(() => {
    dispatch(userOut('Incorrect!'));
  })
  .catch(err => console.log('Error setting user as watcher: ', err));
};

export const submitAnswer = (choice) => dispatch => {
  const currentUser = firebase.auth().currentUser.uid;
  const realTimeDb = firebase.database();
  dispatch(chooseAnswer());
  realTimeDb.ref('/activeResponse').child(choice).push(currentUser)
  .then( () => {
    return dispatch(answered());
  })
  .then( () => {
    return realTimeDb.ref('/activeGame/activeQuestion/answer').once('value');
  })
  .then(snapShot => {
    if (choice !== snapShot.val()) {
      setUserAsWatcher(currentUser, dispatch);
    }
  })
  .catch(err => {
    setUserAsWatcher(currentUser, dispatch);
    console.log('Error submitting Response: ', err);
  });
};

export const getResults = () => dispatch => {
  const realTimeDb = firebase.database();
  realTimeDb.ref('/activeResponse/choiceCount')
  .once('value')
  .then(snapShot => snapShot.val() || {})
  .then(results => {
    dispatch(showResults(results));
  })
  .catch(err => {
    console.log('Error getting results', err);
  });
};

//Admin Functions
const clearActive = () => {
  const realTimeDb = firebase.database();
  realTimeDb.ref('/activeGame').remove();
  realTimeDb.ref('/activeQuestions').remove();
  realTimeDb.ref('/activeResponse').remove();
  realTimeDb.ref('/attendees').remove();

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
  .then(() => dispatch(roomOpen())
  )
  .catch(err => {
    console.log('Error opening room', err);
    clearActive();

  });
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
    realTimeDb.ref('/activeGame/activeQuestion').set(question);
    return question.choices;
  })
  .then(() => {
    realTimeDb.ref('/activeGame/showResults').set(false);
  })
  .then(() => {
    realTimeDb.ref('/activeResponse').remove();
  })
  .catch(err => console.log('Error switching questions', err));
};

export const beginQuiz = () => dispatch => {
  const realTimeDb = firebase.database();
  realTimeDb.ref('/activeGame').update({started: true})
  .then(
    nextQuestion()
  )
  .then(() => dispatch(startGame())
  )
  .catch(err => console.log('Error starting Quiz', err));
};

export const hideResults = () => dispatch => {
  dispatch(noShowResults());
};

export const getWinners = () => dispatch => {
  const realTimeDb = firebase.database();
  return realTimeDb.ref('/attendees/inGame')
  .once('value')
  .then(snapShot => snapShot.val() || null)
  .then(winners => Object.keys(winners)
  )
  .then(users => users.map(user => {
    //look through firestoredatabase and get user names based on the userId's
    return user;
  }))
  .then(userNames => console.log("these are thier names",userNames))
  .catch(err => console.log('Error retrieving winners', err));
}
;
