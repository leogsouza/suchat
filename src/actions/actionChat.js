import axios from 'axios'
import { GET_CHATS } from '../constants/types';
import { CHAT_SERVER } from '../config'

export const getChats = async () => {
  const request =  await axios.get(`${CHAT_SERVER}/getChats`)

  return {
    type: GET_CHATS,
    payload: request
  }

}