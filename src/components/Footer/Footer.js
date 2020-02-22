import { Icon } from 'antd'
import React from 'react'

const Footer = () => (
  <div style={{
    height: '80px', display: 'flex',
    flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', fontSize: '1rem'
  }}>
    <p>Happy Coding <Icon type="smile" />></p>
  </div>  
)

export default Footer