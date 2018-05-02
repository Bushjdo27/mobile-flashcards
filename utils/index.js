import { AsyncStorage, Dimensions } from 'react-native';
import { Notifications, Permissions } from 'expo';
import { DECK_DATA_LOCAL, NOTIFICATION_KEYS, USER_KEYS } from '../actions/type';

// export const NOTIFICATION_KEYS = 'UdaciCards:notifications';
// export const USER_KEYS = 'UdaciCards:UserInfor'
// utils file 
const DATA = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'true'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'false'
      }
    ],
    correctAnwser: 0
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'true'
      }
    ],
    correctAnwser: 0
  }
}

const User = {
  name: "",
  avatarUri: "",
  notification: {}
}

export const SCREEN_WIDTH = Dimensions.get('window').width;


export const getDeck = async () => {
  try {
    let result = await AsyncStorage.getItem(DECK_DATA_LOCAL);

    if (!result) {
      await AsyncStorage.setItem(DECK_DATA_LOCAL, JSON.stringify(DATA));
      return DATA;
    } else {
      let Decks = JSON.parse(result)
      return Decks;
    }

  } catch (e) {
    return null;
  }
}
export const addDeck = async (newDeckTitle) => {


  let result = await AsyncStorage.getItem(DECK_DATA_LOCAL);
  let allDeck = JSON.parse(result);
  let newDeckAdd = {
    ...allDeck,
    [newDeckTitle]: {
      title: newDeckTitle,
      questions: [],
      correctAnwser: 0
    }
  }
  await AsyncStorage.setItem(DECK_DATA_LOCAL, JSON.stringify(newDeckAdd));
  return newDeckAdd;
}
export const addQuestionToLocal = async (key, question) => {

  let result = await AsyncStorage.getItem(DECK_DATA_LOCAL);
  let allDeck = JSON.parse(result);
  let newDataUpdate = {
    ...allDeck,
    [key]: {
      ...allDeck[key],
      questions: [
        ...allDeck[key].questions,
        question
      ]
    }
  }

  await AsyncStorage.setItem(DECK_DATA_LOCAL, JSON.stringify(newDataUpdate));

  return newDataUpdate;

}

export const updateCorrectAnswer = async (title, correct) => {
  try {
    let result = await AsyncStorage.getItem(DECK_DATA_LOCAL);
    let Data = JSON.parse(result);

    let updateData = {
      ...Data,
      [title]: {
        ...Data[title],
        correctAnwser: correct
      }
    }
    await AsyncStorage.setItem(DECK_DATA_LOCAL, JSON.stringify(updateData));
    return updateData;
  } catch (e) {
    console.log("Error , can not update corect answer , Utils")
  }

}

// Notification
export const clearLocalNotification = async () => {
  await AsyncStorage.removeItem(NOTIFICATION_KEYS);
  await Notifications.cancelAllScheduledNotificationsAsync()

}

export const createLocalNotification = () => {
  return {
    title: 'UdaciCard',
    body: "Don't forget to check yourself",
    ios: { sound: true },
    android: { sound: true, priority: 'high', sticky: false, vibrate: true }
  }
}

export const setLocalNotification = async (date = null, hours = 20, minutes = 0) => {
  try {
    let result = await AsyncStorage.getItem(NOTIFICATION_KEYS);
    let UserResult = await AsyncStorage.getItem(USER_KEYS);
    let User = JSON.parse(UserResult)
    if (!result) {
      let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status === 'granted') {

        Notifications.cancelAllScheduledNotificationsAsync()
        if (date) {
          let notification = date;
          notification.setHours(hours);
          notification.setMinutes(minutes);
          Notifications.scheduleLocalNotificationAsync(
            createLocalNotification(),
            {
              time: notification,
            }
          )
          await AsyncStorage.setItem(NOTIFICATION_KEYS, JSON.stringify({ manual: true, daily: false, date: date.toString(), hours: hours, minutes: minutes }))
          await AsyncStorage.setItem(USER_KEYS, JSON.stringify({ ...User, notification: { manual: true, daily: false, date: date.toString(), hours: hours, minutes: minutes } }))
          return

        } else {
          let tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(hours);
          tomorrow.setMinutes(minutes);
          Notifications.scheduleLocalNotificationAsync(
            createLocalNotification(),
            {
              time: tomorrow,
              repeat: 'day'
            }
          )
          await AsyncStorage.setItem(NOTIFICATION_KEYS, JSON.stringify({ daily: true, manual: false, hours, minutes }))
          await AsyncStorage.setItem(USER_KEYS, JSON.stringify({ ...User, notification: { daily: true, manual: false, hours, minutes } }))
          return
        }

      }
    }
  } catch (e) {
    console.log("null object")
  }

}

// User Infor
export const getUserInfor = async () => {
  try {
    let result = await AsyncStorage.getItem(USER_KEYS)

    if (result) {
      return JSON.parse(result)
    } else {
      await AsyncStorage.setItem(USER_KEYS, JSON.stringify(User))
      return User;
    }
  } catch (e) {
    console.log("Error getting user");
    return null;
  }
}


export const setUserInfor = async (name = "", avatarUri = "") => {
  try {
    let result = await AsyncStorage.getItem(USER_KEYS);
    let User = JSON.parse(result);
    let newInfor = { name: name, avatarUri: avatarUri }

    let UserUpdate = {
      ...User,
      ...newInfor
    }
    await AsyncStorage.setItem(USER_KEYS, JSON.stringify(UserUpdate));
    return newInfor;
  } catch (e) {
    console.log("Error");
    return null;
  }
}

export const getNotificationInfor = async () => {
  let result = await AsyncStorage.getItem(NOTIFICATION_KEYS);
  if (result) {
    let notification = JSON.parse(result);
    return notification;
  } else {
    return { daily: true, manual: false, hours: 20, minutes: 0 }
  }

}


/*
export const setLocalNotificationLearn = ()=>{
  AsyncStorage.getItem(NOTIFICATION_KEYS)
      .then(JSON.parse)
      .then((data)=>{
          if(data === null){
              Permissions.askAsync(Permissions.NOTIFICATIONS)
                  .then(({status})=>{
                      if(status === 'granted'){
                          Notifications.cancelAllScheduledNotificationsAsync()
                          let tomorrow = new Date();
                          tomorrow.setDate(tomorrow.getDate() + 1);
                          tomorrow.setHours(20);
                          tomorrow.setMinutes(0);
                          Notifications.scheduleLocalNotificationAsync(
                              createLocalNotification(),
                              {
                                  time: tomorrow,
                                  repeat: 'day'
                              }
                          )
                          AsyncStorage.setItem(NOTIFICATION_KEYS , JSON.stringify(true))

                      }
                  })
          }
      })

}
*/