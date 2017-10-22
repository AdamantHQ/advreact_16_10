import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import ProtectedRoute from './common/ProtectedRoute'
import AdminPage from './routes/Admin'
import AuthPage from './routes/Auth'
import UserPage from './routes/User'
import {NavLink} from 'react-router-dom'

class App extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <header>
                    <NavLink exact to = '/' activeStyle = {{color: 'red'}}>Main</NavLink>
                    <NavLink to = '/admin' activeStyle = {{color: 'red'}}>Admin</NavLink>
                    <NavLink to = '/users' activeStyle = {{color: 'red'}}>Пользователи</NavLink>
                    <NavLink to = '/auth' activeStyle = {{color: 'red'}}>Авторизация</NavLink>
                </header>
                <h1>Hello world</h1>
                <ProtectedRoute path = '/admin' component = {AdminPage}/>
                <ProtectedRoute path = '/users' component = {UserPage}/>
                <Route path = '/auth' component = {AuthPage}/>
            </div>
        )
    }
}

export default App