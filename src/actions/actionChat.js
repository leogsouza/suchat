import axios from 'axios'
import { GET_CHATS,AFTER_POST_MESSAGE } from '../constants/types';
import { CHAT_SERVER } from '../config'

export const getChats = async () => {
  const request =  await axios.get(`${CHAT_SERVER}`)

  return {
    type: GET_CHATS,
    payload: request.data
  }
}

export const afterPostMessage = (data) => {
  return {
    type: AFTER_POST_MESSAGE,
    payload: data
  }
}