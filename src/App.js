import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <form className="store-selector">
        <h2>Please enter a store name</h2>
        <input type="text" placeholder="Store Name" required />
        <button type="submit">visit store</button>
      </form>
    );
  }
}

export default App;
