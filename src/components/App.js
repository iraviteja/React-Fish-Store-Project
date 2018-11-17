import React, { Component } from "react";

import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import Fish from "./Fish";

import sampleFishes from "../sample-fishes";

class App extends Component {
  state = {
    fishes: {},
    order: {}
  };
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
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh see food market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish key={key} fishData={this.state.fishes[key]} />
            ))}
          </ul>
        </div>
        <Order />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
