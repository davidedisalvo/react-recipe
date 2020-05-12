import React, { Component } from "react";
import Jubotron from "../components/UI/Jumbotron";
import SimpleSearch from "../components/UI/SimpleSearch";
import SearchBy from "../components/recipes/SearchBy";

import RecipeList from "../components/recipes/RecipeList";
import Jumbotron from "../components/UI/Jumbotron";

class Recipes extends Component {
  render() {
    return (
      <main>
        <Jumbotron></Jumbotron>
        <SearchBy></SearchBy>

        <RecipeList></RecipeList>
      </main>
    );
  }
}

export default Recipes;
