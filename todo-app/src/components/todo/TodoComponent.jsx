import React, { Component } from 'react'
import moment from 'moment' //JS library used to format Dates
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'

class TodoComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {

        if (this.state.id === -1) {
            return
        }

        let username = AuthenticationService.getLoggedInUserName()

        TodoDataService.retrieveTodo(username, this.state.id)
            .then(response =>
                this.setState({
                    description: response.data.description,
                    targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
                }))
    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUserName()
        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }

        if (this.state.id === -1) {
            TodoDataService.createTodo(username, todo).then(
                () => { this.props.history.push('/todos') }
            )
        } else {
            TodoDataService.updateTodo(username, this.state.id, todo).then(
                () => { this.props.history.push('/todos') }
            )
        }
        console.log(values);
    }

    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            errors.description = 'Enter at least 5 characters in Description'
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        }

        return errors;
    }


    render() {

        let description = this.state.description
        let targetDate = this.state.targetDate

        return (
            <div>

                <h1 className="text-left p-3">Todo</h1>
                <div className="container">
                    <Formik
                        initialValues={{
                            description: description,
                            targetDate: targetDate
                        }}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        validateOnChange={false}
                        validateOnBlur={false}
                        enableReinitialize={true}>

                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="targetDate" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group text-left">
                                        <label>Description</label>
                                        <Field type="text" name="description" className="form-control" />
                                    </fieldset>
                                    <fieldset className="form-group text-left">
                                        <label>Target Date</label>
                                        <Field type="date" name="targetDate" className="form-control" />

                                    </fieldset>
                                    <button type="submit" className="btn btn-success">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default TodoComponent