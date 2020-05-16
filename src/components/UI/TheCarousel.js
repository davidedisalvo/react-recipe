import React, { Component } from "react";
import ReactDOM from "react-dom";
import Fullpage, {
  FullPageSections,
  FullpageSection,
} from "@ap.cx/react-fullpage";
import Header from "../UI/Header";
import style from "./TheCarousel.module.scss";
import { withRouter } from "react-router";

import axios from "axios";

import { Row, Col } from "antd";
import { Button } from "antd";

import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import { connect } from "react-redux";

class TheCarousel extends Component {
  state = {
    infoRecipe: [],
  };
  componentDidMount() {
    axios
      .get(
        `https://api.spoonacular.com/recipes/random?number=4&apiKey=e778dfe43af14044a6f9547ad722f708`
      )
      .then((res) => {
        console.log(res);
        const arr = [];
        arr.push(...res.data.recipes);
        this.setState({ infoRecipe: arr });
      });
  }

  handleSubmit = (el) => {
    console.log(this.state.infoRecipe);
    console.log(el);
    const payload = {
      id: el.id,
      title: el.title,
      img: el.image,
      tags: {
        dairyFree: el.dairyFree,
        glutenFree: el.glutenFree,
        vegetarian: el.vegetarian,
        vegan: el.tagsvegan,
      },
      ingredients: el.extendedIngredients,
      summary: el.summary,
      instructions: el.analyzedInstructions,
      button: el.sourceUrl,
    };
    console.log(payload);
    this.props.addSingleRecipe(payload);

    this.props.history.push(`/recipes/${el.id}`);
  };

  render() {
    console.log(this.state.infoRecipe);
    return (
      <div>
        <Fullpage>
          <FullPageSections>
            <FullpageSection
              style={{
                height: "100vh",
              }}
            >
              <Header></Header>
            </FullpageSection>
            {this.state.infoRecipe.map((el, index) => {
              return (
                <FullpageSection className={style.carouselSection}>
                  <div className={style.container}>
                    <h2>{el.title}</h2>
                    <Row
                      justify="center"
                      align="center"
                      style={{ marginBottom: "40px" }}
                    >
                      <Col className="alignCenter">
                        <div className={style.image}>
                          <img src={el.image}></img>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <div className={`${style.summary} trunc`}>
                        {ReactHtmlParser(el.summary)}
                      </div>
                    </Row>
                    <Button
                      shape="round"
                      size="large"
                      className="customCta"
                      style={{
                        marginTop: "20px",
                        width: "180px",
                        justifyContent: "center",
                      }}
                      onClick={() => this.handleSubmit(el)}
                    >
                      Know more
                    </Button>
                  </div>
                </FullpageSection>
              );
            })}
          </FullPageSections>
        </Fullpage>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addSingleRecipe: (payload) => {
      dispatch({ type: "ADD_SINGLE_RECIPE", data: payload });
    },
  };
};

export default withRouter(connect(null, mapDispatchToProps)(TheCarousel));
