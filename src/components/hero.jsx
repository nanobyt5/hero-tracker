import React, { Component } from "react";

// const newHero = {
//   name: "White Adam",
//   age: 30,
//   secretIdentity: "The Rock",
//   powers: ["God", "Free money", "Light"],
// };

class Hero extends Component {
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
    const encodeFormData = (data) => {
      return Object.keys(data)
        .map(
          (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: encodeFormData({
        text: '{"status": "Great Success!"}',
        command: "/heroes",
      }),
    };

    fetch(
      "https://5b8667r77k.execute-api.ap-southeast-1.amazonaws.com/default/hero-update",
      requestOptions
    )
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
        console.log("Data Inserted: " + data);
      })
      .then((json) => console.log(json))
      .catch((err) => {
        this.setState({ status: err.message });
        console.log("Catch: ", err);
      });
  };

  displayStatus() {
    const { status } = this.state;
    return status === null ? "No status" : status;
  }

  // CSS
  center = {
    textAlign: "center",
    fontWeight: "bold",
  };

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
    return classes;
  }
}

export default Hero;
