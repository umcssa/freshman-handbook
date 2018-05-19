import React from 'react';
import {connect} from 'react-redux';

class FreshmanHandbookSection extends React.Component {
    render() {
        return (
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'url(/freshman-handbook/uploads/' + this.props.sectionTitle + '.jpg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center'
            }}/>
        );
    }
}


function mapStateToProps(state) {
    return {
        sectionTitle: state.openKeys[0],
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(FreshmanHandbookSection);
