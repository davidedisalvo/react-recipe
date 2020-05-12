import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import SingleRecipe from "../components/recipes/SingleRecipe";
import TheCarousel from "../components/UI/TheCarousel";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import Header from "../components/UI/Header";

class Home extends Component {
  render() {
    console.log(this.props.recipes);
    return (
      <main>
        {/* <Header></Header> */}
        <TheCarousel></TheCarousel>
      </main>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
  };
};
export default connect(mapStateToProps)(Home);
