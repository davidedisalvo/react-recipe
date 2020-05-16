import React from "react";
import SingleProduct from "./SingleProduct";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import style from "./ProductList.module.scss";

function ProductList(props) {
  if (props.products.length !== 0) {
    return (
      <section>
        <Row gutter={16} className={style.rowCustom} justify="center">
          {props.products.map((el) => {
            return <SingleProduct infos={el} />;
          })}
        </Row>
      </section>
    );
  } else {
    if (props.searchingProduct) {
      return (
        <Row justify="center">
          <Col span={20}>
            <h4 style={{ textAlign: "center" }} className="errorBar">
              Sorry we can find your product. Try again.
            </h4>
          </Col>
        </Row>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.products,
    own: ownProps,
    searchingProduct: state.searchingProduct,
  };
};

export default connect(mapStateToProps)(ProductList);
