const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

//A function to keep a running total of the number of users that submit an anser for each choice
exports.countAnswers = functions.database.ref(`/activeResponse/{choice}/{userId}`)
.onCreate((snapshot, context) => {
  //If the written datapoint is the counter, do noting
  if (context.params.userId === 'choiceCount') {return {};}
  const countRef = snapshot.ref.parent.child('choiceCount');
  return countRef.once('value')
  .then(snapVal => {
    return snapVal.val() ? snapVal.val() + 1 : 1;
  })
  .then(number => {
    return countRef.set(number);
  });

});
