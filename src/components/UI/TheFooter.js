import React, { Component } from "react";
import style from "./TheFooter.module.scss";
import { Link, NavLink } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Row, Col } from "antd";

class TheFooter extends Component {
  render() {
    return (
      <footer>
        <div className={style.container}>
          <Row align="middle" justify="start">
            <ul>
              <li>
                <NavLink className="cta" to="/privacy-policy">
                  Privacy-policy
                </NavLink>
              </li>
              <li>
                <a
                  className="cta"
                  target="_blank"
                  href="https://spoonacular.com/food-api"
                >
                  About the data
                </a>
              </li>
              <li>
                <a
                  className="cta"
                  target="_blank"
                  href="https://davidedisalvo.com"
                >
                  Made by Davide Di Salvo&copy;
                </a>
              </li>
            </ul>
          </Row>
          <Row className={style.mt}>
            <ul>
              <li className={style.icons}>
                <FaFacebook />
              </li>

              <li className={style.icons}>
                <FaTwitter />
              </li>

              <li className={style.icons}>
                <FaYoutube />
              </li>
            </ul>
          </Row>
        </div>
      </footer>
    );
  }
}

export default TheFooter;
