import React from 'react';
import ReactDOM from 'react-dom';
import {Input} from 'antd';

const Search = Input.Search;

export default class FreshmanHandbookSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {visible: false};
    }

    render() {
        return (
            <div>
                <Search
                    placeholder="请输入关键词"
                    onSearch={value => console.log(value)}
                    enterButton
                    {...this.props}
                />
            </div>
        );
    }
}
