/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../actions/actionUser'


export default (ComponentClass, reload, adminRoute = null) => {
  const AuthenticationCheck = (props) => {

    let user = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
      async function fetchData() {
      const response = await dispatch(auth())
      if (!response.payload.isAuth) {
        if (reload) {
          props.history.push('/login')
        }
      } else {
        if (adminRoute && !response.payload.isAdmin) {
          props.history.push('/')
        } else {
          if (reload === false) {
            props.history.push('/')
          }
        }
      }
    }
    fetchData()
    }, [])
    return (
      <ComponentClass {...props} user={user} />
    )
  }
  return AuthenticationCheck
}
