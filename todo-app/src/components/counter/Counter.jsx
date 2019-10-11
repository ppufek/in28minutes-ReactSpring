import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Counter.css'
import { tsExpressionWithTypeArguments } from '@babel/types';

class Counter extends Component {

    constructor() {
        super();
        this.state = {
            counter: 0
        }
    }

    render() {
        return (
            <div className="counter">
                <CounterButton by={1} incrementMethod={this.increment} />
                <CounterButton by={5} incrementMethod={this.increment} />
                <span className="count">{this.state.counter}</span>

            </div>
        );
    }

    increment = (by) => { // Update state
        console.log(`increment from parent - ${by}`);
        this.setState( //passing arrow function which takes previous state as param & gets the counter value from prevState
            (prevState) => {
                return {counter: prevState.counter + by}
            }
        );
    }
}

class CounterButton extends Component {

    // Define the initial state in a constructor
    // state => counter 0

    constructor() {
        super(); // Error 1
        this.state = {
            counter: 0,
            secondCounter: 100
        }

        // Arrow function prevents the need for binding, the binding happend automatically
        // this.increment = this.increment.bind(this)
    }

    render() {
        // render = () => {

        //block scope variable -> let
        // const style = {fontSize: "70px", padding: "15px 30px"}


        return (
            <div className="counter">
                <button onClick={this.increment}>+{this.props.by}</button>
                {/* <span className="count">{this.state.secondCounter}</span> */}

            </div>
        );
    }
    increment = () => { // Update state
        // console.log('increment');
        this.setState({
            counter: this.state.counter + this.props.by,
        });

        this.props.incrementMethod(this.props.by);
    }

}

CounterButton.defaultProps = {
    by: 1
}

CounterButton.propTypes = {
    by: PropTypes.number
}

export default Counter