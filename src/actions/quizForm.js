import {SAVE_QUIZ, TITLE_QUIZ, ADD_QUESTION, REMOVE_QUESTION, CLEAR_QUESTION_FORM, CLEAR_QUIZ_FORM, UPDATED_QUIZ} from './types';
import firebase from 'firebase';


//Action Creators
const titleQuiz = title => ({type: TITLE_QUIZ, payload: title});
const newQuestion = question => ({type: ADD_QUESTION, payload: question});
const delQuestion = position => ({type: REMOVE_QUESTION, payload: position});
const saveQuiz = () => ({type: SAVE_QUIZ});
const clearQuestionForm = () => ({type: CLEAR_QUESTION_FORM});
const clearQuizForm = () => ({type: CLEAR_QUIZ_FORM});
const updatingQuiz = quiz => ({type: UPDATED_QUIZ, payload: quiz});


/*Functions:
-editName: changes the name of the Quiz in the app's global state
-removeQuestion: removes a question from the list in the app's global state
-addQuestion: adds a question to the list in the app's global state
-getQuestionRegs:
    --> Input: an array of objects each containing either
        1)an id: refering to its id in the current firebase firestore
        2) a question and its answer choices
   --> Output:
      an array of references to the question in the firebase firestore after creating an instance of questions with no previous id
-postQuiz: Saves data from the app's global state to the firebase firestore
-putQuiz: Edits a quiz in the firebase firestore
-fetchQuiz: retrieves a quiz from the firebase firestore with a specified id
-clearForms: return redecures to their default state
*/
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
  const questionReferences = getQuestionRefs(questions);
  db.collection('Quiz').add({name})
  .then(quizRef => {
    quizRef.update({questions: questionReferences});
  })
  .then(() => {
    dispatch(saveQuiz());
    dispatch(clearQuizForm());
  })
  .catch(err => console.log(err));
};

export const putQuiz = (id, update) => dispatch => {
  const db = firebase.firestore();
  update.questions = getQuestionRefs(update.questions);

  db.collection('Quiz').doc(`${id}`).get()
  .then(() => {
    update.questions = getQuestionRefs(update.questions);
  })
  .then(() => db.collection('Quiz').doc(`${id}`).update(update)
  )
  .then(() => {
    dispatch(updatingQuiz());
    dispatch(clearQuizForm());
  })
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
