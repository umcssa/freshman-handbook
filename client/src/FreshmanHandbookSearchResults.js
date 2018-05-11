import React from 'react';
import ReactDOM from 'react-dom';
import {Card} from 'antd';
import {connect} from "react-redux";

const cardStyle = {width: 240, height: 400, display: 'inline-block', margin: 20};


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
                    backgroundColor: 'rgba(200,200,200,0.5)'
                }}
                onClick={() => {
                    console.log('cancel');
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    maxWidth: '80%',
                    transform: 'translate(-50%, -50%)',
                    whiteSpace: 'nowrap',
                    overflowX: 'auto',
                    overflowY: 'hidden'
                }}>
                    {this.props.searchResults.map((item) => (
                        <Card title={item[0]} style={cardStyle} hoverable>
                            <div dangerouslySetInnerHTML={{__html: item[1]}}></div>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        searchResults: state.searchResults,
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(FreshmanHandbookSearchResults);