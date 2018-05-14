import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {Card} from 'antd';
import {connect} from "react-redux";
import * as Actions from "./Actions";

const cardStyle = {
    width: 240,
    height: 360,
    overflow: 'hidden',
    display: 'inline-block',
    wordWrap: 'break-word',
    whiteSpace: 'normal',
    margin: 20
};

const cardStyleMobile = {
    width: 240,
    height: 360,
    overflow: 'hidden',
    display: 'block',
    wordWrap: 'break-word',
    whiteSpace: 'normal',
    margin: 20
};


class FreshmanHandbookSearchResults extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(200,200,200,0.5)',
                    display: this.props.searchResultsVisible ? 'block' : 'none'
                }}
                onClick={this.props.onEndSearch}
            >
                <div style={this.props.width > 576 ? {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    maxWidth: '80%',
                    transform: 'translate(-50%, -50%)',
                    whiteSpace: 'nowrap',
                    overflowX: 'auto',
                    overflowY: 'hidden'
                } : {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    maxHeight: '80%',
                    transform: 'translate(-50%, -50%)',
                    whiteSpace: 'nowrap',
                    overflowX: 'hidden',
                    overflowY: 'auto'
                }}>
                    {this.props.searchResults.map((item, index) => (
                        <Link to={`${this.props.match.url}${item[2]}`}>
                            <Card key={index} title={item[0]}
                                  style={this.props.width > 576 ? cardStyle : cardStyleMobile} hoverable>
                                <div dangerouslySetInnerHTML={{__html: item[1]}}></div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        width: state.width,
        searchResults: state.searchResults,
        searchResultsVisible: state.searchResultsVisible,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onEndSearch: () => {
            dispatch(Actions.endSearch());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FreshmanHandbookSearchResults);