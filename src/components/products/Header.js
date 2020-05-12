import React from "react";
import style from "./header.module.scss";
import { Row, Col, Button } from "antd";
import SimpleSearch from "./SimpleSearch";

function Jumbotron() {
  return (
    <section className={style.jumbotron}>
      <Row justify="center" align="middle" className={style.customRow}>
        <Col span={12}>
          <h1>Search for Products</h1>
          <h3>Type you products in the form below</h3>
        </Col>
        <Col span={24}>
          <SimpleSearch />
        </Col>
      </Row>
    </section>
  );
}

export default Jumbotron;
