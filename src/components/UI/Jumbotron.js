import React from "react";
import style from "./Jumbotron.module.scss";
import { Row, Col, Button } from "antd";
import SimpleSearch from "./SimpleSearch";

function Jumbotron() {
  return (
    <section className={style.jumbotron}>
      <Row justify="center" align="middle">
        <Col span={12}>
          <h1>Search for recipes</h1>
          <h3>Type you recipe in the form below</h3>
        </Col>
        <Col span={24}>
          <SimpleSearch />
        </Col>
      </Row>
    </section>
  );
}

export default Jumbotron;
