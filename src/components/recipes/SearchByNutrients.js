import React, { Component } from "react";
import { Row, Col, Button, List, InputNumber, Divider, Tabs } from "antd";
import style from "./SearchByIngredients.module.scss";
import { connect } from "react-redux";
import axios from "axios";
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}

class SearchByIngredients extends Component {
  state = {
    showCholesterol: false,
    showFat: false,
    showSugar: false,
    minCholesterol: 0,
    maxCholesterol: 100,
    minFat: 0,
    maxFat: 100,
    minSugar: 0,
    maxSugar: 100,
  };
  minCholesterol = (el) => {
    console.log(el.target.value);
    if (el.target.value < 0) {
      el.target.value = 0;
    }

    if (el.target.value > 100) {
      el.target.value = 100;
    }
    if (el.target.value >= 0 && el.target.value <= 100) {
      this.setState({
        minCholesterol: el.target.value,
      });
    }
  };
  maxCholesterol = (el) => {
    if (el.target.value < 0) {
      el.target.value = 0;
    }

    if (el.target.value > 100) {
      el.target.value = 100;
    }
    if (el.target.value >= 0 && el.target.value <= 100) {
      this.setState({
        maxCholesterol: el.target.value,
      });
    }
  };

  handleSubmitCholesterol = () => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/findByNutrients?minCholesterol=${this.state.minCholesterol}&maxCholesterol=${this.state.maxCholesterol}&number=10&apiKey=e778dfe43af14044a6f9547ad722f708`
      )
      .then((data) => {
        console.log("cholest", data);
        const payload = data.data;
        this.props.addRecipeListSearch(payload);
        this.props.searchingRecipe(payload);
      });
  };
  minFat = (el) => {
    this.setState({
      minFat: el.target.value,
    });
    console.log("minFat", el);
  };
  maxFat = (el) => {
    this.setState({
      maxFat: el.target.value,
    });
  };
  handleSubmitFat = () => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/findByNutrients?minFat=${this.state.minFat}&maxFat=${this.state.maxFat}&number=10&apiKey=e778dfe43af14044a6f9547ad722f708`
      )
      .then((data) => {
        console.log("cholest", data);
        const payload = data.data;
        this.props.addRecipeListSearch(payload);
        this.props.searchingRecipe(payload);
      });
  };
  minSugar = (el) => {
    this.setState({
      minSugar: el.target.value,
    });
    console.log("minSugar", el);
  };
  maxSugar = (el) => {
    this.setState({
      maxSugar: el.target.value,
    });
  };
  handleSubmitSugar = () => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/findByNutrients?minSugar=${this.state.minSugar}&maxSugar=${this.state.maxSugar}&number=10&apiKey=e778dfe43af14044a6f9547ad722f708`
      )
      .then((data) => {
        console.log("cholest", data);
        const payload = data.data;
        this.props.addRecipeListSearch(payload);
        this.props.searchingRecipe(payload);
      });
  };
  render() {
    return (
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Cholesterol" key="1">
          <div className={style.tabContent}>
            <h4>
              The minimum and the maximum amount of cholesterol in milligrams
              the recipe must have.
            </h4>
            <div className={style.numbers}>
              <input
                value={this.state.minCholesterol}
                type="number"
                onChange={this.minCholesterol}
                min="0"
                max="100"
              ></input>
              <input
                value={this.state.maxCholesterol}
                type="number"
                onChange={this.maxCholesterol}
                min="0"
                max="100"
              ></input>
            </div>
            <Button
              className={style.submit}
              onClick={this.handleSubmitCholesterol}
            >
              Submit
            </Button>
          </div>
        </TabPane>
        <TabPane tab="Fat" key="2">
          <div className={style.tabContent}>
            <h4>
              The minimum and the maximum amount of fat in milligrams the recipe
              must have.
            </h4>
            <div className={style.numbers}>
              <input
                value={this.state.minFat}
                type="number"
                onChange={this.minFat}
                min="0"
                max="100"
              ></input>
              <input
                value={this.state.maxFat}
                type="number"
                onChange={this.maxFat}
                min="0"
                max="100"
              ></input>
            </div>
            <Button onClick={this.handleSubmitFat} className={style.submit}>
              Submit
            </Button>
          </div>
        </TabPane>
        <TabPane tab="Sugar" key="3">
          <div className={style.tabContent}>
            <h4>
              The minimum and the maximum amount of fat in milligrams the recipe
              must have.
            </h4>
            <div className={style.numbers}>
              <input
                value={this.state.minSugar}
                type="number"
                onChange={this.minSugar}
                min="0"
                max="100"
              ></input>
              <input
                value={this.state.maxSugar}
                type="number"
                onChange={this.maxSugar}
                min="0"
                max="100"
              ></input>
            </div>
            <Button onClick={this.handleSubmitSugar} className={style.submit}>
              Submit
            </Button>
          </div>
        </TabPane>
      </Tabs>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addRecipeListSearch: (data) => {
      dispatch({ type: "ADD_RECIPE_LIST_SEARCH", data: data });
    },
    searchingRecipe: (payload) => {
      dispatch({ type: "SEARCHING_RECIPE", data: payload });
    },
  };
};

export default connect(null, mapDispatchToProps)(SearchByIngredients);
