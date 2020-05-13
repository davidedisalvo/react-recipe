import React, { Component, createContext } from "react";
import style from "./Jumbotron.module.scss";
import { Row, Col, Button } from "antd";
import SimpleSearch from "./SimpleSearch";
import axios from "axios";
import { connect } from "react-redux";
import { Consumer } from "../../pages/Recipes";

class Jumbotron extends Component {
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
      <section
        className={`${style.jumbotron} ${this.props.class}`}
        style={{ backgroundImage: `url(${this.props.img})` }}
      >
        <Row justify="center" align="middle" className={style.customRow}>
          <Col span={12}>
            <h1>{this.props.title}</h1>
            <h3>{this.props.copy}</h3>
          </Col>
          <Col span={24}>{this.props.children}</Col>
        </Row>
      </section>
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
export default connect(mapStateToProps, mapDispatchToProps)(Jumbotron);
