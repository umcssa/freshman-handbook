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
                                            //prev = [[menu[0], subMenu[0]], [option[0]]];
                                        }
                                        if (result) {
                                            throw BreakException;
                                        }
                                    });
                                } catch (e) {
                                    if (e !== BreakException) throw e;
                                }
                            } else {
                                if (subMenu[0] === uri) {
                                    result = [menu[0], subMenu[0]];
                                }
                            }
                            if (result) {
                                throw BreakException;
                            }
                        });
                    } catch (e) {
                        if (e !== BreakException) throw e;
                    }
                    if (result) {
                        throw BreakException;
                    }
                });
            } catch (e) {
                if (e !== BreakException) throw e;
            }
            if (result) {
                return {...state, openKeys: result.slice(0, -1), selectedKey: result[result.length - 1]};
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