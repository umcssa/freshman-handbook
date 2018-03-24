import React from 'react';
import ReactStretchableButton from 'react-stretchable-button';
import Icon from 'antd/lib/icon';
import QueueAnim from 'rc-queue-anim';

const contactStyle = {
    position: 'fixed',
    right: 20,
    bottom: 20,
    height: 300
};

const reactStretchableButtonStyles = {
    style: {margin: 20},
    buttonStyle: {backgroundColor: '#ffffff'},
    alignRight: true,
    height: 50,
    width: [50, 150],
};


const FreshmanHandbookContact = () => (
    <div style={contactStyle}>
        <QueueAnim>
            <ReactStretchableButton key="wechat" {...reactStretchableButtonStyles}
                                    componentDisplayed={<Icon type="wechat" style={{fontSize: 22}}/>}
                                    componentToDisplay={<span style={{whiteSpace: 'nowrap'}}>微信公众号</span>}/>
            <ReactStretchableButton key="group" {...reactStretchableButtonStyles}
                                    componentDisplayed={<Icon type="usergroup-add" style={{fontSize: 22}}/>}
                                    componentToDisplay={<span style={{whiteSpace: 'nowrap'}}>加入新生群</span>}/>
            <ReactStretchableButton key="share" {...reactStretchableButtonStyles} stretchPadding={20}
                                    componentDisplayed={<Icon type="share-alt" style={{fontSize: 22}}/>}
                                    componentToDisplay={<span style={{whiteSpace: 'nowrap'}}>分享本文链接</span>}/>
            <ReactStretchableButton key="download" {...reactStretchableButtonStyles} stretchPadding={20}
                                    componentDisplayed={<Icon type="download" style={{fontSize: 22}}/>}
                                    componentToDisplay={<span style={{whiteSpace: 'nowrap'}}>下载新生手册</span>}/>
        </QueueAnim>
    </div>
);

export default FreshmanHandbookContact