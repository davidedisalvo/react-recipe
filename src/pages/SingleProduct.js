import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import { connect } from "react-redux";
import style from "./SingleProduct.module.scss";
import { Redirect } from "react-router-dom";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

class SingleProduct extends Component {
  handleFavourite = () => {
    this.props.addProductsToFavourite(this.props.product);
  };
  render() {
    console.log(this.props.product);
    if (this.props.product !== null) {
      return (
        <main className={`${style.singleProduct} singleProductPage`}>
          <Row justify="center">
            <Col sm={20} style={{ marginTop: "30px" }}>
              <h1>{this.props.product.title}</h1>
            </Col>
            <Col md={17}>
              <div className={style.image}>
                <img src={this.props.product.img[1]} />
              </div>
            </Col>
          </Row>

          <Row>
            {this.props.product.ingredients.length !== 0 ? (
              <Col xs={24} className={style.ingredients}>
                <h4>Ingredients: </h4>
                <p>{this.props.product.ingredients}</p>
              </Col>
            ) : null}
          </Row>
          {this.props.product.nutrients[0].title === "Net Carbohydrates" ? (
            <Row justify="center">
              <Col span={20}>
                <p
                  style={{ textAlign: "center" }}
                  className={style.ingredients}
                >
                  Sorry we don't have enough informations about this
                </p>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col xs={24} className={style.ingredients}>
                <h4>Nutrients: </h4>
                <ul>
                  {this.props.product.nutrients.map((el, index) => (
                    <li>
                      {el.title}
                      {index + 1 === this.props.product.nutrients.length
                        ? " "
                        : ","}
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
          )}
          <Row justify="center">
            <Col>
              <Button
                onClick={this.handleFavourite}
                className="heartCta customCta"
              >
                ADD TO FAV<span className="elementOut">O</span>URITE
              </Button>
            </Col>
          </Row>
        </main>
      );
    } else {
      return <Redirect to="/products"></Redirect>;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    product: state.singleProduct,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addProductsToFavourite: (data) => {
      dispatch({ type: "ADD_PRODUCTS_TO_FAVOURITE", data: data });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
