import React, { Component } from "react";

import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import Fish from "./Fish";
import base from "../base";

import sampleFishes from "../sample-fishes";

class App extends Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const { params } = this.props.match;

    // 1.First reinitiate local storage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // 1. Take a copy of exiting state
    const fishesCopy = { ...this.state.fishes };
    // 2. Add our new fish to that fishes variable
    fishesCopy[`fish${Date.now()}`] = fish;
    // 3. Set the new fish object to state
    this.setState({ fishes: fishesCopy });
  };

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of exiting state
    const fishes = { ...this.state.fishes };
    // 2. update that state
    fishes[key] = updatedFish;
    // 3. Set the updated fish object to state
    this.setState({ fishes });
  };

  deleteFish = key => {
    // 1. Take a copy of exiting state
    const fishes = { ...this.state.fishes };
    // 2. update that state || Delete fish
    fishes[key] = null;
    // 3. Update state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    // 1. Take a copy of exiting state
    const orderCopy = { ...this.state.order };
    // 2. Either add to the order, or update the number in our order
    orderCopy[key] = orderCopy[key] + 1 || 1;
    // 3. Call setstate to update our state object
    this.setState({ order: orderCopy });
  };

  removeFromOrder = key => {
    // 1. Take a copy of exiting state
    const order = { ...this.state.order };
    // 2. remove item from order
    delete order[key];
    // 3. Call setstate to update our state object
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh see food market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                fishData={this.state.fishes[key]}
                addToOrder={this.addToOrder}
                index={key}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          // {...this.state} to pass whole state
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
