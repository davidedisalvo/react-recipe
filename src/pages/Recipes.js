import React, { Component, createContext } from "react";
import Jubotron from "../components/UI/Jumbotron";
import SimpleSearch from "../components/UI/SimpleSearch";
import SearchBy from "../components/recipes/SearchBy";
import { connect } from "react-redux";

import RecipeList from "../components/recipes/RecipeList";
import Jumbotron from "../components/UI/Jumbotron";
import axios from "axios";

export const { Provider, Consumer } = React.createContext(null);

class Recipes extends Component {
  handleSearch = (value) => {
    console.log(value);
    this.props.minimizeSearchBy(true);

    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${value}&number=16&apiKey=e778dfe43af14044a6f9547ad722f708`
      )
      .then((el) => {
        console.log(el.data.results);
        const payload = el.data.results;
        this.props.addRecipeListSearch(payload);
        this.props.searchingRecipe(true);
      })
      .catch((err) => {
        console.log(err);
        this.props.errRecipeList(true);
      });
  };
  render() {
    return (
      <main>
        <Jumbotron
          title="SEARCH FOR RECIPES"
          copy="Type your recipe in the form below"
          img={require("../images/headerRecipes.jpg")}
        >
          <Provider handleSearch={this.handleSearch}>
            <SimpleSearch />
          </Provider>
        </Jumbotron>
        <SearchBy></SearchBy>

        <RecipeList></RecipeList>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addRecipeListSearch: (data) => {
      dispatch({ type: "ADD_RECIPE_LIST_SEARCH", data: data });
    },
    minimizeSearchBy: (payload) => {
      dispatch({ type: "MINIMIZE_SEARCH_BY", data: payload });
    },
    errRecipeList: (payload) => {
      dispatch({ type: "ERR_RECIPE_LIST", data: payload });
    },
    searchingRecipe: (payload) => {
      dispatch({ type: "SEARCHING_RECIPE", data: payload });
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    minimize: state.minimizeSearchBy,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
