import React from 'react';

export default class FreshmanHandbookSection extends React.Component {
    render() {
        return (
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'url(/freshman-handbook/uploads/test.jpg) no-repeat center center fixed',
                backgroundSize:'cover',
            }} />
        );
    }
}
