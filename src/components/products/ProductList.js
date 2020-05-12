import React from "react";
import SingleProduct from "./SingleProduct";
import { connect } from "react-redux";
import { Row } from "antd";
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
    return null;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.products,
    own: ownProps,
  };
};

export default connect(mapStateToProps)(ProductList);
