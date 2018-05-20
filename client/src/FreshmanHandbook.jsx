import React from 'react';
import {
    Route,
    Switch,
} from 'react-router-dom';
import * as Actions from './Actions.js';
import {connect} from 'react-redux';
import {Scrollbars} from 'react-custom-scrollbars';
import {Input, Button, Icon} from 'antd';
import RateMyProfessorNavbar from './RateMyProfessorNavbar';
import RateMyProfessorNavbarCollapse from './RateMyProfessorNavbarCollapse';
import FreshmanHandbookSidebar from './FreshmanHandbookSidebar';
import FreshmanHandbookArticle from './FreshmanHandbookArticle';
import FreshmanHandbookContact from './FreshmanHandbookContact';
import FreshmanHandbookSection from './FreshmanHandbookSection';
import FreshmanHandbookPrevNext from './FreshmanHandbookPrevNext';
import FreshmanHandbookSectionStart from './FreshmanHandbookSectionStart';
import FreshmanHandbookSearchResults from './FreshmanHandbookSearchResults';
import FreshmanHandbookCredits from './FreshmanHandbookCredits';

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

const Empty = () => (<div></div>);


class FreshmanHandbook extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            collapsed: true,
        };
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    updateDimensions() {
        this.props.resizeWindow($(window).width(), $(window).height());
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
        const searchDiv = (<div style={Object.assign({
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
                    this.props.hideSidebar();
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
        </div>);

        const sidebarDiv = (<div style={{
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
        </div>);

        return (
            <div style={{backgroundColor: '#f0f2f5', height: this.props.height}}>
                {this.props.width < 992 ? <RateMyProfessorNavbarCollapse/> : <RateMyProfessorNavbar/>}
                <Route strict exact path={`${this.props.match.url}`}
                       component={FreshmanHandbookSection}/>
                <Route strict exact path={`${this.props.match.url}:menu/`}
                       component={FreshmanHandbookSection}/>

                {this.props.width > 768 ? <div style={{
                    display: 'inline-block',
                    height: '100%',
                    width: 420,
                    padding: 50,
                    paddingTop: 96,
                    verticalAlign: 'top'
                }}>
                    {searchDiv}
                    {sidebarDiv}
                </div> : ''}

                <div style={{
                    display: 'inline-block',
                    height: '100%',
                    width: (this.props.width > 768 ? (this.props.width - 420 - 200) : this.props.width),
                    paddingTop: 96,
                    paddingBottom: (this.props.width > 576 ? 50 : 20),
                    paddingLeft: (this.props.width > 768 ? 0 : (this.props.width > 576 ? 50 : 20)),
                    paddingRight: (this.props.width > 768 ? 0 : (this.props.width > 576 ? 50 : 20)),
                    verticalAlign: 'top',
                }}>
                    <Route strict exact path={`${this.props.match.url}:menu/:title/`}
                           component={FreshmanHandbookArticle}/>
                    <Route strict exact path={`${this.props.match.url}:menu/:submenu/:title/`}
                           component={FreshmanHandbookArticle}/>
                    <Route strict exact path={`${this.props.match.url}credits/`}
                           component={FreshmanHandbookCredits}/>
                </div>


                <Route strict exact path={`${this.props.match.url}:menu/:title/`}
                       component={FreshmanHandbookPrevNext}/>
                <Route strict exact path={`${this.props.match.url}:menu/:submenu/:title/`}
                       component={FreshmanHandbookPrevNext}/>

                <Route strict exact path={`${this.props.match.url}`}
                       component={FreshmanHandbookSectionStart}/>
                <Switch>
                    <Route strict exact path={`${this.props.match.url}credits/`}
                           component={Empty}/>
                    <Route strict exact path={`${this.props.match.url}:menu/`}
                           component={FreshmanHandbookSectionStart}/>
                </Switch>


                {this.props.width > 768 ? '' : <div style={{
                    position: 'absolute',
                    height: '100%',
                    width: 420,
                    maxWidth: '100%',
                    top: 0,
                    left: this.props.sidebarVisible ? 0 : -420,
                    padding: 50,
                    paddingTop: 96,
                    verticalAlign: 'top',
                    backgroundColor: 'rgba(200,200,200,0.5)',
                    transition: 'left .5s'
                }}>
                    {searchDiv}
                    {sidebarDiv}
                </div>}

                {this.props.width > 768 ? '' : <Button type="primary" onClick={this.props.toggleSidebar}
                                                       style={{position: 'fixed', top: 96, left: 0}}>
                    <Icon type={this.props.sidebarVisible ? 'menu-fold' : 'menu-unfold'}/>
                </Button>}


                <FreshmanHandbookSearchResults
                    match={this.props.match}
                    history={this.props.history}/>
                <FreshmanHandbookContact
                    match={this.props.match}
                    history={this.props.history}/>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {width: state.width, height: state.height, sidebarVisible: state.sidebarVisible};
}

function mapDispatchToProps(dispatch) {
    return {
        resizeWindow: (width, height) => {
            dispatch(Actions.resizeWindow(width, height));
        },
        updateKeys: (pathname) => {
            dispatch(Actions.updateKeys(pathname));
        },
        onBeginSearch: () => {
            dispatch(Actions.beginSearch());
        },
        updateSearch: (searchResults) => {
            dispatch(Actions.updateSearch(searchResults))
        },
        hideSidebar: () => {
            dispatch(Actions.hideSidebar());
        },
        toggleSidebar: () => {
            dispatch(Actions.toggleSidebar());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FreshmanHandbook);
