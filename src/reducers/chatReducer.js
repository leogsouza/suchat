import { GET_CHATS } from '../constants/types'

 export default (state={}, action) => {
  switch(action.type) {
    case GET_CHATS:
      return {...state, chats: action.payload }
    default:
      return state
  }
 }