import React from 'react'

const apiURL = process.env.REACT_APP_API_URL

const Message = (props) => {

  const extension = props.message.substring(props.message.length - 3, props.message.length);
  const videoExtensions = ['mp4', 'm4v', 'mkv']
  const checkVideoExtensions = videoExtensions.some(ext => ext === extension)
  return (
    props.type === 'VideoOrImage' ?
      // this will be either video or image 
      checkVideoExtensions ?
          <video
              style={{ maxWidth: '200px' }}
              src={`${apiURL}/${props.message}`} alt="video"
              type="video/mp4" controls
          />
          :
          <img
              style={{ maxWidth: '200px' }}
              src={`${apiURL}/${props.message}`}
              alt="img"
          />
      :
      <p>
          {props.message}
      </p>
  )
}


export default Message