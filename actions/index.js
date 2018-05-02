import { 
  ALL_DECK,
  ADD_QUESTION,
  ADD_NEW_DECK,
  UPDATE_CORRECT_ANWSER,
  USER_INFOR,
  SET_USER_INFOR,
  UPDATE_PROGRESS_USER,
  ADD_DECK_TO_PROGRESS,
  ADD_QUESTION_TO_PROGRESS,
  GET_USER_NOTIFICATION,
  SHOW_FLASH_NOTIFICATION,
  HIDE_FLASH_NOTIFICATION

} from './type';
import {getDeck 
  ,addDeck , 
  addQuestionToLocal ,
  updateCorrectAnswer ,
  getUserInfor ,
  setUserInfor ,
  updateProgress ,
  addProgressQuestion ,
  addNewDeckToUserProgress ,
  getNotificationInfor} from '../utils'
//action file 

export const getAllDeck = () =>{
  return async (dispatch)=>{
    let allDeck = await getDeck();
    if(allDeck){
    dispatch({
      type: ALL_DECK,
      payload: allDeck
    }) 
  }
}
  
}


export const addQuestion = (key , question) =>{
  return async (dispatch) =>{
    addQuestionToLocal(key,question).then(()=>{
          dispatch({type: ADD_QUESTION , payload : {key: key,question: question}});
      })
  }
}

export const addNewDeck = (key) =>{
 return async (dispatch) =>{
   addDeck(key).then(()=>{
        dispatch({type: ADD_NEW_DECK, payload : {key: key}});
   })
 }
}

export const updateCorrect = (title , correct)=>{
  return async (dispatch)=>{
    try{
      let updateCorrectAns = await updateCorrectAnswer(title , correct);
      dispatch({type: UPDATE_CORRECT_ANWSER , payload: updateCorrectAns})
    }catch(e){
      console.log("get null object in action ")
    }
    
  }
}


// User
export const getUser = ()=>{
  return async (dispatch)=>{
    let User = await getUserInfor();
    dispatch({type: USER_INFOR , payload: User})
    
  }
}

export const setUser = (name = "", avatarUri = "")=>{
  return async (dispatch)=>{
    let newInfor = await setUserInfor(name , avatarUri);
    dispatch({type: SET_USER_INFOR, payload: newInfor})
  }
}

export const getNotification = ()=>{
  return async (dispatch)=>{
    let notification = await getNotificationInfor();
    dispatch({type: GET_USER_NOTIFICATION , payload: notification})
  }
 

}
