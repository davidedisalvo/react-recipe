import React, { Component } from "react";
import Header from "../components/products/Header";
import SimpleSearch from "../components/UI/SimpleSearch";
import ProductList from "../components/products/ProductList";

class Products extends Component {
  render() {
    return (
      <main>
        <Header></Header>
        <ProductList></ProductList>
      </main>
    );
  }
}

export default Products;
