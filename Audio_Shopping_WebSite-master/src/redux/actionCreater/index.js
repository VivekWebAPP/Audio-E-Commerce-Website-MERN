import { addToTheCart, fetchAllItems, removeFromCart } from "../../API/cart";
import { login, sigin } from "../../API/loginAndSigin";

export const loginAction = (name, email, password) => {
    return async (dispatch) => {
        try {
            const res = await login(name, email, password);
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: res,
            });
        } catch (error) {
            dispatch({
                type: "LOGIN_FAILURE",
                payload: error.message,
            });
        }
    };
};

export const siginAction = (name, email, password, phone, address, country) => {
    return async (dispatch) => {
        try {
            const res = await sigin(name, email, password, phone, address, country);
            dispatch({
                type: "SIGNIN_SUCCESS",
                payload: res,
            });
        } catch (error) {
            dispatch({
                type: "SIGNIN_FAILURE",
                payload: error.message,
            })
        }
    }
};

export const addItemToCart = (id, name, image, description, price,authToken) => {
    return async (dispatch) => {
        try {
            const response = await addToTheCart(id, name, image, description, price,authToken);
            dispatch({
                type: "ADDITION_SUCCESSFULL",
                payload: response,
            });
        } catch (error) {
            dispatch({
                type: "ADDITION_FAILED",
                payload: error.message
            });
        }
    }
}

export const fetchCartItems = (authToken) => {
    return async (dispatch) => {
        try {
            const response = await fetchAllItems(authToken);
            dispatch({
                type:"Fetch_Successfull",
                payload:response,
            })
        } catch (error) {
            dispatch({
                type:"Fetch_Unsuccessfull",
                payload:error.message,
            })
        }
    }
}

export const removeItemFromCart = (id,authToken) => {
    return async (dispatch) => {
        try {
            const response = await removeFromCart(id,authToken);
            dispatch({
                type: "REMOVE_SUCCESSFULL",
                payload: response,
            })
        } catch (error) {
            dispatch({
                type: "REMOVE_UNSUCCESSFULL",
                payload: error.message,
            })
        }
    }
}