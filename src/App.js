import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import LandingPage from './components/pages/LandingPage/LandingPage'
import LoginPage from './components/pages/LoginPage/LoginPage'
import RegisterPage from './components/pages/RegisterPage/RegisterPage'
import ChatPage from './components/pages/ChatPage/ChatPage'
import Auth from './hoc/auth'


function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <Navbar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/chat" component={Auth(ChatPage, false)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  )
}

export default App;
