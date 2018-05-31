const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

//A function to keep a running total of the number of users that submit an anser for each choice
exports.countAnswers = functions.database.ref(`/activeResponse/{choice}/{userId}`)
.onCreate((snapshot, context) => {
  //If the written datapoint is the counter, do noting
  if (context.params.choice === 'choiceCount') {return {};}
  const countRef = snapshot.ref.parent.parent.child('choiceCount').child(context.params.choice);
  return countRef.once('value')
  .then(snapVal => {
    return snapVal.val() ? snapVal.val() + 1 : 1;
  })
  .then(number => {
    return countRef.set(number);
  });
});


//A function to ask for the results to show 10 seconds after the question is added.
exports.startTimer = functions.database.ref('/activeGame/activeQuestion/question')
.onWrite(change => {
  // Exit when the data is deleted.
  if (!change.after.exists()) {
    return null;
  }
  return new Promise((resolve, reject) => {
        setTimeout(function(){
          //After 10 seconds, show the results of the quiz
          return change.after.ref.parent.parent.child('showResults').set(true);
        }, 10000);
  });
});
