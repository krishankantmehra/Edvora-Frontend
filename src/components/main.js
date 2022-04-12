import React, { Component } from "react";
import Content from "./content";
import Navbar from "./navbar";


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded:false,
      user: []
    };
  }

  async componentDidMount() {
    //get user information 
    await fetch("https://assessment.api.vweb.app/user")
      .then((res) => res.json()
      .then((res) =>
        this.setState({
          loaded:true,
          user: res,
        }))
        .catch(err => {
          console.log(err)
        })
        
      );
  }

  render() {
    //check if Data is loaded or not
    if(!this.state.loaded)return <h1>loading...</h1>
    else return (
      <div className="window m-auto">
        <Navbar userName={this.state.user.name} profilePic = {this.state.user.url}/>
        <Content stationCode={Number(this.state.user.station_code)}/>
      </div>
    );
  }
}

export default Main;
