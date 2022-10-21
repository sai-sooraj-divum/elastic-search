import React from "react";
import './index.scss';
import logo from "../../assets/images/caminosoft.png";
import { NavLink } from "react-router-dom";

export const Header = () => {
  let headerMenu = [
    { name: "Upload", path: "/upload" },
    { name: "Search", path: "/search" },
  ];

  return (
    <div className="header">
      <img src={logo} className="header__logo" />
      <div className="header__subDiv">
        {headerMenu &&
          headerMenu?.map((element, index) => (
            <>
              <NavLink
                key={index}
                to={element?.path}
                className={({ isActive }) =>
                  "header__subDiv__item" + (isActive ? " header__active" : "")
                }
              >
                {element.name}
              </NavLink>
            </>
          ))}
      </div>
    </div>
  );
};
