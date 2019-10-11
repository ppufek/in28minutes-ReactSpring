// https://github.com/sudhiry/full-stack-with-react-and-spring-boot/tree/master/frontend/todo-app

import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import ListTodosComponent from './ListTodosComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import TodoComponent from './TodoComponent.jsx'

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <>
                        {/* ensures that only one of these components inside is matched */}
                        <HeaderComponent />
                        <Switch>
                            <Route path="/" exact component={LoginComponent} />
                            <Route path="/login" component={LoginComponent} />
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent} />
                            <AuthenticatedRoute path="/todos/:id" component={TodoComponent} />
                            <AuthenticatedRoute path="/todos" component={ListTodosComponent} />
                            <AuthenticatedRoute path="/logout" component={LogoutComponent} />
                            <Route component={ErrorComponent} />
                        </Switch>
                        <FooterComponent />
                    </>
                </Router>

                {/* <LoginComponent />
                <WelcomeComponent /> */}
            </div>
        );
    }
}

// function ShowInvalidCredentials(props) {
//     if (props.hasLoginFailed) {
//         return <div>Invalid Credentials</div>
//     } else {
//         return null
//     }
// }

// function LoginSuccessMessage(props) {
//     if (props.showSuccessMessage) {
//         return <div>Login Successful</div>
//     } else {
//         return null
//     }
// }

export default TodoApp