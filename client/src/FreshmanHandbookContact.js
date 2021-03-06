import React from 'react';
import ReactStretchableButton from 'react-stretchable-button';
import {Icon, Modal, Button, Input} from 'antd';
import QueueAnim from 'rc-queue-anim';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import wechatAccount from './images/wechat-account.png';
import wechatGroup from './images/wechat-group.jpg';
import {connect} from "react-redux";

const contactStyle = {
    position: 'fixed',
    right: 20,
    bottom: 30,
    height: 320
};

const contactStyleMobile = {
    position: 'fixed',
    right: 0,
    bottom: 0,
    height: 270
};

const reactStretchableButtonStyles = {
    style: {margin: 10},
    buttonStyle: {backgroundColor: '#ffffff'},
    alignRight: true,
    height: 50,
    width: [50, 150],
};

const reactStretchableButtonStylesMobile = {
    style: {marginTop: 10, marginBottom: 0, marginLeft: 0, marginRight: 0},
    buttonStyle: {backgroundColor: '#ffffff'},
    alignRight: true,
    height: 40,
    width: [40, 130],
};


class FreshmanHandbookContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {wechatAccountVisible: false, wechatGroupVisible: false, shareLinkVisible: false};
    }

    render() {
        return (
            <div>
                <div style={this.props.width > 576 ? contactStyle : contactStyleMobile}>
                    <QueueAnim>
                        <ReactStretchableButton
                            key="wechat" {...(this.props.width > 576 ? reactStretchableButtonStyles : reactStretchableButtonStylesMobile)}
                            stretchPadding={this.props.width > 576 ? 25 : 10}
                            onClick={() => {
                                this.setState({wechatAccountVisible: true});
                            }}
                            componentDisplayed={<Icon type="wechat" style={{fontSize: this.props.width > 576 ? 22 : 20}}/>}
                            componentToDisplay={<span style={{whiteSpace: 'nowrap'}}>微信公众号</span>}/>
                        <ReactStretchableButton
                            key="group" {...(this.props.width > 576 ? reactStretchableButtonStyles : reactStretchableButtonStylesMobile)}
                            stretchPadding={this.props.width > 576 ? 25 : 10}
                            onClick={() => {
                                this.setState({wechatGroupVisible: true});
                            }}
                            componentDisplayed={<Icon type="usergroup-add" style={{fontSize: this.props.width > 576 ? 22 : 20}}/>}
                            componentToDisplay={<span style={{whiteSpace: 'nowrap'}}>加入新生群</span>}/>

                        <ReactStretchableButton
                            key="share" {...(this.props.width > 576 ? reactStretchableButtonStyles : reactStretchableButtonStylesMobile)}
                            stretchPadding={this.props.width > 576 ? 20 : 10}
                            onClick={() => {
                                this.setState({shareLinkVisible: true});
                            }}
                            componentDisplayed={<Icon type="share-alt" style={{fontSize: this.props.width > 576 ? 22 : 20}}/>}
                            componentToDisplay={<span
                                style={{whiteSpace: 'nowrap'}}>分享本文链接</span>}/>

                        <ReactStretchableButton
                            key="download" {...(this.props.width > 576 ? reactStretchableButtonStyles : reactStretchableButtonStylesMobile)}
                            stretchPadding={this.props.width > 576 ? 20 : 10}
                            onClick={() => {
                                window.location.href = '/新生手册.pdf';
                            }}
                            componentDisplayed={<Icon type="download" style={{fontSize: this.props.width > 576 ? 22 : 20}}/>}
                            componentToDisplay={<span
                                style={{whiteSpace: 'nowrap'}}>下载新生手册</span>}/>

                        <ReactStretchableButton
                            key="credits" {...(this.props.width > 576 ? reactStretchableButtonStyles : reactStretchableButtonStylesMobile)}
                            stretchPadding={this.props.width > 576 ? 20 : 10}
                            onClick={() => {
                                this.props.history.push(`${this.props.match.url}credits/`);
                            }}
                            componentDisplayed={<Icon type="solution" style={{fontSize: this.props.width > 576 ? 22 : 20}}/>}
                            componentToDisplay={<span
                                style={{whiteSpace: 'nowrap'}}>贡献人员名单</span>}/>
                    </QueueAnim>
                </div>
                <Modal
                    title="微信公众号"
                    visible={this.state.wechatAccountVisible}
                    onCancel={() => {
                        this.setState({wechatAccountVisible: false});
                    }}
                    footer={
                        <Button type="primary" onClick={() => {
                            this.setState({wechatAccountVisible: false});
                        }}>
                            OK
                        </Button>
                    }
                >
                    <img style={{width: '100%'}} src={wechatAccount} alt="微信公众号"/>
                </Modal>
                <Modal
                    title="加入新生群"
                    visible={this.state.wechatGroupVisible}
                    onCancel={() => {
                        this.setState({wechatGroupVisible: false});
                    }}
                    footer={
                        <Button type="primary" onClick={() => {
                            this.setState({wechatGroupVisible: false});
                        }}>
                            OK
                        </Button>
                    }
                >
                    <img style={{width: '100%'}} src={wechatGroup} alt="加入新生群"/>
                </Modal>
                <Modal
                    title="分享本文链接"
                    visible={this.state.shareLinkVisible}
                    onCancel={() => {
                        this.setState({shareLinkVisible: false});
                    }}
                    footer={
                        <CopyToClipboard text={window.location.href}>
                            <Button type="primary">
                                复制链接到剪贴板
                            </Button>
                        </CopyToClipboard>
                    }
                >
                    <Input value={window.location.href} onFocus={(event) => {
                        event.target.select();
                    }}/>
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(FreshmanHandbookContact);
