import * as ActionTypes from './ActionTypes';

export default (state, action) => {
    const {counterCaption} = action;

    switch (action.type) {
        case ActionTypes.UPDATEKEYS:
            const {pathname} = action;
            const split = pathname.split(/\//);
            const uri = split[split.length - 2];
            let result = false;
            let prev = false;
            let next = false;
            const BreakException = {};
            try {
                state.hierarchy.forEach((menu) => {
                    try {
                        menu[1].forEach((subMenu) => {
                            if (subMenu[1]) {
                                try {
                                    subMenu[1].forEach((option) => {
                                        if (option[0] === uri) {
                                            result = [menu[0], subMenu[0], option[0]];
                                        } else {
                                            if (result) {
                                                next = [menu[0], subMenu[0], option[0]];
                                            } else {
                                                prev = [menu[0], subMenu[0], option[0]];
                                            }
                                        }
                                        if (next) {
                                            throw BreakException;
                                        }
                                    });
                                } catch (e) {
                                    if (e !== BreakException) throw e;
                                }
                            } else {
                                if (subMenu[0] === uri) {
                                    result = [menu[0], subMenu[0]];
                                } else {
                                    if (result) {
                                        next = [menu[0], subMenu[0]];
                                    } else {
                                        prev = [menu[0], subMenu[0]];
                                    }
                                }
                            }
                            if (next) {
                                throw BreakException;
                            }
                        });
                    } catch (e) {
                        if (e !== BreakException) throw e;
                    }
                    if (next) {
                        throw BreakException;
                    }
                });
            } catch (e) {
                if (e !== BreakException) throw e;
            }
            if (result) {
                let prevLink = '';
                let nextLink = '';
                if (prev && prev[0] === result[0]) {
                    // prevLink goes to the previous article in the same section
                    prevLink = ['', 'freshman-handbook', ...prev, ''].join('/');
                } else {
                    // prevLink goes to this section's homepage
                    prevLink = ['', 'freshman-handbook', result[0], ''].join('/');
                }
                if (next && next[0] === result[0]) {
                    // prevLink goes to the next article in the same section
                    nextLink = ['', 'freshman-handbook', ...next, ''].join('/');
                } else {
                    // prevLink goes to next section's homepage or the credits page
                    nextLink = ['', 'freshman-handbook', next ? next[0] : 'credits', ''].join('/');
                }
                return {
                    ...state,
                    openKeys: result.slice(0, -1),
                    selectedKey: result[result.length - 1],
                    prevLink: prevLink,
                    nextLink: nextLink
                };
            } else {
                return state;
            }
        case ActionTypes.UPDATEOPENKEYS:
            return {...state, openKeys: action.openKeys};
        case ActionTypes.UPDATECONTENT:
            return {...state, contentDict: {...state.contentDict, [action.title]: action.content}};
        default:
            return state;
    }
}