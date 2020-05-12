import React from "react";
import SingleRecipe from "./SingleRecipe";
import { connect } from "react-redux";
import { Row } from "antd";
import style from "./RecipeList.module.scss";

function RecipeList(props) {
  return (
    <section>
      <Row gutter={16} className={style.rowCustom} justify="center">
        {props.recipes.length !== 0 ? (
          props.recipes.map((el) => {
            return <SingleRecipe infos={el} />;
          })
        ) : props.searchingRecipe ? (
          <h4 style={{ marginTop: "-20px" }} className="errorBar">
            Sorry we can't find your recipe. Try again.
          </h4>
        ) : null}
      </Row>
    </section>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    recipes: state.recipes,
    searchingRecipe: state.searchingRecipe,
    own: ownProps,
  };
};

export default connect(mapStateToProps)(RecipeList);
