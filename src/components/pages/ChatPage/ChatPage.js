import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Form, Icon, Input, Button, Row, Col } from 'antd'
import io from 'socket.io-client'
import * as moment from 'moment'

import { getChats } from '../../../actions/actionChat'
import ChatCard from './Section/ChatCard'

const apiURL = process.env.REACT_APP_API_URL
const socket = io.connect('ws://localhost:9999', { transports: ['websocket'] })


const ChatPage = (props) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  let messagesEnd = null;
  const [chats, setChats] = useState([])
  const [chatMessage, setChatMessage] = useState("")

  useEffect( () => {  
    // use IIFE to call async getChats on useEffect 
    (async () => {
      setChats((await dispatch(getChats())).payload.data)
    })()
    
    socket.on('output_message', payload => {
      console.log('payload received', payload)
    })
  }, [])

  const renderCards = () => (
     chats && chats.map(chat => (
      <ChatCard 
        key={chat.id}
        {...chat}
        user={chat.sender}
      />
    )))
  

  const handleChatMessage = evt=> {
    setChatMessage(evt.target.value)
  }

  const submitChatMessage = evt => {
    evt.preventDefault()
    
    let userId = props.user.userData.data.id
    let username = props.user.userData.data.name
    let userImage = props.user.userData.data.avatarUrl
    let nowTime = moment().toISOString()
    let type = 'Image'
    const body = {
      userId: userId,
      username: username,
      userImage: userImage,
      nowTime: nowTime,
      message: chatMessage,
      type: type
    }
    
    socket.emit('input_message', body, function(response) {
      console.log(response)
    })
    
    setChatMessage("")
    
  }



    return (
      <React.Fragment>
        <div>
          <p style={{ fontSize: '2rem', textAlign: 'center' }}>Real Time Chat</p>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div id="cards" className="infinite-container">
            {chats && (
              <div>{renderCards()}</div>
              )}
              <div ref={el => (messagesEnd = el)} style={{ float: "left", clear: "both"}} />
          </div>

          <Row>
            <Form layout="inline" onSubmit={submitChatMessage}>
              <Col span={18}>
                <Input
                  id="message"
                  prefix={<Icon type="message" style={{color: 'rgba(0, 0, 0, .25)'}} />}
                  placeholder="Let's start talking"
                  type="text"
                  value={chatMessage}
                  onChange={handleChatMessage}
                />
              </Col>
              <Col span={2}>

              </Col>
              <Col span={4}>
                <Button type="primary" style={{ width: '100%'}} onClick={submitChatMessage} htmlType="submit">
                  <Icon type="enter" />
                </Button>
              </Col>
            </Form>
          </Row>
        </div>
      </React.Fragment>
    )
  }


export default ChatPage