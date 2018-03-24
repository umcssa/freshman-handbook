import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import {Scrollbars} from 'react-custom-scrollbars';
import {Input} from 'antd';
import RateMyProfessorNavbar from './RateMyProfessorNavbar';
import RateMyProfessorNavbarCollapse from './RateMyProfessorNavbarCollapse';
import FreshmanHandbookSidebar from './FreshmanHandbookSidebar';
import FreshmanHandbookArticle from './FreshmanHandbookArticle';
import FreshmanHandbookContact from './FreshmanHandbookContact';
import FreshmanHandbookSection from './FreshmanHandbookSection';
import FreshmanHandbookPrevNext from './FreshmanHandbookPrevNext';

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


export default class FreshmanHandbook extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            hierarchy: [
                ['出国前准备', [
                    ['签证', [
                        ['签证申请流程', 0],
                        ['签证所需材料', 0]]],
                    ['航程信息', [
                        ['机场', 0],
                        ['机票预订', 0]]],
                    ['行李准备', [
                        ['行李规格', 0],
                        ['起飞时建议随身携带的物品', 0],
                        ['非随身携带的日用品', 0],
                        ['选带项', 0]]],
                    ['体检 & 疫苗 & 医疗保险', [
                        ['体检和疫苗', 0],
                        ['医疗保险', 0]]],
                    ['学费', 0]]],
                ['入学指南', [
                    ['Mandatory Immigration Check-In', 0],
                    ['International Orientation', 0],
                    ['M-Card', 0],
                    ['手机开通', 0],
                    ['银行开户', 0],
                    ['注册选课', 0],
                    ['宿舍介绍', [
                        ['中校区宿舍', 0],
                        ['Hill居住区', 0],
                        ['北校区宿舍', 0],
                        ['校内宿舍信息补充', 0]]],
                    ['Learning Communities', [
                        ['Residential Communities', 0],
                        ['Non-Residential Communities', 0]]],
                    ['校外租房', [
                        ['中校区房源', 0],
                        ['北校区房源', 0],
                        ['校外租房信息', 0]]],
                    ['家具购买', 0],
                    ['水、电、网及电视信号办理', 0]]],
                ['超市购物', [
                    ['日常用品', [['外国超市', 0], ['中国超市', 0], ['一元店', 0]]],
                    ['服装', 0],
                    ['电器和文具', 0],
                    ['网购', 0],
                    ['食材和药品', 0]]],
                ['休闲娱乐', [
                    ['电影院', 0],
                    ['健身场所', 0],
                    ['音乐会', 0],
                    ['体育赛事观看', 0]]],
                ['交通', [
                    ['驾照考试', 0],
                    ['Blue Bus & AATA Bus', 0],
                    ['Safe Ride & Taxi', 0]]],
                ['社团介绍', [
                    ['安娜说话剧社 (Thus Spoke Ann Arbor)', 0],
                    ['Dream Crops', 0],
                    ['茉莉舞团：一双舞鞋 一个梦想', 0],
                    ['安娜贝拉 (Annappella)', 0],
                    ['HKSA', 0],
                    ['Michigan Chinese Business Club (MCBC)', 0],
                    ['中国经济发展协会 (ACED)', 0],
                    ['中华创新与创业联盟 (CEN)', 0],
                    ['安城文化沙龙', 0],
                    ['VeryUS', 0],
                    ['密西根大学中国本科学生会', 0]]]],
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
            this.state.hierarchy.forEach((menu) => {
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
                                hierarchy={this.state.hierarchy}
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
                    width: this.state.width-420-200,
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

            </div>
        );
    }
}
