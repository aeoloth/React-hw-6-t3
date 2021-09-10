import React from "react";
import "./App.css";

const ErrorComponent = () => <div>{props.ignore}</div>

export default class Counter extends React.Component {
  constructor(props) {
    console.log("constructor");
    super(props);

    this.state = {
      counter: 0,
      seed: 0,
      initializing: true
    };

    this.increment = () => this.setState({ counter: this.state.counter + 1 });
    this.decrement = () => this.setState({ counter: this.state.counter - 1 });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.seed && state.seed !== props.seed) {
      return {
        seed: props.seed,
        counter: props.seed,
      }; 
    }

    return null;
  }

  componentDidMount() {
    console.log("Component did mount");
    setTimeout(() => {
      this.setState({initializing: false})
    }, 500)
    console.log("-------------------");
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.ignoreProp &&
      this.props.ignoreProp !== nextProps.ignoreProp
    ) {
      console.log("Should component update - DO NOT RENDER");
      console.log("-------------------");
      return false;
    }
    console.log("Should component update - RENDER");
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("Get snapshot before update");
    return null;
  }

  render() {
    console.log("Render", this.state.error);

    if(this.state.initializing) {
      return <div>Initializing...</div>
    }

    if (this.props.showErrorComponent && this.state.error) {
      return <div>We have encountered an error {this.state.error.message}</div>
    }

    return (
      <div>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
        <div className="counter">
          Counter: {this.state.counter}
        </div>
        {this.props.showErrorComponent ? <ErrorComponent /> : null}
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("Component did update");
    console.log("-------------------");
  }

  componentWillUnmount() {
    console.log("Component will unmount");
    console.log("-------------------");
  }

  componentDidCatch(error, info) {
    console.log("Component did catch")

    this.setState({ error, info })
  }
}


