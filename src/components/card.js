import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
      <div className="card">
        <div className="p-3 d-flex flex-row">
          <img
            className="map_url"
            src={this.props.item.map_url}
            alt="Not found"
          />
          <div className="w-100">
            <div className="d-flex flex-row justify-content-between">
              <p className="rideInfo">
                Ride Id : <span className="values">{this.props.item.id}</span>
              </p>

              <div className="d-flex flex-row">
                <p className="place ">{this.props.item.city}</p>
                <p className="place ">{this.props.item.state}</p>
              </div>
            </div>
            <p className="rideInfo">
              Origin Station :{" "}
              <span className="values">
                {this.props.item.origin_station_code}
              </span>
            </p>
            <p className="rideInfo">
              Station path:{" "}
              <span className="values">
                {JSON.stringify(this.props.item.station_path)}
              </span>
            </p>
            <p className="rideInfo">
              Date : <span className="values">{this.props.item.date}</span>
            </p>
            <p className="rideInfo">
              Distance :{" "}
              <span className="values">{this.props.item.distance}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
