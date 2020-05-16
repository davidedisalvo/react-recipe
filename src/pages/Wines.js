import React, { Component } from "react";
import SimpleSearch from "../components/UI/SimpleSearch";
import RecipeWithWine from "../components/wines/RecipesWithWine";
import Jumbotron from "../components/UI/Jumbotron";
import { connect } from "react-redux";
import axios from "axios";
import Header from "../components/wines/Header";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";

class Wines extends Component {
  handleSearch = (value) => {
    axios
      .get(
        `https://api.spoonacular.com/food/wine/dishes?wine=${value}&apiKey=e778dfe43af14044a6f9547ad722f708`
      )
      .then((el) => {
        console.log("wine", el);
        const payload = { title: value, data: el.data };
        this.props.addWineListSearch(payload);
        scroll.scrollTo(600);
      })
      .catch((err) => {
        console.log(err);
        this.props.searchingWine(true);
      });
  };
  render() {
    return (
      <main>
        <Jumbotron
          title="SEARCH FOR WINES"
          copy="Type your wine in the form below"
          class="jumbotronWine"
          img={require("../images/headerWines.jpg")}
        >
          <SimpleSearch onClick={this.handleSearch} />
        </Jumbotron>
        <RecipeWithWine></RecipeWithWine>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addWineListSearch: (data) => {
      dispatch({ type: "ADD_WINE_LIST_SEARCH", data: data });
    },
    searchingWine: (data) => {
      dispatch({ type: "SEARCHING_WINE", data: data });
    },
  };
};

export default connect(null, mapDispatchToProps)(Wines);
