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
          </Menu>
        </>
    )
}

export default Navbar;