import React, { Component } from "react";

class Navigation extends Component {
  componentDidMount() {
    this.change();
  }

  componentDidUpdate() {
    this.change();
  }

  change = () => {
    var nearest = document.getElementById("nearest");
    var upcoming = document.getElementById("upcoming");
    var past = document.getElementById("past");
    if (this.props.cur === 0) {
      nearest.style.textDecoration = "underline";
      nearest.style.color = "white";
      upcoming.style.textDecoration = "none";
      upcoming.style.color = "#d0cbcb";
      past.style.textDecoration = "none";
      past.style.color = "#d0cbcb";
    }

    if (this.props.cur === 1) {
      upcoming.style.textDecoration = "underline";
      upcoming.style.color = "white";
      nearest.style.textDecoration = "none";
      nearest.style.color = "#d0cbcb";
      past.style.textDecoration = "none";
      past.style.color = "#d0cbcb";
    }

    if (this.props.cur === 2) {
      past.style.textDecoration = "underline";
      past.style.color = "white";
      nearest.style.textDecoration = "none";
      nearest.style.color = "#d0cbcb";
      upcoming.style.textDecoration = "none";
      upcoming.style.color = "#d0cbcb";
    }
  };

  changeState(){
    document.getElementById("city").value = 'all'
    this.props.filter()
  }

  render() {
    return (
      <div className="navigation d-flex flex-row justify-content-between">
        <div className="d-flex flex-row">
          <h2 className="links" id="nearest" onClick={this.props.nearest}>
            Nearest rides
          </h2>
          <h2 className="links" id="upcoming" onClick={this.props.upcoming}>
            Upcoming rides ({this.props.upcoming_len})
          </h2>
          <h2 className="links" id="past" onClick={this.props.past}>
            Past rides ({this.props.past_len})
          </h2>
        </div>

        <div className="d-flex flex-row align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-filter-left"
            viewBox="0 0 16 16"
          >
            <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
          </svg>

          <div className="btn-group dropstart">
            <p
              className="mb-0 ms-1 filter"
              role="button"
              id="filterMenu"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Filters
            </p>
            <div
              className="dropdown-menu dropdown-menu-dark"
              aria-labelledby="filterMenu"
            >
              <p className="px-3">Filters</p>
              <hr />
              <div className="p-2" >
                <select className="form-select mb-2 form-select-dark" id="state" onChange={()=>{this.changeState()}}>
                  <option value="all">All states</option>
                  {this.props.states.map((element,i) => {
                    return <option key={i} value={element}>{element}</option>;
                  })}
                </select>
                <select className="form-select mb-2 form-select-dark" id="city" onChange={()=>this.props.filter()}>
                  <option value="all">All Cities</option>
                  {this.props.cities.map((element,i) => {
                    return <option key={i} value={element}>{element}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
