import React from 'react';

export default class FreshmanHandbookSection extends React.Component {
    render() {
        return (
            <div style={{position: 'absolute', top: 100, left: 100}}>
                <h1>This is the {this.props.match.params.menu} section title page.</h1>
            </div>
        );
    }
}
