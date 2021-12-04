import { SET_CURRENT_USER, USER_LOADING } from "../actions/types";
// import dispatch from "react-redux"

const isEmpty = require("is-empty");
const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
};
// eslint-disable-next-line import/no-anonymous-default-export
const user = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default user;

// dispatch(setCurrentUser(jwt_decode(localStorage.getItem("jwtToken"))))
