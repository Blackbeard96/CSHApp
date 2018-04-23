import PushNotification from 'react-native-push-notification';
import PushNotificationAndroid from 'react-native-push-notification';
import {PushNotificationIOS, DeviceEventEmitter} from 'react-native';
import {androidGCM} from '../../secrets.js';

const configure = () => {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        console.log( 'TOKEN:', token );
    },
    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
        // process the notification
        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: androidGCM,
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },
    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,
    /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
    requestPermissions: true,
  });
};

const localNotification = ({bigText, title, message, actions, vibrate}) => {
  PushNotification.localNotification({
    autoCancel: true,
    bigText,
    vibrate,
    vibration: 300,
    title,
    message,
    playSound: true,
    soundName: 'default',
    actions
  });
};
const scheduleNotification = ({bigText, title, message, date, actions}) => {
  PushNotification.localNotificationSchedule({
    title: title,
    message: message,
    date: date,
    actions: actions,
    bigText: bigText
  });
};


const register = () => {};
(function() {
  // Register all the valid actions for notifications here and add the action handler for each action
  PushNotificationAndroid.registerNotificationActions(['ActionTitle']);
  DeviceEventEmitter.addListener('notificationActionReceived', function(e){
    console.log('notificationActionReceived event received: ' + e);
    const info = JSON.parse(e.dataJSON);
    if (info.action == 'ActionTitle') {
      console.log('completing a notification action ');
      //Do Something
    }
  });
})();

export {
  configure,
  localNotification,
  scheduleNotification,
  register
};

/*Notification object example:
{
    foreground: false, // BOOLEAN: If the notification was received in foreground or not
    userInteraction: false, // BOOLEAN: If the notification was opened by the user from the notification area or not
    message: 'My Notification Message', // STRING: The notification message
    data: {}, // OBJECT: The push data
}
*/
