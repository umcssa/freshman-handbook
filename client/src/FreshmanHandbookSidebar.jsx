import React from 'react';
import {Link} from 'react-router-dom';
import * as Actions from './Actions.js';
import {connect} from 'react-redux';
import Menu from 'antd/lib/menu';

const SubMenu = Menu.SubMenu;

class FreshmanHandbookSidebar extends React.Component {
    render() {
        const menuList = this.props.hierarchy.map((menu) => {
            const menuTitle = menu[0];
            const subMenuList = menu[1].map((subMenu) => {
                if (subMenu[1]) {
                    const subMenuTitle = subMenu[0];
                    const optionList = subMenu[1].map((option) => {
                        return (
                            <Menu.Item key={option[0]}>
                                <Link to={`${this.props.match.url}${menu[0]}/${subMenu[0]}/${option[0]}/`} onClick={this.props.hideSidebar}>
                                    {option[0]}
                                </Link>
                            </Menu.Item>);
                    });
                    return <SubMenu key={subMenuTitle} title={subMenuTitle}>{optionList}</SubMenu>;
                } else {
                    return (
                        <Menu.Item key={subMenu[0]}>
                            <Link to={`${this.props.match.url}${menu[0]}/${subMenu[0]}/`} onClick={this.props.hideSidebar}>
                                {subMenu[0]}
                            </Link>
                        </Menu.Item>);
                }
            });
            return <SubMenu
                key={menuTitle}
                title={menuTitle}
                style={this.props.openKeys[0] === menuTitle ? {color: '#1890ff'} : {}}
                onTitleClick={() => {
                    this.props.history.push(`${this.props.match.url}${menuTitle}/`);
                }}>{subMenuList}</SubMenu>;
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
        },
        hideSidebar: () => {
            dispatch(Actions.hideSidebar());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FreshmanHandbookSidebar);
