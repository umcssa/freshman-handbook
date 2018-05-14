import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import * as Actions from './Actions.js';
import {connect} from 'react-redux';
import {Scrollbars} from 'react-custom-scrollbars';
import {Input} from 'antd';
import RateMyProfessorNavbar from './RateMyProfessorNavbar';
import RateMyProfessorNavbarCollapse from './RateMyProfessorNavbarCollapse';
import FreshmanHandbookSidebar from './FreshmanHandbookSidebar';
import FreshmanHandbookArticle from './FreshmanHandbookArticle';
import FreshmanHandbookContact from './FreshmanHandbookContact';
import FreshmanHandbookSection from './FreshmanHandbookSection';
import FreshmanHandbookPrevNext from './FreshmanHandbookPrevNext';
import FreshmanHandbookSectionStart from './FreshmanHandbookSectionStart';
import FreshmanHandbookSearchResults from './FreshmanHandbookSearchResults';

const $ = require('jquery');

const apiRootPath = '/api/freshman-handbook/';
// const apiRootPath = 'http://localhost:8002/api/freshman-handbook/';

const Search = Input.Search;

const boxShadowStyle = {
    boxShadow: '0 0 6px rgba(0,0,0,0.16)'
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


class FreshmanHandbook extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            width: '',
            height: '',
        };
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    updateDimensions() {
        this.setState({width: $(window).width(), height: $(window).height()});
    }

    componentWillMount() {
        this.props.updateKeys(this.props.location.pathname);
        this.updateDimensions();
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    componentWillReceiveProps(nextProps) {
        this.props.updateKeys(nextProps.location.pathname);
    }


    render() {
        return (
            <div style={{backgroundColor: '#f0f2f5', height: this.state.height}}>
                {this.state.width < 992 ? <RateMyProfessorNavbarCollapse/> : <RateMyProfessorNavbar/>}
                <Route strict exact path={`${this.props.match.url}:menu/`}
                       component={FreshmanHandbookSection}/>
                <div style={{
                    display: 'inline-block',
                    height: '100%',
                    width: 420,
                    padding: 50,
                    paddingTop: 96,
                    verticalAlign: 'top'
                }}>
                    <div style={Object.assign({
                        height: 75,
                        width: '100%',
                        marginBottom: 50,
                        backgroundColor: '#ffffff',
                    }, boxShadowStyle, centerParentStyle)}>
                        <Search
                            style={Object.assign({width: 'calc(100% - 50px)'}, centerChildStyle)}
                            placeholder="请输入关键词"
                            onSearch={value => {
                                this.props.onBeginSearch();
                                $.ajax({
                                    method: 'GET',
                                    url: `${apiRootPath}search/?q=${encodeURIComponent(value)}`,
                                }).done((msg) => {
                                    if (msg === '[]') {
                                        this.props.updateSearch([['没有找到相关文章', '请尝试使用其他关键词']]);
                                    } else {
                                        this.props.updateSearch(JSON.parse(msg));
                                    }
                                });
                            }}
                            enterButton
                        />
                    </div>
                    <div style={{
                        height: 'calc(100% - 125px)',
                        width: '100%'
                    }}>
                        <Scrollbars style={Object.assign({
                            height: '100%',
                            width: '100%',
                            backgroundColor: '#ffffff'
                        }, boxShadowStyle)} autoHide autoHideTimeout={0} autoHideDuration={250}>
                            <FreshmanHandbookSidebar
                                match={this.props.match}
                                history={this.props.history}
                            />
                        </Scrollbars>
                    </div>
                </div>
                <div style={{
                    display: 'inline-block',
                    height: '100%',
                    width: this.state.width - 420 - 200,
                    paddingTop: 96,
                    paddingBottom: 50,
                    verticalAlign: 'top',
                }}>
                    <Route strict exact path={`${this.props.match.url}:menu/:title/`}
                           component={FreshmanHandbookArticle}/>
                    <Route strict exact path={`${this.props.match.url}:menu/:submenu/:title/`}
                           component={FreshmanHandbookArticle}/>

                </div>
                <Route strict exact path={`${this.props.match.url}:menu/:title/`}
                       component={FreshmanHandbookPrevNext}/>
                <Route strict exact path={`${this.props.match.url}:menu/:submenu/:title/`}
                       component={FreshmanHandbookPrevNext}/>
                <Route strict exact path={`${this.props.match.url}:menu/`}
                       component={FreshmanHandbookSectionStart}/>
                <FreshmanHandbookSearchResults
                    match={this.props.match}
                    history={this.props.history}/>
                <FreshmanHandbookContact/>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        updateKeys: (pathname) => {
            dispatch(Actions.updateKeys(pathname));
        },
        onBeginSearch: () => {
            dispatch(Actions.beginSearch());
        },
        updateSearch: (searchResults) => {
            dispatch(Actions.updateSearch(searchResults))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FreshmanHandbook);
