import React, { Component, createContext } from "react";
import style from "./Jumbotron.module.scss";
import { Row, Col, Button } from "antd";
import SimpleSearch from "./SimpleSearch";
import axios from "axios";
import { connect } from "react-redux";
import { BsChevronDoubleDown } from "react-icons/bs";

class Jumbotron extends Component {
  handleSearch = (value) => {
    console.log(value);
    this.props.minimizeSearchBy(true);

    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${value}&number=16&apiKey=e778dfe43af14044a6f9547ad722f708`
      )
      .then((el) => {
        console.log(el.data.results);
        const payload = el.data.results;
        this.props.addRecipeListSearch(payload);
        this.props.searchingRecipe(true);
      })
      .catch((err) => {
        console.log(err);
        this.props.errRecipeList(true);
      });
  };
  render() {
    return (
      <section
        className={`${style.jumbotron} ${this.props.class}`}
        style={{ backgroundImage: `url(${this.props.img})` }}
      >
        <Row justify="center" align="middle" className={style.customRow}>
          <Col sm={24} lg={12}>
            <h1>{this.props.title}</h1>
            <h3>{this.props.copy}</h3>
          </Col>
          <Col span={24}>{this.props.children}</Col>
        </Row>
        {this.props.class === "jumbotronRecipe" && !this.props.minimize ? (
          <Row justify="center" align="center" className={style.bottom}>
            <Col md={24} lg={18} className={style.column}>
              <div className={style.flex}>
                <div className={style.iconCustom}>
                  <BsChevronDoubleDown />
                </div>
                <h3>Scroll to search by nutrients or ingredients</h3>
              </div>
            </Col>
          </Row>
        ) : null}
        {this.props.minimize && this.props.class === "jumbotronRecipe" ? (
          <Row
            justify="center"
            style={{ position: "absolute", bottom: "20px", zIndex: 2 }}
          >
            <Button
              className="ctaCustom"
              onClick={() => this.props.minimizeSearchBy(false)}
            >
              Or Search By
            </Button>
          </Row>
        ) : null}
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addRecipeListSearch: (data) => {
      dispatch({ type: "ADD_RECIPE_LIST_SEARCH", data: data });
    },
    minimizeSearchBy: (payload) => {
      dispatch({ type: "MINIMIZE_SEARCH_BY", data: payload });
    },
    errRecipeList: (payload) => {
      dispatch({ type: "ERR_RECIPE_LIST", data: payload });
    },
    searchingRecipe: (payload) => {
      dispatch({ type: "SEARCHING_RECIPE", data: payload });
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    minimize: state.minimizeSearchBy,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Jumbotron);
