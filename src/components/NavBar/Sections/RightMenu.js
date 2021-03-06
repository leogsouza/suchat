/* eslint-disable jsx-a11y/anchor-is-valid */
import { Menu } from 'antd'
import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

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
  
  if (user && user.userData &&  user.userData.data && !user.userData.data.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <Link to="/login">Signin</Link>
        </Menu.Item>
        <Menu.Item key="app">
        <Link to="/register">Signup</Link>
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