import axios from 'axios'
import { AUTH_USER, LOGIN_USER, LOGOUT_USER, REGISTER_USER } from '../constants/types'

const apiURL = process.env.REACT_APP_API_URL

export const registerUser = async (userData) => {
  const request = await axios.post(`${apiURL}/register`, userData)

  return {
    type: REGISTER_USER,
    payload: request
  }
}

export const loginUser = async (loginData)  => {
  const request = await axios.post(`${apiURL}/login`, loginData)

  return {
    type: LOGIN_USER,
    payload: request
  }
}


export const auth = async ()  => {
  const request = await axios.get(`${apiURL}/auth`)

  return {
    type: AUTH_USER,
    payload: request
  }
}

export const logoutUser = async (loginData)  => {
  const request = await axios.get(`${apiURL}/logout`)

  return {
    type: LOGOUT_USER,
    payload: request
  }
}