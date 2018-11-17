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
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
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
        />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
