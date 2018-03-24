import React from 'react';
import {Link} from 'react-router-dom';
import * as Actions from './Actions.js';
import {connect} from 'react-redux';
import Menu from 'antd/lib/menu';

const $ = require('jquery');

const SubMenu = Menu.SubMenu;

class FreshmanHandbookSidebar extends React.Component {
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
                            <Menu.Item key={option[0]}>
                                <Link to={`${this.props.match.url}${menu[0]}/${subMenu[0]}/${option[0]}/`}>
                                    {option[0]}
                                </Link>
                            </Menu.Item>);
                    });
                    subMenuKey += 1;
                    return <SubMenu key={subMenuTitle} title={subMenuTitle}>{optionList}</SubMenu>;
                } else {
                    optionKey += 1;
                    return (
                        <Menu.Item key={subMenu[0]}>
                            <Link to={`${this.props.match.url}${menu[0]}/${subMenu[0]}/`}>
                                {subMenu[0]}
                            </Link>
                        </Menu.Item>);
                }
            });
            menuKey += 1;
            return <SubMenu key={menuTitle} title={menuTitle}>{subMenuList}</SubMenu>;
        });
        return (
            <Menu
                mode="inline"
                openKeys={this.props.openKeys}
                onOpenChange={this.props.onUpdateOpenKeys}
                selectedKeys={[this.props.selectedKey]}
            >{menuList}</Menu>
        );
    }
}

function mapStateToProps(state) {
    return {
        hierarchy: state.hierarchy,
        openKeys: state.openKeys,
        selectedKey: state.selectedKey,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onUpdateOpenKeys: (openKeys) => {
            dispatch(Actions.updateOpenKeys(openKeys));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FreshmanHandbookSidebar);
