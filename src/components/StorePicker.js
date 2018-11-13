import React, { Component } from "react";
import { getFunName } from "./helpers";

class StorePicker extends Component {
  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }
  myInput = React.createRef();

  // goToStore(event) {
  //   // 1. Stop the form from subbmitting
  //   event.preventDefault();
  //   // 2. Get the text from input
  //   console.log(this);
  //   // 3. Change the location to /store/inputValue
  // }

  goToStore = event => {
    // 1. Stop the form from subbmitting
    event.preventDefault();
    // 2. Get the text from input
    const storeName = this.myInput.current.value;
    // 3. Change the location to /store/inputValue
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          ref={this.myInput}
          placeholder="Store Name"
          defaultValue={getFunName()}
          required
        />
        <button type="submit">Visite Store</button>
      </form>
    );
  }
}

export default StorePicker;
