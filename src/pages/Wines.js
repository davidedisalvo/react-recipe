import React, { Component } from "react";
import SimpleSearch from "../components/wines/SimpleSearch";
import RecipeWithWine from "../components/wines/RecipesWithWine";
import Header from "../components/wines/Header";

class Wines extends Component {
  render() {
    return (
      <main>
        <Header></Header>
        <RecipeWithWine></RecipeWithWine>
      </main>
    );
  }
}

export default Wines;
