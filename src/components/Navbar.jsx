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

    const makeLogout = (e) => {
      e.preventDefault();
      localStorage.removeItem('userToken');
      window.location.reload();
    };

    return (
        <div className="container">
            <div className="row">
              <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                <Menu.Item key="mail" icon={<MailOutlined />}>
                  <Link to='/department'>Depertment</Link>
                </Menu.Item>
                <Menu.Item key="mail" icon={<MailOutlined />}>
                  <Link to='/employee'>Employee</Link> 
                </Menu.Item>
                <Menu.Item key="logout" icon={<MailOutlined />}>
                  <Link onClick={(e) => makeLogout(e)}>Logout</Link> 
                </Menu.Item>
              </Menu>
            </div>
        </div>
    )
}

export default Navbar;