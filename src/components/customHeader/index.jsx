import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './index.css';

class CustomHeader extends React.Component{
  render(){
    return (
      <div className="customHeader">
        <div className="logo">LOGO</div>
        <div>
          <Avatar icon={<UserOutlined />} />
        </div>
      </div>
    )
  }
}

export default CustomHeader;