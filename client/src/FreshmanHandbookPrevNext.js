import React from 'react';
import {Link} from 'react-router-dom';
import Icon from 'antd/lib/icon';

const prevNextStyle = {
    position: 'fixed',
    top: '50%',
    right: 0,
    height:80,
    width:160,
    transform: 'translate(0, -50%)',
};

const buttonStyle = {
    display: 'inline-block',
    height: '100%',
    width: '50%',
    backgroundColor: '#85bafc',
    opacity: 0.6,
    transition: 'opacity 0.25s'
};

const buttonHoverStyle = {
    opacity: 1,
};

const centerParentStyle = {
    position: 'relative'
};

const centerChildStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

const iconStyle = {
    fontSize: 45,
    color: '#ffffff'
};


export default class FreshmanHandbookPrevNext extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hoverLeft: false, hoverRight: false};
    }

    render() {
        return (
            <div style={prevNextStyle}>
                <Link to="/freshman-handbook/超市购物/日常用品/外国超市/">
                    <div
                        style={Object.assign({}, buttonStyle, this.state.hoverLeft && buttonHoverStyle, centerParentStyle)}
                        onMouseEnter={() => {
                            this.setState({hoverLeft: true});
                        }}
                        onMouseLeave={() => {
                            this.setState({hoverLeft: false});
                        }}
                    >
                        <Icon type="left" style={Object.assign({}, iconStyle, centerChildStyle)}/>
                    </div>
                </Link>
                <Link to="/freshman-handbook/超市购物/日常用品/外国超市/">
                    <div
                        style={Object.assign({}, buttonStyle, this.state.hoverRight && buttonHoverStyle, centerParentStyle)}
                        onMouseEnter={() => {
                            this.setState({hoverRight: true});
                        }}
                        onMouseLeave={() => {
                            this.setState({hoverRight: false});
                        }}
                    >
                        <Icon type="right" style={Object.assign({}, iconStyle, centerChildStyle)}/>
                    </div>
                </Link>
            </div>
        );
    }
}