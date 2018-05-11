import React from 'react';
import ReactDOM from 'react-dom';
import {Card} from 'antd';

const cardStyle = {width: 240, display: 'inline-block', margin: 20};


export default class FreshmanHandbookSearchResults extends React.Component {
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
                    <Card
                        hoverable
                        style={cardStyle}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                    >
                    </Card>
                    <Card
                        hoverable
                        style={cardStyle}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
                    >
                    </Card>

                </div>
            </div>
        );
    }
}
