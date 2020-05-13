import React, { Component } from "react";
import Header from "../components/UI/Jumbotron";
import SimpleSearch from "../components/UI/SimpleSearch";
import ProductList from "../components/products/ProductList";

class Products extends Component {
  render() {
    return (
      <main>
        <Header
          title="SEARCH FOR PRODUCT"
          copy={"Type your product in the form below"}
          img={require("../images/headerProducts.jpg")}
        ></Header>
        <ProductList></ProductList>
      </main>
    );
  }
}

export default Products;
