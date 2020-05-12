import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import axios from "axios";
import { Row, Col, Divider, Button } from "antd";
import style from "./RecipesWithWine.module.scss";

class RecipeWithWines extends Component {
  handleSearch = (event) => {
    const value = event.target.innerText;
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${value}&number=16&apiKey=e778dfe43af14044a6f9547ad722f708
    `
      )
      .then((el) => {
        const payload = el.data.results;
        this.props.addRecipeListSearch(payload);
        this.props.history.push(`/recipes`);
      })
      .catch((err) => console.log(err));
  };

  handleFav = () => {
    this.props.addWinesToFavourite(this.props.wines);
  };
  render() {
    console.log("props", this.props);
    if (this.props.wines.length !== 0) {
      return (
        <section className={style.recipesWithWine}>
          <Row>
            <Col>
              <h2>{this.props.wines.data.text}</h2>
            </Col>
          </Row>
          {this.props.wines.data.pairings ? (
            <>
              <Divider></Divider>
              <Row justify="center">
                <Col>
                  <h4>Search recipes with:</h4>
                  <ul>
                    {this.props.wines.data.pairings.map((el) => {
                      return (
                        <li
                          className={style.listItem}
                          onClick={this.handleSearch}
                        >
                          {el}
                        </li>
                      );
                    })}
                  </ul>
                </Col>
              </Row>
              <Row>
                <Button onClick={this.handleFav}>ADD WINE</Button>
              </Row>
            </>
          ) : null}
        </section>
      );
    } else {
      if (this.props.searchingWine) {
        return (
          <Row justify="center">
            <Col>
              <h4 style={{ marginTop: "20px" }} className="errorBar">
                Sorry we can't find this wine. Try again.
              </h4>
            </Col>
          </Row>
        );
      } else {
        return null;
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    wines: state.wines,
    searchingWine: state.searchingWine,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addRecipeListSearch: (data) => {
      dispatch({ type: "ADD_RECIPE_LIST_SEARCH", data: data });
    },
    addWinesToFavourite: (data) => {
      dispatch({ type: "ADD_WINES_TO_FAVOURITE", data: data });
    },
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RecipeWithWines)
);
