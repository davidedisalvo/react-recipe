import React, { Component } from "react";
import { Input, Row, Col, Button } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import style from "./SimpleSearch.module.scss";

const { Search } = Input;

class SimpleSearch extends Component {
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
    console.log(this.props);

    return (
      <section>
        <Row justify="center">
          <Col xs={24} md={12}>
            <Search
              className={style.simpleSearch}
              placeholder="input search text"
              onSearch={this.handleSearch}
              enterButton
            />
          </Col>
        </Row>
        <Row
          justify="center"
          className={style.searchBy}
          style={{ marginTop: "30px" }}
        >
          {this.props.minimize ? (
            <Button onClick={() => this.props.minimizeSearchBy(false)}>
              Or Search By
            </Button>
          ) : null}
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
