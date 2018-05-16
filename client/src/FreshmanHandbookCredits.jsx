import React from 'react';
import * as Actions from './Actions.js';
import {connect} from 'react-redux';
import {Spin} from 'antd';
import {Scrollbars} from 'react-custom-scrollbars';

const $ = require('jquery');

const apiRootPath = '/api/freshman-handbook/';
// const apiRootPath = 'http://localhost:8002/api/freshman-handbook/';


const boxShadowStyle = {
    boxShadow: '0 0 6px rgba(0,0,0,0.16)'
};

const containerStyle = Object.assign({
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    padding: 50
}, boxShadowStyle);

const containerStyleMobile = Object.assign({
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    padding: 20
}, boxShadowStyle);


class FreshmanHandbookCredits extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={this.props.width > 576 ? containerStyle : containerStyleMobile}>

                <div style={{width: '100%', height: 80}}><h1>
                    贡献人员
                </h1></div>
                <div style={{width: '100%', height: 'calc(100% - 80px)'}}>
                    <Scrollbars style={{width: '100%', height: '100%'}}>
                        <div style={{overflowWrap: 'break-word', wordWrap: 'break-word'}}>
                            Content
                        </div>
                    </Scrollbars>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        width: state.width,
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FreshmanHandbookCredits);
