import React from 'react';
import {Link} from 'react-router-dom';
import * as Actions from './Actions.js';
import {connect} from 'react-redux';
import Icon from 'antd/lib/icon';

const prevNextStyle = {
    position: 'fixed',
    top: '50%',
    right: 0,
    height: 80,
    width: 160,
    transform: 'translate(0, -50%)',
};

const prevNextStyleMobile = {
    position: 'fixed',
    top: '50%',
    right: 0,
    height: 80,
    width: 40,
    transform: 'translate(0, -50%)',
};

const buttonStyle = {
    display: 'inline-block',
    height: '100%',
    width: '50%',
    backgroundColor: 'rgba(61,148,255,0.6)',
    transition: 'background-color 0.25s'
};

const buttonStyleMobile = {
    display: 'block',
    height: '50%',
    width: '100%',
    backgroundColor: 'rgba(61,148,255,0.6)',
    transition: 'background-color 0.25s'
};

const buttonHoverStyle = {
    backgroundColor: 'rgba(61,148,255,1)'
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
    color: '#ffffff',
    opacity: 1
};

const iconStyleMobile = {
    fontSize: 20,
    color: '#ffffff',
    opacity: 1
};


class FreshmanHandbookPrevNext extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hoverLeft: false, hoverRight: false};
    }

    render() {
        return (
            <div
                style={Object.assign({}, this.props.width > 768 ? prevNextStyle : prevNextStyleMobile, this.props.height > 768 ? {} : {
                    top: 96,
                    transform: 'translate(0, 0)'
                })}>
                <Link to={this.props.prevLink}>
                    <div
                        style={Object.assign({}, this.props.width > 768 ? buttonStyle : buttonStyleMobile, this.state.hoverLeft && buttonHoverStyle, centerParentStyle)}
                        onMouseOver={() => {
                            this.setState({hoverLeft: true});
                        }}
                        onMouseLeave={() => {
                            this.setState({hoverLeft: false});
                        }}
                    >
                        <Icon type="left"
                              style={Object.assign({}, this.props.width > 768 ? iconStyle : iconStyleMobile, centerChildStyle)}/>
                    </div>
                </Link>
                <Link to={this.props.nextLink}>
                    <div
                        style={Object.assign({}, this.props.width > 768 ? buttonStyle : buttonStyleMobile, this.state.hoverRight && buttonHoverStyle, centerParentStyle)}
                        onMouseOver={() => {
                            this.setState({hoverRight: true});
                        }}
                        onMouseLeave={() => {
                            this.setState({hoverRight: false});
                        }}
                    >
                        <Icon type="right"
                              style={Object.assign({}, this.props.width > 768 ? iconStyle : iconStyleMobile, centerChildStyle)}/>
                    </div>
                </Link>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        width: state.width,
        height: state.height,
        prevLink: state.prevLink,
        nextLink: state.nextLink
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(FreshmanHandbookPrevNext);
