import React, { Component } from "react";
import TheTabs from "../components/favourite/Tabs";
import { connect } from "react-redux";

class Favourite extends Component {
  render() {
    console.log("test", this.props.favourite);
    return (
      <main className="fullHeight">
        <TheTabs></TheTabs>
      </main>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    favourite: state.favourite,
  };
};

export default connect(mapStateToProps)(Favourite);
