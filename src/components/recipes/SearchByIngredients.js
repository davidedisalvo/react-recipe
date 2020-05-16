import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { Row, Col, Button, Form, Input } from "antd";
import style from "./SearchByNutrients.module.scss";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
const { Search } = Input;

class SearchByNutrients extends Component {
  state = {
    element: "",
    nutrients: [],
  };
  handleChange = (el) => {
    console.log(el.target.value);
    el.preventDefault();

    this.setState({
      element: el.target.value,
    });
  };
  handleAdd = (el) => {
    el.preventDefault();
    console.log("element", el);

    let newArr = [...this.state.nutrients];
    const index = this.state.nutrients.findIndex((e) => {
      console.log(e);
      console.log("tag", el);
      return e === this.state.element;
    });
    if (newArr.length === 0) {
      newArr.push(this.state.element);
    } else {
      if (index === -1 && this.state.element !== "")
        newArr.push(`+${this.state.element}`);
    }
    this.setState({
      nutrients: newArr,
      element: "",
    });
  };
  handleClear = (el) => {
    el.preventDefault();

    this.setState({
      nutrients: [],
    });
  };

  handleSubmit = (el) => {
    el.preventDefault();

    let newString = this.state.nutrients.toString();
    console.log(newString);
    axios
      .get(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${newString}&number=10&apiKey=e778dfe43af14044a6f9547ad722f708`
      )
      .then((el) => {
        const payload = el.data;
        console.log("payload", payload);
        this.props.addRecipeListSearch(payload);
        this.props.searchingRecipe(true);
        scroll.scrollMore(200);
      });
  };

  render() {
    return (
      <form style={{ padding: "20px" }}>
        <div className={style.inputContainer}>
          <input
            value={this.state.element}
            onChange={this.handleChange}
          ></input>{" "}
          <Button className={style.customButton} onClick={this.handleAdd}>
            ADD
          </Button>
          <Button className={style.customButton} onClick={this.handleClear}>
            CLEAR
          </Button>
        </div>
        <div className={style.buttonsContainer}>
          <Button className="ctaCustom" onClick={this.handleSubmit}>
            SUBMIT
          </Button>
        </div>
        {this.state.nutrients.length !== 0 ? (
          <div className={style.textContainer}>
            <h4>You are searching recipe with:</h4>{" "}
            <div className={style.flex}>
              {this.state.nutrients.map((el) =>
                el.startsWith("+") ? <p>{el.substr(1)}</p> : <p>{el}</p>
              )}
            </div>
          </div>
        ) : null}
      </form>
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
export default connect(null, mapDispatchToProps)(SearchByNutrients);
