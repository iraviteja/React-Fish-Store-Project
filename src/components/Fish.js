import React, { Component } from "react";
import PropTypes from "prop-types";

import { formatPrice } from "./helpers";

class Fish extends Component {
  static propTypes = {
    fishData: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    addToOrder: PropTypes.func
  };
  handleClick = () => {
    this.props.addToOrder(this.props.index);
  };
  render() {
    const { name, price, desc, status, image } = this.props.fishData;
    const isAvailable = status === "available";
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h4 className="fish-name">
          {name}
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
