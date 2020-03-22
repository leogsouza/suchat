/* eslint-disable jsx-a11y/anchor-is-valid */
import { Menu } from 'antd'
import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'


const RightMenu = (props) => {
  const user = useSelector(state => state.user)

  const logoutHandler = async () => {
    const apiURL = process.env.REACT_APP_API_URL
    console.log('apiURL', apiURL)
    const response = await axios.get(`${apiURL}/logout`)
    if (response.status === 200) {
      props.history.push('/login')
    } else {
      alert('Log Out Failed')
    }
  }
  console.log('user', user);
  if (user.userData && !user.userData.isAuth) {
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