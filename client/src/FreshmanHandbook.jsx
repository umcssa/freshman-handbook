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
import Counter from './Counter';

const $ = require('jquery');

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
            openKeys: [],
            selectedKeys: [],
            width: '',
            height: '',
        };
        this.getDefaultKeys = this.getDefaultKeys.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    updateDimensions() {
        this.setState({width: $(window).width(), height: $(window).height()});
    }

    componentWillMount() {
        const defaultKeys = this.getDefaultKeys(this.props);
        this.setState({openKeys: defaultKeys[0], selectedKeys: defaultKeys[1]});
        this.updateDimensions();
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }


    componentWillReceiveProps(nextProps) {
        const defaultKeys = this.getDefaultKeys(nextProps);
        this.setState({openKeys: defaultKeys[0], selectedKeys: defaultKeys[1]});
    }

    getDefaultKeys(props) {
        const split = props.location.pathname.split(/\//);
        const uri = split[split.length - 2];
        let menuKey = 0;
        let subMenuKey = 0;
        let optionKey = 0;
        let result = false;
        const BreakException = {};
        try {
            this.props.hierarchy.forEach((menu) => {
                menuKey += 1;
                try {
                    menu[1].forEach((subMenu) => {
                        if (subMenu[1]) {
                            subMenuKey += 1;
                            try {
                                subMenu[1].forEach((option) => {
                                    optionKey += 1;
                                    if (option[0] === uri) {
                                        result = [[`menu${menuKey}`, `sub${subMenuKey}`], [`${optionKey}`]];
                                    }
                                    if (result) {
                                        throw BreakException;
                                    }
                                });
                            } catch (e) {
                                if (e !== BreakException) throw e;
                            }
                        } else {
                            optionKey += 1;
                            if (subMenu[0] === uri) {
                                result = [[`menu${menuKey}`], [`${optionKey}`]];
                            }
                        }
                        if (result) {
                            throw BreakException;
                        }
                    });
                } catch (e) {
                    if (e !== BreakException) throw e;
                }
                if (result) {
                    throw BreakException;
                }
            });
        } catch (e) {
            if (e !== BreakException) throw e;
        }
        return result;
    }


    render() {
        return (
            <div style={{backgroundColor: '#f0f2f5', height: this.state.height}}>
                {this.state.width < 992 ? <RateMyProfessorNavbarCollapse/> : <RateMyProfessorNavbar/>}
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
                            placeholder="请输入搜索内容"
                            onSearch={value => console.log(value)}
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
                                openKeys={this.state.openKeys}
                                onOpenChange={(openKeys) => {
                                    this.setState({openKeys});
                                }}
                                selectedKeys={this.state.selectedKeys}
                                onSelect={(key) => {
                                    this.setState({selectedKeys: key.selectedKeys});
                                }}
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
                       component={FreshmanHandbookSection}/>
                <FreshmanHandbookContact/>
                <Counter caption="First"/>
                <Counter caption="Second"/>
                <Counter caption="Third"/>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        hierarchy: state.hierarchy
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(FreshmanHandbook);
