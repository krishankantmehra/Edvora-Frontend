import React, { Component } from "react";
import Card from "./card";
import Navigation from "./navigation";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      rides: [],
      upcomingRides: [],
      pastRides: [],
      cities:[],
      states:[],
      List:[],
      cur : 0,
    };
  }

  async componentDidMount() {
    //get all rides data
    await fetch("https://assessment.api.vweb.app/rides")
      .then((res) =>
        res.json().then((res) => {
          this.updateData(res,true);
        })
      )
      .catch((err) => console.log(err));
  }

  updateData(rides,first) {
    
    let temp = [];
    if(first){

      for (var i = 0; i < rides.length; i++) {
        var min = Number(1e9);
  
        for (var j = 0; j < rides[i].station_path.length; j++) {
          min = Math.min(min,Math.abs(Number(rides[i].station_path[j]) - Number(this.props.stationCode)));
        }
  
        temp.push(rides[i]);
        temp[i].distance = min;
      }
      temp.sort((a, b) => {
        return a.distance - b.distance;
      });

      const statesList = temp.map(item => {return item.state})
      const citiesList = temp.map(item => {return item.city})

      this.setState({
        rides:temp,
        states: Array.from(new Set(statesList)),
        cities: Array.from(new Set(citiesList)),
      })
    }
    else temp = rides

    const upcoming = temp.filter((item) => {
      return new Date(item.date) - new Date() > 0;
    });
    const past = temp.filter((item) => {
      return new Date(item.date) - new Date() < 0;
    });

    
    

    this.setState({
        loaded:true,
        upcomingRides:upcoming,
        pastRides:past,
        
        List:temp
    })
    
  }

  nearest = ()=>{
    this.setState({
      cur:0,
    })
    this.filter(this.rides)
  }
  upcoming = ()=>{
    this.setState({
      cur:1,
      List:this.state.upcomingRides
    })
  }
  past = ()=>{
    this.setState({
      cur:2,
      List:this.state.pastRides
    })
  }

  filter = ()=>{
    var state_ = document.getElementById("state").value
    var city_ = document.getElementById("city").value
    var res = this.state.rides
    var newList = []

   
    res = res.filter(element => {
      if(state_ === 'all'){
        newList.push(element.city)

        if(city_ === 'all'){
          return true;
        }
        else return city_ === element.city
      }
      else if(state_ === element.state){
        newList.push(element.city)

        if(city_ === 'all'){
          return true;
        }
        else return city_ === element.city
      }
      else return false
    })
  
    this.setState({
      cities: Array.from(new Set(newList))
    })
   
    this.updateData(res,false)
  }
  render() {
    if (!this.state.loaded) {
      return <h1>Loading....</h1>;
    } else {
      return (
        <>
          <Navigation upcoming_len={this.state.upcomingRides.length} past_len = {this.state.pastRides.length} cur={this.state.cur} 
           nearest = {this.nearest}
           upcoming = {this.upcoming}
           past = {this.past}
           cities = {this.state.cities}
           states = {this.state.states}
           filter = {this.filter}
           city = {this.state.city}
          />
           <div className="content d-flex flex-column">
           {this.state.List.map((item,index) => {
                return <Card key={index} item={item}/>
            })}
           </div>
        </>
      );
    }
  }
}

export default Content;
