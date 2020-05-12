import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "antd";
import style from "./SingleRecipe.module.scss";
import axios from "axios";
import { withRouter } from "react-router";
import { Equalizer } from "react-equalizer";

class SingleRecipe extends Component {
  handleSingleRecipe = () => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/${this.props.infos.id}/information?includeNutrition=false&apiKey=e778dfe43af14044a6f9547ad722f708`
      )
      .then((res) => {
        console.log("res", res);
        const payload = {
          id: res.data.id,
          title: res.data.title,
          img: res.data.image,
          tags: {
            dairyFree: res.data.dairyFree,
            glutenFree: res.data.glutenFree,
            vegetarian: res.data.vegetarian,
            vegan: res.data.tagsvegan,
          },
          ingredients: res.data.extendedIngredients,
          summary: res.data.summary,
          instructions: res.data.analyzedInstructions,
          button: res.data.sourceUrl,
        };
        console.log(payload);
        this.props.addSingleRecipe(payload);

        this.props.history.push(`/recipes/${this.props.infos.id}`);
      });
  };

  componentDidMount() {
    var findClass = document.getElementsByClassName("equalizer");
    var tallest = 0;
    // Loop over matching divs
    for (let i = 0; i < findClass.length; i++) {
      var ele = findClass[i];
      var eleHeight = ele.offsetHeight;
      tallest =
        eleHeight > tallest
          ? eleHeight
          : tallest; /* look up ternary operator if you dont know what this is */
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
          <div style={{ margin: "25px 0" }}>
            <h4 className="title">{this.props.infos.title}</h4>
          </div>
          <Button onClick={this.handleSingleRecipe}>Go to the recipe</Button>
        </article>
      </Col>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addSingleRecipe: (data) => {
      dispatch({ type: "ADD_SINGLE_RECIPE", data: data });
    },
    searchingRecipe: (payload) => {
      dispatch({ type: "SEARCHING_RECIPE", data: payload });
    },
  };
};

export default withRouter(connect(null, mapDispatchToProps)(SingleRecipe));
