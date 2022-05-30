import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";

export default function Navbar() {
  const [screenSize, setscreenSize] = useState(window.innerWidth);
  const [activeMenu, setActiveMenu] = useState(true);

  useEffect(() => {
    const handleResize = () =>
      window.addEventListener("resize", () => setscreenSize(window.innerWidth));
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenSize > 800) {
      setActiveMenu(true);
    } else {
      setActiveMenu(false);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar
          src="https://raw.githubusercontent.com/adrianhajdin/project_cryptoverse/main/src/images/cryptocurrency.png"
          size="large"
        />
        <Typography.Title level={3} className="logo">
          <Link to="/"> Cryptoverse </Link>
        </Typography.Title>

        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu theme="dark">
          <Menu.Item key='Home' icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key='cryptocurrencies' icon={<FundOutlined />}>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item key='news' icon={<BulbOutlined />}>
            <Link to="news">News</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
}
