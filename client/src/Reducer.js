import * as ActionTypes from './ActionTypes';
import {UPDATEOPENKEYS} from "./ActionTypes";
import {UPDATESELECTEDKEYS} from "./ActionTypes";

export default (state, action) => {
    const {counterCaption} = action;

    switch (action.type) {
        case ActionTypes.UPDATEKEYS:
            const {pathname} = action;
            const split = pathname.split(/\//);
            const uri = split[split.length - 2];
            let menuKey = 0;
            let subMenuKey = 0;
            let optionKey = 0;
            let result = false;
            const BreakException = {};
            try {
                state.hierarchy.forEach((menu) => {
                    menuKey += 1;
                    try {
                        menu[1].forEach((subMenu) => {
                            if (subMenu[1]) {
                                subMenuKey += 1;
                                try {
                                    subMenu[1].forEach((option) => {
                                        optionKey += 1;
                                        if (option[0] === uri) {
                                            result = [[`menu${menuKey}`, `sub${subMenuKey}`], [`${optionKey}`]];
                                        }
                                        if (result) {
                                            throw BreakException;
                                        }
                                    });
                                } catch (e) {
                                    if (e !== BreakException) throw e;
                                }
                            } else {
                                optionKey += 1;
                                if (subMenu[0] === uri) {
                                    result = [[`menu${menuKey}`], [`${optionKey}`]];
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
            return {...state, openKeys: result[0], selectedKeys: result[1]};
        case ActionTypes.UPDATEOPENKEYS:
            return {...state, openKeys: action.openKeys};
        case ActionTypes.UPDATESELECTEDKEYS:
            return {...state, selectedKeys: action.selectedKeys};
        default:
            return state;
    }
}