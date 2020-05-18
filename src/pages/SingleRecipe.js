import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Divider } from "antd";
import style from "./SingleRecipe.module.scss";
import { BsArrowRight } from "react-icons/bs";
import { Redirect } from "react-router-dom";
import Split from "react-split";

import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

class SingleRecipe extends Component {
  handleFavourite = (e) => {
    this.props.addRecipesToFavourite(this.props.recipe);
  };
  render() {
    console.log("this.props", this.props);
    if (this.props.recipe) {
      return (
        <main>
          <section className={style.singleRecipe}>
            <Row justify="center">
              <h1>{this.props.recipe.title}</h1>
            </Row>
            <Row
              align="middle"
              justify="center"
              className={style.rowRecipe}
              gutter={50}
            >
              <Col md={10}>
                <div className={style.imgContainer}>
                  <img src={this.props.recipe.img} />
                </div>
              </Col>
              <Col md={10} className={style.ingredientsContainer}>
                <h4>Ingredients:&nbsp;</h4>
                <ul className={style.ingredients}>
                  {this.props.recipe.ingredients.map((el) => {
                    return (
                      <li>
                        {el.amount}&nbsp;
                        {el.unit}&nbsp;
                        {el.aisle}&nbsp;
                      </li>
                    );
                  })}
                </ul>
              </Col>
            </Row>
            <Divider
              orientation="left"
              style={{ color: "#333", fontWeight: "normal", margin: "44px 0" }}
            ></Divider>
            <Row justify="center">
              <Col sm={24} lg={10}>
                <div>
                  <ul
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    <li>
                      <span>Dairyfree:&nbsp;</span>
                      {this.props.recipe.tags.dairyFree ? "Yes" : "No"}
                    </li>
                    <li>
                      <span>Glutenfree:&nbsp;</span>
                      {this.props.recipe.tags.glutenFree ? "Yes" : "No"}
                    </li>
                    <li>
                      <span>Vegetarian:&nbsp;</span>
                      {this.props.recipe.tags.vegetarian ? "Yes" : "No"}
                    </li>
                    <li>
                      <span>Vegan:&nbsp;</span>
                      {this.props.recipe.tags.vegan ? "Yes" : "No"}
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
            <Divider
              orientation="left"
              style={{ color: "#333", fontWeight: "normal", margin: "44px 0" }}
            ></Divider>
            <Row>
              <Col span={24} className={style.summaryContainer}>
                {ReactHtmlParser(this.props.recipe.summary)}
              </Col>
            </Row>
            <Divider
              orientation="left"
              style={{ color: "#333", fontWeight: "normal", margin: "44px 0" }}
            ></Divider>

            {this.props.recipe.instructions.length !== 0 ? (
              <Row justify="center">
                <Col span={20}>
                  <h4>Instructions:</h4>

                  {this.props.recipe.instructions.map((el) => {
                    return el.steps.map((el) => {
                      return (
                        <>
                          <ul className={style.instructions}>
                            <li>
                              <span>{el.number}</span>&nbsp;{el.step}
                            </li>
                          </ul>
                        </>
                      );
                    });
                  })}
                </Col>
              </Row>
            ) : (
              <Row justify="center">
                <Col>
                  <a
                    target="_blank"
                    className={`${style.ctaCustom}`}
                    href={this.props.recipe.button}
                  >
                    Know more about this recipe <BsArrowRight />
                  </a>
                </Col>
              </Row>
            )}
            <Row justify="center" style={{ marginTop: "60px" }}>
              <Col>
                <Button
                  className="customCta heartCta"
                  onClick={this.handleFavourite}
                >
                  ADD TO FAV<span className="elementOut">O</span>URITE
                </Button>
              </Col>
            </Row>
          </section>
        </main>
      );
    } else {
      return <Redirect to="/recipes" />;
    }
  }
}
// const mapStateToProps = (state, ownProps) => {
//   let id = ownProps.match.params.recipe_id;
//   return {
//     recipe: state.recipes.find((recipe) => recipe.id == id),
//   };
// };

const mapStateToProps = (state) => {
  return {
    recipe: state.sigleRecipe,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addRecipesToFavourite: (data) => {
      dispatch({ type: "ADD_RECIPES_TO_FAVOURITE", data: data });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipe);
