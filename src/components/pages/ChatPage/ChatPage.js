import React, { useRef,useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Form, Icon, Input, Button, Row, Col } from 'antd'
import { withRouter } from 'react-router-dom'
import io from 'socket.io-client'
import * as moment from 'moment'

import { getChats, afterPostMessage } from '../../../actions/actionChat'
import ChatCard from './Section/ChatCard'

const socket = io.connect('ws://localhost:9999', { transports: ['websocket'] })


const ChatPage = (props) => {

  const dispatch = useDispatch()
  let messagesEnd = useRef(null);
  const chats = useSelector(state => state.chat.chats)  
  const [chatMessage, setChatMessage] = useState("")

  useEffect( () => {  
    // use IIFE to call async getChats on useEffect 
    (async () => {
      await dispatch(getChats())
      messagesEnd.current.scrollIntoView({behaviour: 'smooth'})
    })()
    
  }, [])

  useEffect(() => {
    socket.on('output_message', messageFromBackend => {
      
      dispatch(afterPostMessage(messageFromBackend))
      messagesEnd.current.scrollIntoView({behaviour: 'smooth'})
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
    let type = 'Text'
    const body = {
      userId: userId,
      username: username,
      userImage: userImage,
      nowTime: nowTime,
      message: chatMessage,
      type: type
    }
    
    socket.emit('input_message', body)
    
    setChatMessage("")
    
  }  

    return (
      <React.Fragment>
        <div>
          <p style={{ fontSize: '2rem', textAlign: 'center' }}>Real Time Chat</p>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="infinite-container" style={{height: '500px', overflowY: 'scroll'}}>
            {chats && (
              <div>{renderCards()}</div>
              )}
              <div ref={messagesEnd} style={{ float: "left", clear: "both"}} />
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


export default withRouter(ChatPage)