import React, { Component } from "react";

const newHero = {
  name: "White Adam",
  age: 30,
  secretIdentity: "The Rock",
  powers: ["God", "Free money", "Light"],
};

class Hero extends Component {
  // CSS
  center = {
    textAlign: "center",
    fontWeight: "bold",
  };

  constructor() {
    super();
    this.insertNewHero = this.insertNewHero.bind(this);
    this.state = {
      status: null,
    };
  }

  // Main
  render() {
    return (
      <div style={this.center}>
        <button
          onClick={this.insertNewHero}
          className="btn btn-secondary btn-sm m-4"
        >
          Insert Hero
        </button>
        <br />
        <span className={this.getBadgesClasses()}>{this.displayStatus()}</span>
      </div>
    );
  }

  // Functions
  insertNewHero = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHero),
    };

    fetch("http://192.168.86.228:3001/api/heroes", requestOptions)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((json) => {
            throw json;
          });
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ status: data.status });
        console.log("Data Inserted");
      })
      .catch((err) => {
        this.setState({ status: err.message });
        console.log("Catch: ", err);
      });
  };

  displayStatus() {
    const { status } = this.state;
    return status === null ? "No status" : status;
  }

  // Bootstrap
  getBadgesClasses() {
    let classes = "badge bg-";
    if (this.state.status === null) {
      classes += "warning";
    } else if (this.state.status === "Failed to fetch") {
      classes += "danger";
    } else {
      classes += "primary";
    }
    // classes += this.state.status === "Failed to fetch" ? "warning" : "danger";
    return classes;
  }
}

export default Hero;
