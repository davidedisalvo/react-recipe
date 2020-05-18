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
import { TransitionGroup, CSSTransition } from "react-transition-group";

function App() {
  const timeout = { enter: 800, exit: 400 };
  return (
    <Router>
      <div className="App">
        <TheNav />
        <Route
          render={({ location }) => {
            const { pathname } = location;
            return (
              <TransitionGroup>
                <CSSTransition
                  key={pathname}
                  classNames="alert"
                  mountOnEnter={false}
                  unmountOnExit={true}
                  timeout={{
                    enter: 1000,
                    exit: 1000,
                  }}
                >
                  <Switch location={location}>
                    <Route path="/" exact component={Home} />
                    <Route path="/recipes" exact component={Recipes} />
                    <Route
                      path="/recipes/:recipe_id"
                      exact
                      component={SingleRecipe}
                    />
                    <Route path="/wines" component={Wines} />
                    <Route path="/products" exact component={Products} />
                    <Route
                      path="/products/:product_id"
                      exact
                      component={SingleProduct}
                    />

                    <Route path="/favourite" component={Favourite} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            );
          }}
        />
        <TheFooter />
      </div>
    </Router>
  );
}

export default App;
