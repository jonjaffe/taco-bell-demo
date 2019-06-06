import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Header extends Component {
  active = {
    fontWeight: "bold",
    color: "red"
  };

  header = {
    display: "flex",
    justifyContent: "space-between",
    listStyle: "none"
  };
  render() {
    return (
      <div style={this.header}>
        <img src="https://images.ctfassets.net/mv79s9r86hsh/3A93GKR2QHaqYXovFuaQAW/074b9e414629f08eb8df2818586e3afa/Screen_Shot_2019-06-01_at_8.34.26_AM.png?h=150" />
        <NavLink exact to="/" activeStyle={this.active}>
          TACO BELL
        </NavLink>
        <NavLink to="/locations" activeStyle={this.active}>
          Locations
        </NavLink>
      </div>
    );
  }
}

export default Header;
