import * as ActionTypes from './ActionTypes'

export const resizeWindow = (width, height) => {
    return {
        type: ActionTypes.RESIZEWINDOW,
        width: width,
        height: height,
    }
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

export const updateContent = (title, content) => {
    return {
        type: ActionTypes.UPDATECONTENT,
        title: title,
        content: content
    }
};

export const beginSearch = () => {
    return {
        type: ActionTypes.BEGINSEARCH
    }
};

export const updateSearch = (searchResults) => {
    return {
        type: ActionTypes.UPDATESEARCH,
        searchResults: searchResults,
    }
};

export const endSearch = () => {
    return {
        type: ActionTypes.ENDSEARCH
    }
};

export const showSidebar = () => {
    return {
        type: ActionTypes.SHOWSIDEBAR,
    }
};

export const hideSidebar = () => {
    return {
        type: ActionTypes.HIDESIDEBAR,
    }
};

export const toggleSidebar = () => {
    return {
        type: ActionTypes.TOGGLESIDEBAR,
    }
};