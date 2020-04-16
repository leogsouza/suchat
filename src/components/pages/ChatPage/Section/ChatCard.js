import React from 'react'
import {Comment, Tooltip, Avatar} from 'antd'
import * as moment from 'moment'

const ChatCard = (props) => (
  <div>
    <Comment
      author={props.sender.name}
      avatar={
        <Avatar
          src={props.sender.avatar_url} alt={props.sender.name}
        />
      }
      content={
        <p>
          {props.message}
        </p>
      }
      datetime={
        <Tooltip title={moment(props.created_at).format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment(props.created_at).fromNow()}</span>
        </Tooltip>}
    />
  </div>
)

export default ChatCard