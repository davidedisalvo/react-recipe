import React, { Component } from "react";
import { Input, Row, Col, Button } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import style from "./SimpleSearch.module.scss";
import { MyContext } from "./Jumbotron";

const { Search } = Input;

class SimpleSearch extends Component {
  render() {
    console.log("new", this.props);

    return (
      <section>
        <Row justify="center">
          <Col xs={24} md={12}>
            <Search
              className={style.simpleSearch}
              placeholder="input search text"
              onSearch={this.props.onClick}
              enterButton
            />
          </Col>
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
export default connect(mapStateToProps, mapDispatchToProps)(SimpleSearch);
