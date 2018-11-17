import React, { Component } from "react";
import { formatPrice } from "./helpers";

class Fish extends Component {
  handleClick = () => {
    this.props.addToOrder(this.props.index);
  };
  render() {
    const { price, desc, status } = this.props.fishData;
    const isAvailable = status === "available";
    return (
      <li className="menu-fish">
        <img src={this.props.fishData.image} alt={this.props.fishData.name} />
        <h4 className="fish-name">
          {this.props.fishData.name}
          <span className="price">{formatPrice(price)}</span>
        </h4>
        <p>{desc}</p>
        <button disabled={!isAvailable} onClick={this.handleClick}>
          {isAvailable ? "Add To Cart" : "Sold Out"}
        </button>
      </li>
    );
  }
}

export default Fish;
