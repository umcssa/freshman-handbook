import React from 'react';
import {Link} from 'react-router-dom';
import Menu from 'antd/lib/menu';

const $ = require('jquery');

const SubMenu = Menu.SubMenu;

export default class FreshmanHandbookSidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let menuKey = 0;
    let subMenuKey = 0;
    let optionKey = 0;
    const menuList = this.props.hierarchy.map((menu) => {
      const menuTitle = menu[0];
      const subMenuList = menu[1].map((subMenu) => {
        if (subMenu[1]) {
          const subMenuTitle = subMenu[0];
          const optionList = subMenu[1].map((option) => {
            optionKey += 1;
            return (
              <Menu.Item key={optionKey}>
                <Link to={`${this.props.match.url}${option[0]}/`}>
                  {option[0]}
                </Link>
              </Menu.Item>);
          });
          subMenuKey += 1;
          return <SubMenu key={`sub${subMenuKey}`} title={subMenuTitle}>{optionList}</SubMenu>;
        } else {
          optionKey += 1;
          return (
            <Menu.Item key={optionKey}>
              <Link to={`${this.props.match.url}${subMenu[0]}/`}>
                {subMenu[0]}
              </Link>
            </Menu.Item>);
        }
      });
      menuKey += 1;
      return <SubMenu key={`menu${menuKey}`} title={menuTitle}>{subMenuList}</SubMenu>;
    });
    return (
      <Menu
        mode="inline"
        openKeys={this.props.openKeys}
        onOpenChange={(openKeys) => {
          this.props.onOpenChange(openKeys);
        }}
        selectedKeys={this.props.selectedKeys}
        onSelect={(key) => {
          this.props.onSelect(key);
        }}
      >{menuList}</Menu>
    );
  }
}