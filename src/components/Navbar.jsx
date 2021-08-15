import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "antd/dist/antd.css";
import { Menu } from "antd";
import { IdcardFilled, UserOutlined, LogoutOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

const Navbar = () => {
  const [current, setState] = useState("card");
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const handleClick = (e) => {
    console.log("click ", e);
    setState({ current: e.key });
  };

  const makeLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("userToken");
    window.location.reload();
  };

  return (
    <div className="container">
      <div className="row">
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          <Menu.Item
            key="card"
            icon={<IdcardFilled />}
            className={splitLocation[1] === "department" ? "active" : ""}
          >
            <Link to="/department">Depertment</Link>
          </Menu.Item>
          <Menu.Item
            key="user"
            icon={<UserOutlined />}
            className={splitLocation[1] === "employee" ? "active" : ""}
          >
            <Link to="/employee">Employee</Link>
          </Menu.Item>
          <Menu.Item
            key="user"
            icon={<UserOutlined />}
            className={splitLocation[1] === "employeelist" ? "active" : ""}
          >
            <Link to="/employeelist">Material Employee</Link>
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            <Link onClick={(e) => makeLogout(e)}>Logout</Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
