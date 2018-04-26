import React from 'react';
import ReactDOM from 'react-dom';
import ReactStretchableButton from 'react-stretchable-button';
import {Icon, Modal, Button, Input} from 'antd';
import QueueAnim from 'rc-queue-anim';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const contactStyle = {
    position: 'fixed',
    right: 20,
    bottom: 30,
    height: 300
};

const reactStretchableButtonStyles = {
    style: {margin: 20},
    buttonStyle: {backgroundColor: '#ffffff'},
    alignRight: true,
    height: 50,
    width: [50, 150],
};


export default class FreshmanHandbookContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {shareLinkVisible: false};
    }

    render() {
        return (
            <div>
                <div style={contactStyle}>
                    <QueueAnim>
                        <ReactStretchableButton key="wechat" {...reactStretchableButtonStyles}
                                                componentDisplayed={<Icon type="wechat" style={{fontSize: 22}}/>}
                                                componentToDisplay={<span style={{whiteSpace: 'nowrap'}}>微信公众号</span>}/>
                        <ReactStretchableButton key="group" {...reactStretchableButtonStyles}
                                                componentDisplayed={<Icon type="usergroup-add" style={{fontSize: 22}}/>}
                                                componentToDisplay={<span style={{whiteSpace: 'nowrap'}}>加入新生群</span>}/>
                        <CopyToClipboard text={window.location.href}>
                            <ReactStretchableButton key="share" {...reactStretchableButtonStyles} stretchPadding={20}
                                                    onClick={() => {
                                                        console.log(window.location.href);
                                                        this.setState({shareLinkVisible: true});
                                                    }}
                                                    componentDisplayed={<Icon type="share-alt" style={{fontSize: 22}}/>}
                                                    componentToDisplay={<span
                                                        style={{whiteSpace: 'nowrap'}}>分享本文链接</span>}/>
                        </CopyToClipboard>
                        <ReactStretchableButton key="download" {...reactStretchableButtonStyles} stretchPadding={20}
                                                onClick={() => {
                                                    window.location.href = '/freshman-handbook/uploads/新生手册.pdf/';
                                                }}
                                                componentDisplayed={<Icon type="download" style={{fontSize: 22}}/>}
                                                componentToDisplay={<span
                                                    style={{whiteSpace: 'nowrap'}}>下载新生手册</span>}/>
                    </QueueAnim>
                </div>
                <Modal
                    title="已复制本文链接到剪贴板"
                    visible={this.state.shareLinkVisible}
                    onCancel={() => {
                        this.setState({shareLinkVisible: false});
                    }}
                    footer={
                        <Button type="primary" onClick={() => {
                            this.setState({shareLinkVisible: false});
                        }}>
                            OK
                        </Button>
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
