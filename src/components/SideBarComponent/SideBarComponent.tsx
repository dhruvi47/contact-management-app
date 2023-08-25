import React, { ReactNode, useState } from "react";
import "./SideBarComponent.css";
import { FaBars, FaUserAlt, FaRegChartBar } from "react-icons/fa";
import { NavLink } from "react-router-dom";

type MenuItem = {
  path: string;
  name: string;
  icon: JSX.Element;
};

type Props = {
  children: ReactNode;
};
const SideBarComponent: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem: MenuItem[] = [
    {
      path: "/contact",
      name: "Contact",
      icon: <FaUserAlt />,
    },
    {
      path: "/",
      name: "Charts & Maps ",
      icon: <FaRegChartBar />,
    },
  ];
  return (
    <>
      <div className="flex h-screen">
        <div
          style={{ width: isOpen ? "200px" : "50px", background: "#3F7BDE" }}
          className="sidebar"
        >
          <div className="top_section">
            <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
              Navigation
            </h1>
            <div
              style={{ marginLeft: isOpen ? "15px" : "0px" }}
              className="bars"
            >
              <FaBars onClick={toggle} style={{ color: "white" }} />
            </div>
          </div>
          {menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="link">
              <div className="flex items-center" style={{ padding: "4px" }}>
                <div
                  className="icon"
                  style={{ marginRight: "10px", color: "white" }}
                >
                  {item.icon}
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none", color: "white" }}
                  className="link_text"
                >
                  {item.name}
                </div>
              </div>
            </NavLink>
          ))}
        </div>
        <div className="flex-grow  overflow-y-auto">{children} </div>
      </div>
    </>
  );
};

export default SideBarComponent;
