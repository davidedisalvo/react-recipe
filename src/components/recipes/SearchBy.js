import React, { Component } from "react";
import SearchByNutrients from "./SearchByNutrients";
import SearchByIngridients from "./SearchByIngredients";
import { Row, Col, Button, Tabs } from "antd";
import { connect } from "react-redux";

import style from "./searchBy.module.scss";
import { BsArrowRight } from "react-icons/bs";
const { TabPane } = Tabs;

class SearchBy extends Component {
  state = {
    showIngredients: false,
    showNutrients: false,
  };
  render() {
    function callback(key) {
      console.log(key);
    }
    if (this.props.minimize === false) {
      return (
        <section className={style.search}>
          <Row>
            <h2 style={{ textAlign: "center" }}>OR SEARCH BY</h2>
          </Row>
          <Row>
            <Tabs defaultActiveKey="1" type="card" onChange={callback}>
              <TabPane tab="Ingrdients" key="1">
                <h3>INGREDIENTS</h3>

                <SearchByIngridients
                  showIngredients={this.state.showIngredients}
                  showNutrients={this.state.showNutrients}
                ></SearchByIngridients>
              </TabPane>
              <TabPane tab="Nutrients" key="2">
                <h3>NUTRIENTS</h3>

                <SearchByNutrients
                  showIngredients={this.state.showIngredients}
                  showNutrients={this.state.showNutrients}
                ></SearchByNutrients>
              </TabPane>
            </Tabs>
          </Row>
        </section>
      );
    } else {
      return null;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    minimize: state.minimizeSearchBy,
  };
};
export default connect(mapStateToProps)(SearchBy);
