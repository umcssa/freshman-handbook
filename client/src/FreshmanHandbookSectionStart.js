import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Icon from 'antd/lib/icon';

const sectionStartStyle = {
    position: 'fixed',
    top: '50%',
    right: 0,
    height: 80,
    width: 280,
    transform: 'translate(0, -50%)',
    backgroundColor: 'rgba(61,148,255,0.6)',
    transition: 'background-color 0.25s'
};

const sectionStartHoverStyle = {
    backgroundColor: 'rgba(61,148,255,1)',
};

const titleContainerStyle = {
    display: 'inline-block',
    height: '100%',
    width: 200,
};

const iconContainerStyle = {
    display: 'inline-block',
    height: '100%',
    width: 80,
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

const titleStyle = {
    fontSize: 30,
    color: '#ffffff',
    opacity: 1,
    margin: 0,
    padding: 0,
    whiteSpace:'nowrap'
};

const iconStyle = {
    fontSize: 45,
    color: '#ffffff',
    opacity: 1
};


class FreshmanHandbookSectionStart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hover: false};
    }

    render() {
        return (
            <Link to={this.props.nextLink}>
                <div style={Object.assign({}, sectionStartStyle, this.state.hover && sectionStartHoverStyle)}
                     onMouseOver={() => {
                         this.setState({hover: true});
                     }}
                     onMouseLeave={() => {
                         this.setState({hover: false});
                     }}>
                    <div
                        style={Object.assign({}, titleContainerStyle, centerParentStyle)}
                    >
                        <span style={Object.assign({}, titleStyle, centerChildStyle)}>{this.props.sectionTitle}</span>
                    </div>
                    <div
                        style={Object.assign({}, iconContainerStyle, centerParentStyle)}
                    >
                        <Icon type="right" style={Object.assign({}, iconStyle, centerChildStyle)}/>
                    </div>
                </div>
            </Link>
        );
    }
}

function mapStateToProps(state) {
    return {
        sectionTitle: state.openKeys[0],
        nextLink: state.nextLink
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(FreshmanHandbookSectionStart);
