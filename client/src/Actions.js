import * as ActionTypes from './ActionTypes'

export const increment = (counterCaption) => {
    return {
        type: ActionTypes.INCREMENT,
        counterCaption: counterCaption
    };
};

export const decrement = (counterCaption) => {
    return {
        type: ActionTypes.DECREMENT,
        counterCaption: counterCaption
    };
};

export const updateKeys = (pathname) => {
    return {
        type: ActionTypes.UPDATEKEYS,
        pathname: pathname
    }
};

export const updateOpenKeys = (openKeys) => {
    return {
        type: ActionTypes.UPDATEOPENKEYS,
        openKeys: openKeys
    }
};

export const updateSelectedKeys = (selectedKeys) => {
    return {
        type: ActionTypes.UPDATESELECTEDKEYS,
        selectedKeys: selectedKeys
    }
};