import React from "react";
import './index.scss';
import { NavLink } from "react-router-dom";

export const Header = () => {
  let headerMenu = [
    { name: "Upload", path: "/upload" },
    { name: "Search", path: "/search" },
  ];

  return (
    <div className="header">
      <div className="header__subDiv">
        {headerMenu &&
          headerMenu?.map((element, index) => (
            <>
              <NavLink
                key={index}
                to={element?.path}
                className={({ isActive }) =>
                  "menu__list__item" + (isActive ? " header__active" : "")
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
