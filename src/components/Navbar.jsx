import React, {useState} from 'react';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const Navbar = () => {

    const [current, setState] = useState('mail');

    const handleClick = (e) => {
        console.log('click ', e);
        setState({ current: e.key });
      };

    return (
        <>
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="mail" icon={<MailOutlined />}>
          <Link to='/'>Depertment</Link>
        </Menu.Item>
        <Menu.Item key="mail" icon={<MailOutlined />}>
          <Link to='/emplyees'>Employee</Link> 
        </Menu.Item>
        {/* <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
          Navigation Two
        </Menu.Item> */}
        {/* <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Submenu">
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            Navigation Four - Link
          </a>
        </Menu.Item> */}
      </Menu>
        </>
    )
}

export default Navbar;