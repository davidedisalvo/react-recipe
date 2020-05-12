import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "antd";
import style from "./SingleProduct.module.scss";
import axios from "axios";
import { withRouter } from "react-router";
import { Equalizer } from "react-equalizer";

class SingleProduct extends Component {
  handleSingleProduct = () => {
    axios
      .get(
        `https://api.spoonacular.com/food/products/${this.props.infos.id}?apiKey=e778dfe43af14044a6f9547ad722f708`
      )
      .then((res) => {
        console.log("res", res);
        const payload = {
          id: res.data.id,
          title: res.data.title,
          img: res.data.images,
          description: res.data.description,
          badges: res.data.important_badges,
          ingredients: res.data.ingredientList,
          nutrients: res.data.nutrition.nutrients,
        };
        this.props.addSingleProduct(payload);

        this.props.history.push(`/products/${this.props.infos.id}`);
      });
  };

  componentDidMount() {
    var findClass = document.getElementsByClassName("equalizer");
    var tallest = 0;
    // Loop over matching divs
    for (let i = 0; i < findClass.length; i++) {
      var ele = findClass[i];
      var eleHeight = ele.offsetHeight;
      tallest = eleHeight > tallest ? eleHeight : tallest;
    }
    for (let i = 0; i < findClass.length; i++) {
      findClass[i].style.height = tallest + "px";
    }
  }
  render() {
    return (
      <Col xs={24} sm={12} md={8} lg={6} className={style.colCustom}>
        <article>
          <div className={style.imageContainer}>
            <img src={this.props.infos.image}></img>
          </div>
          <div className={style.titleContainer}>
            <h4 className="title">{this.props.infos.title}</h4>
          </div>
          <Button onClick={this.handleSingleProduct}>Go to the recipe</Button>
        </article>
      </Col>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addSingleProduct: (data) => {
      dispatch({ type: "ADD_SINGLE_PRODUCT", data: data });
    },
  };
};

export default withRouter(connect(null, mapDispatchToProps)(SingleProduct));
