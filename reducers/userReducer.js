import {
    USER_INFOR,
    SET_USER_INFOR,
    GET_USER_NOTIFICATION
} from '../actions/type'

export const userReducer = (state={}, action)=>{
  switch(action.type){
    case USER_INFOR:
      return {...action.payload}
      
    case SET_USER_INFOR:
      return {...state ,...action.payload}

    case GET_USER_NOTIFICATION:
      return {
        ...state,
        notification: action.payload
      }
    default:
      return state;
  }
}