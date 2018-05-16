import React from 'react';
import * as Actions from './Actions.js';
import {connect} from 'react-redux';
import {Scrollbars} from 'react-custom-scrollbars';
import wechatGroup from './images/wechat-group.jpg';

const $ = require('jquery');

const apiRootPath = '/api/freshman-handbook/';
// const apiRootPath = 'http://localhost:8002/api/freshman-handbook/';

const centerParentStyle = {
    position: 'relative'
};

const centerChildStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

const boxShadowStyle = {
    boxShadow: '0 0 6px rgba(0,0,0,0.16)'
};

const containerStyle = Object.assign({
    display: 'inline-block',
    verticalAlign: 'top',
    width: '50%',
    height: '100%',
    backgroundColor: '#ffffff',
    padding: 50
}, boxShadowStyle);

const containerStyleBarcode = Object.assign({
    display: 'inline-block',
    verticalAlign: 'top',
    marginLeft: 50,
    width: 'calc(50% - 50px)',
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

const credits = ['zianke', 'zekunjia', 'jasonzhao1998'];


class FreshmanHandbookCredits extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{
                width: '100%',
                height: '100%',
            }}>
                <div style={this.props.width > 992 ? containerStyle : containerStyleMobile}>

                    <div style={{width: '100%', height: 80, textAlign: 'center'}}><h1>
                        贡献人员
                    </h1></div>
                    <div style={{width: '100%', height: 'calc(100% - 80px)'}}>
                        <Scrollbars style={{width: '100%', height: '100%'}}>
                            <div style={{
                                overflowWrap: 'break-word',
                                wordWrap: 'break-word',
                                textAlign: 'center',
                                fontSize: this.props.width > 576 ? 30 : 20
                            }}>
                                {credits.map((item) => (<p style={{marginBottom: 10}}>{item}</p>))}
                            </div>
                        </Scrollbars>
                    </div>
                </div>
                <div style={this.props.width > 992 ? containerStyleBarcode : {display: 'none'}}>
                    <div style={Object.assign({height: '100%', width: '100%'}, centerParentStyle)}>
                        <div style={Object.assign({width: '100%', textAlign: 'center'}, centerChildStyle)}>
                            <h1>
                                新生小助手
                            </h1>
                            <img src={wechatGroup} style={{width: '100%'}}/>
                        </div>
                    </div>
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
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(FreshmanHandbookCredits);
