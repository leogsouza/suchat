import { Button, Drawer, Icon } from 'antd'
import React, { useState } from 'react'
import './Navbar.css'
import LeftMenu from './Sections/LeftMenu'
import RightMenu from './Sections/RightMenu'


const Navbar = () => {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%'}}>
      <div className="menu__logo">
        <a href="/">Logo</a>
      </div>
      <div className="menu__container">
        <div className="menu__left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu__right">
          <RightMenu mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default Navbar