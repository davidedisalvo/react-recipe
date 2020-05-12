import React, { Component } from "react";
import { Input, Row, Col, Button } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import style from "./simpleSearch.module.scss";

const { Search } = Input;

class SimpleSearch extends Component {
  handleSearch = (value) => {
    axios
      .get(
        `https://api.spoonacular.com/food/products/search?query=${value}&apiKey=e778dfe43af14044a6f9547ad722f708`
      )
      .then((el) => {
        console.log(el);
        const payload = el.data.products;
        this.props.addProductsListSearch(payload);
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
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProductsListSearch: (data) => {
      dispatch({ type: "ADD_PRODUCTS_LIST_SEARCH", data: data });
    },
  };
};

export default connect(null, mapDispatchToProps)(SimpleSearch);
