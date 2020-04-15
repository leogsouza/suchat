/* eslint-disable jsx-a11y/anchor-is-valid */
import { Menu } from 'antd'
import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { USER_SERVER } from '../../../config'


const RightMenu = (props) => {
  const user = useSelector(state => state.user)


  const logoutHandler = async () => {
    
    let config = {};
    if (localStorage.getItem("userInfo") != null) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      config = {headers: {Authorization: 'Bearer ' +userInfo.token }}
    }

    const response = await axios.get(`${USER_SERVER}/logout`, config)
    if (response.status === 200) {
      window.localStorage.removeItem("userInfo");
      window.localStorage.removeItem("userId");
      props.history.push('/login')
    } else {
      alert('Log Out Failed')
    }
  }
  console.log('user', user);
  if (user && user.userData &&  user.userData.data && !user.userData.data.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}



export default withRouter(RightMenu)