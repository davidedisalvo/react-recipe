import React, { Component } from "react";
import SingleItem from "./SingleItem";
import { Row, Col, Tabs } from "antd";
import { connect } from "react-redux";

const { TabPane } = Tabs;

class TheTabs extends Component {
  handleDelete = (el, index) => {
    this.props.removeRecipeFromFav(index);
  };
  render() {
    return (
      <section style={{ marginTop: "70px" }}>
        <Row justify="center">
          <h1>My favourite list</h1>
        </Row>
        {this.props.favourite.recipes.length === 0 &&
        this.props.favourite.wines.length === 0 &&
        this.props.favourite.products.length === 0 ? (
          <Row justify="center" className="fullHeight">
            <Col>
              <h4>you don t have any favourite item yet</h4>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col span={24}>
              <Tabs type="card">
                <TabPane tab="RECIPES" key="1">
                  {this.props.favourite.recipes
                    ? this.props.favourite.recipes.map((el, index) => (
                        <Row justify="center">
                          <SingleItem
                            tag={"recipe"}
                            infos={el}
                            index={index}
                          ></SingleItem>
                        </Row>
                      ))
                    : null}
                </TabPane>
                <TabPane tab="PRODUCTS" key="2">
                  {this.props.favourite.products ? (
                    this.props.favourite.products.map((el, index) => (
                      <Row justify="center">
                        <SingleItem
                          tag={"product"}
                          infos={el}
                          index={index}
                        ></SingleItem>
                      </Row>
                    ))
                  ) : (
                    <h4 className="errorBar">
                      You don't have any favourite product, yet
                    </h4>
                  )}
                </TabPane>
                <TabPane tab="WINES" key="3">
                  {this.props.favourite.wines ? (
                    this.props.favourite.wines.map((el, index) => (
                      <Row justify="center">
                        <SingleItem
                          tag={"wine"}
                          infos={el}
                          index={index}
                        ></SingleItem>
                      </Row>
                    ))
                  ) : (
                    <h4 className="errorBar">
                      You don't have any favourite wine, yet
                    </h4>
                  )}
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        )}
      </section>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addSingleRecipe: (data) => {
      dispatch({ type: "ADD_SINGLE_RECIPE", data: data });
    },
    addSingleProduct: (data) => {
      dispatch({ type: "ADD_SINGLE_PRODUCT", data: data });
    },
    addWineListSearch: (data) => {
      dispatch({ type: "ADD_WINE_LIST_SEARCH", data: data });
    },
    removeRecipeFromFav: (data) => {
      dispatch({ type: "REMOVE_RECIPE_FROM_FAV", data: data });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    favourite: state.favourite,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TheTabs);
