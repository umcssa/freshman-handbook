import * as ActionTypes from './ActionTypes'

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

export const updateContent = (title, content) => {
    return {
        type: ActionTypes.UPDATECONTENT,
        title: title,
        content: content
    }
};

export const endSearch = () => {
    return {
        type: ActionTypes.ENDSEARCH
    }
};

export const beginSearch = () => {
    return {
        type: ActionTypes.BEGINSEARCH
    }
};