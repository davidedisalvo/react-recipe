import React from "react";
import "./App.scss";
import Home from "./pages/Home";
import Favourite from "./pages/Favourite";
import Recipes from "./pages/Recipes";
import Wines from "./pages/Wines";
import Products from "./pages/Products";
import TheNav from "./components/UI/TheNav";
import TheFooter from "./components/UI/TheFooter";
import SingleRecipe from "./pages/SingleRecipe";
import SingleProduct from "./pages/SingleProduct";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";

function App() {
  return (
    <Router>
      <div className="App">
        <TheNav />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/recipes" exact component={Recipes} />
          <Route path="/recipes/:recipe_id" exact component={SingleRecipe} />
          <Route path="/wines" component={Wines} />
          <Route path="/products" exact component={Products} />
          <Route path="/products/:product_id" exact component={SingleProduct} />

          <Route path="/favourite" component={Favourite} />
        </Switch>
        <TheFooter />
      </div>
    </Router>
  );
}

export default App;
