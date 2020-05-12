import React, { Component } from "react";
import { Input, Row, Col, Button } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import style from "./SimpleSearch.module.scss";

const { Search } = Input;

class SimpleSearch extends Component {
  handleSearch = (value) => {
    axios
      .get(
        `https://api.spoonacular.com/food/wine/dishes?wine=${value}&apiKey=e778dfe43af14044a6f9547ad722f708`
      )
      .then((el) => {
        console.log("wine", el);
        const payload = { title: value, data: el.data };
        this.props.addWineListSearch(payload);
      })
      .catch((err) => {
        console.log(err);
        this.props.searchingWine(true);
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
    addWineListSearch: (data) => {
      dispatch({ type: "ADD_WINE_LIST_SEARCH", data: data });
    },
    searchingWine: (data) => {
      dispatch({ type: "SEARCHING_WINE", data: data });
    },
  };
};

export default connect(null, mapDispatchToProps)(SimpleSearch);
