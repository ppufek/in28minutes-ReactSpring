import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService.js'

class WelcomeComponent extends Component {

    constructor(props) {
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.state = {
            welcomeMessage: ''
        }
        this.handleSuccessfulReponse = this.handleSuccessfulReponse.bind(this)
        this.handleError = this.handleError.bind(this)

    }
    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}
                    You can manage your todos <Link to="/todos">here.</Link>
                </div>
                <div className="container">
                    Click here to get a customized welcome message.
                    <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Welcome Message</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </>
        )

    }

    retrieveWelcomeMessage() {
        // HelloWorldService.executeHelloWorldService()
        // .then(response => this.handleSuccessfulReponse(response))
        // .catch()

        // HelloWorldService.executeHelloWorldBeanService() //response.data --> JSON file
        // .then(response => this.handleSuccessfulReponse(response))

        HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name) //response.data --> JSON file
            .then(response => this.handleSuccessfulReponse(response))
            .catch(error => this.handleError(error))
    }


    handleSuccessfulReponse(response) {
        console.log(response);

        //response.data --> returns JSON file
        this.setState({ welcomeMessage: response.data.message })
    }

    handleError(error) {
        console.log(error.response);
        let errorMessage = '';

        if (error.message) { //checking if there is an error message
            errorMessage += error.message
        }

        if (error.response && error.response.data) { //checking if there is anything in response.data
            errorMessage += error.response.data.message //if there is, we are picking it up
        }
        this.setState({ welcomeMessage: errorMessage })
    }
}

export default WelcomeComponent