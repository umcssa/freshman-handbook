import * as ActionTypes from './ActionTypes';

export default (state, action) => {
    const {counterCaption} = action;

    switch (action.type) {
        case ActionTypes.UPDATEKEYS:
            const {pathname} = action;
            const split = pathname.split(/\//);
            const uri = split[split.length - 2];
            let result = false;
            const BreakException = {};
            try {
                state.hierarchy.forEach((menu) => {
                    try {
                        menu[1].forEach((subMenu) => {
                            if (subMenu[1]) {
                                try {
                                    subMenu[1].forEach((option) => {
                                        if (option[0] === uri) {
                                            result = [[menu[0], subMenu[0]], [option[0]]];
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
                                    result = [[menu[0]], [subMenu[0]]];
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
            return {...state, openKeys: result[0], selectedKey: result[1][0]};
        case ActionTypes.UPDATEOPENKEYS:
            return {...state, openKeys: action.openKeys};
        case ActionTypes.UPDATECONTENT:
            return {...state, contentDict: {...state.contentDict, [action.title]: action.content}};
        default:
            return state;
    }
}