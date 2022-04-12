import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar d-flex flex-row align-items-center">
        <h1 id="logo" className="m-0">Edvora</h1>
        <div className="userInfo d-flex flex-row align-items-center">
            <h4 id="userName" className="m-0">{this.props.userName}</h4>
            <img id="profilePic" src={this.props.profilePic} alt="Not found"></img>
        </div>
      </div>
    );
  }
}

export default Navbar;
