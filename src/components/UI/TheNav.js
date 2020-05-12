import React, { Component, useState } from "react";
import style from "./TheNav.module.scss";
import { Link, NavLink } from "react-router-dom";

class TheNav extends Component {
  state = {
    open: false,
  };
  handleOpenMenu = () => {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  };
  render() {
    return (
      <div className="nav" style={{ height: 0 }}>
        <div className={style.cMenu} style={{ opacity: 1 }}>
          <div className={style.cMenu__line} onClick={this.handleOpenMenu}>
            <div
              className={
                this.state.open
                  ? style.cMenu__line__wrap + " " + style.openIcon
                  : style.cMenu__line__wrap
              }
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div
          className={
            this.state.open
              ? `${style.open} ${style.overlay} ${style.overlaySlidedown}`
              : `${style.overlay} ${style.overlaySlidedown}`
          }
        >
          <nav>
            <ul>
              <li className={style.menuItem}>
                <NavLink
                  to="/"
                  onClick={() => {
                    this.setState({ open: false });
                  }}
                >
                  Home
                </NavLink>
                <span></span>
              </li>
              <li className={style.menuItem}>
                <NavLink
                  to="/recipes"
                  onClick={() => {
                    this.setState({ open: false });
                  }}
                >
                  Recipes
                </NavLink>
              </li>
              <li className={style.menuItem}>
                <NavLink
                  to="/wines"
                  onClick={() => {
                    this.setState({ open: false });
                  }}
                >
                  Wines
                </NavLink>
              </li>
              <li className={style.menuItem}>
                <NavLink
                  to="/products"
                  onClick={() => {
                    this.setState({ open: false });
                  }}
                >
                  Products
                </NavLink>
              </li>
              <li className={style.menuItem}>
                <NavLink
                  to="/favourite"
                  onClick={() => {
                    this.setState({ open: false });
                  }}
                >
                  Favourite
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default TheNav;
