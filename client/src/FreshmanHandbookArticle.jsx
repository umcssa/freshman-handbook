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


class FreshmanHandbookArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {content: '', contentDict: {}, loading: false};
    }

    componentDidMount() {
        const title = this.props.selectedKey;
        const content = title in this.props.contentDict ? this.props.contentDict[title] : '';
        if (content === '') {
            this.setState({loading: true});
            $.ajax({
                method: 'GET',
                url: `${apiRootPath}get-article-content/?title=${encodeURIComponent(title)}`,
            }).done((msg) => {
                this.props.onUpdateContent(title, msg);
                this.setState({loading: false});
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const title = nextProps.selectedKey;
        const content = title in nextProps.contentDict ? nextProps.contentDict[title] : '';
        if (content === '') {
            this.setState({loading: true});
            $.ajax({
                method: 'GET',
                url: `${apiRootPath}get-article-content/?title=${encodeURIComponent(title)}`,
            }).done((msg) => {
                this.props.onUpdateContent(title, msg);
                this.setState({loading: false});
            });
        }
    }

    render() {
        return (
            <div style={this.props.width > 576 ? containerStyle : containerStyleMobile}>
                <div style={{width: '100%', height: 80}}>
                    <h1>
                        {this.props.selectedKey}
                        <Spin spinning={this.state.loading} style={{marginLeft: 20}}/>
                    </h1>
                </div>
                <div style={{width: '100%', height: 'calc(100% - 80px)'}}>
                    <Scrollbars style={{width: '100%', height: '100%'}}>
                        <div
                            dangerouslySetInnerHTML={{__html: this.props.selectedKey in this.props.contentDict ? this.props.contentDict[this.props.selectedKey] : ''}}></div>
                    </Scrollbars>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        width: state.width,
        selectedKey: state.selectedKey,
        contentDict: state.contentDict
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onUpdateContent: (title, content) => {
            dispatch(Actions.updateContent(title, content));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FreshmanHandbookArticle);
