import React from 'react'
import './App.css'
import jwtDecode from 'jwt-decode'
import { Route, Switch } from 'react-router-dom'
import Axios from 'axios'

//Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/type'
import { getUserData, logoutUser } from './redux/actions/userActions'

//materialUI
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

//Components
import Navbar from './Components/layout/Navbar'
import themeObject from './util/theme';
import AuthRoute from './util/AuthRoute'

//pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
import user from './pages/user'


const theme = createMuiTheme(themeObject)
const token = localStorage.FBIdToken
if (token) {
  const decodedToken = jwtDecode(token)
  console.log(decodedToken)
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    Axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

console.log(store.getState())

function App() {
  return (
    <MuiThemeProvider theme={theme} >
      <Provider store={store}>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={home} />
            <AuthRoute exact path='/login' component={login} />
            <AuthRoute exact path='/signup' component={signup} />
            <Route exact path='/users/:handle' component={user} />
            <Route exact path='/users/:handle/scream/:screamId' component={user} />
          </Switch>
        </div>
      </Provider>
    </MuiThemeProvider>
  )
}

export default App;
