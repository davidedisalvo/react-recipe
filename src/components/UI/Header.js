import React from "react";
import { Row, Col, Button } from "antd";
import style from "./Header.module.scss";
import { BsChevronDoubleDown } from "react-icons/bs";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";

function Header() {
  return (
    <section className={`${style.header} header`}>
      <Row
        className={style.rowCustom}
        justify="end"
        align="center"
        style={{ width: "100%" }}
      >
        <Col md={24} lg={10} className={style.column}>
          <h1>This is the food portal</h1>
          <h2>Search for recipes, wines and much more</h2>
          <p>
            Navigate through the website and save recipes in your personal list
          </p>
        </Col>
      </Row>
      <Row justify="end" align="end" className={style.bottom}>
        <Col md={24} lg={10} className={style.column}>
          <div className={style.flex}>
            <div className={style.iconCustom}>
              <BsChevronDoubleDown
                onClick={() => scroll.scrollTo(400)}
                style={{ cursor: "pointer" }}
              />{" "}
            </div>
            <h3>Scroll to see some Recipes</h3>
          </div>
        </Col>
      </Row>
    </section>
  );
}

export default Header;
