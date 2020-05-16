import React, { Component } from "react";
import Header from "../components/UI/Jumbotron";
import SimpleSearch from "../components/UI/SimpleSearch";
import ProductList from "../components/products/ProductList";
import Jumbotron from "../components/UI/Jumbotron";
import { connect } from "react-redux";

import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";

import axios from "axios";

class Products extends Component {
  handleSearch = (value) => {
    axios
      .get(
        `https://api.spoonacular.com/food/products/search?query=${value}&apiKey=e778dfe43af14044a6f9547ad722f708`
      )
      .then((el) => {
        console.log(el);
        const payload = el.data.products;
        this.props.addProductsListSearch(payload);
        this.props.searchingProduct(true);

        scroll.scrollTo(600);
      });
    // .then(scroll.scrollTo(600));
  };
  render() {
    return (
      <main>
        <Jumbotron
          title="SEARCH FOR PRODUCTS"
          copy="Type your product in the form below"
          img={require("../images/headerProducts.jpg")}
          class="jumbotronProduct"
        >
          <SimpleSearch onClick={this.handleSearch} />
        </Jumbotron>
        <ProductList></ProductList>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProductsListSearch: (data) => {
      dispatch({ type: "ADD_PRODUCTS_LIST_SEARCH", data: data });
    },
    searchingProduct: (data) => {
      dispatch({ type: "SEARCHING_PRODUCT", data: data });
    },
  };
};

export default connect(null, mapDispatchToProps)(Products);
