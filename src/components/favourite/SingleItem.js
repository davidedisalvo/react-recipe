import React, { Component } from "react";
import { Col, Row, Button } from "antd";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import style from "./SingleItem.module.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class SingleItem extends Component {
  handleNavigation = () => {
    if (this.props.tag === "recipe") {
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
    }
    if (this.props.tag === "product") {
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
    }

    if (this.props.tag === "wine") {
      axios
        .get(
          `https://api.spoonacular.com/food/wine/dishes?wine=${this.props.infos.title}&apiKey=e778dfe43af14044a6f9547ad722f708`
        )
        .then((el) => {
          const payload = { title: this.props.infos.title, data: el.data };
          this.props.addWineListSearch(payload);
          this.props.history.push(`/wines`);
        });
    }
  };

  handleDelete = () => {
    if (this.props.tag === "recipe") {
      this.props.removeRecipeFromFav(this.props.index);
    }
  };
  render() {
    console.log(this.props.index);
    return (
      <Col lg={20} sm={24}>
        <div className={style.bar}>
          <div className={style.decription} onClick={this.handleNavigation}>
            <img
              src={
                this.props.tag === "wine"
                  ? require("../../images/wine_placeholder.jpg")
                  : this.props.infos.img
              }
            ></img>
            <h4>{this.props.infos.title}</h4>
          </div>

          <div className={style.interact}>
            <AiFillDelete onClick={this.handleDelete} />
          </div>
        </div>
      </Col>
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

export default withRouter(connect(null, mapDispatchToProps)(SingleItem));
