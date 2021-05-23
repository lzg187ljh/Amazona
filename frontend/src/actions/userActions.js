import Axios from "axios";
import { USER_REGISTER_FAIL, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../constants/userConstants"

export const register = (name, email, password) => async(dispatch) =>{
    dispatch({type:USER_SIGNIN_REQUEST,payload:{email,password}});
    try{
        // use post request, the 2nd parameter is data
        // data get data in res.send() form post method in userRouter
        const {data} = await Axios.post('/api/users/register',{name,email,password});
        dispatch({type:USER_REGISTER_SUCCESS, payload:data});
        // update redux store based on signin, because in APP.js, we use userSignin to authoricate user
        dispatch({type:USER_SIGNIN_SUCCESS, payload:data});
        localStorage.setItem("userInfo", JSON.stringify(data));
    }catch(error){
        dispatch({
            type:USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        });
    }
};

export const signin = (email, password) => async(dispatch) =>{
    dispatch({type:USER_SIGNIN_REQUEST,payload:{email,password}});
    try{
        // use post request, the 2nd parameter is data
        // data get data in res.send() form post method in userRouter
        const {data} = await Axios.post('/api/users/signin',{email,password});
        dispatch({type:USER_SIGNIN_SUCCESS, payload:data});
        localStorage.setItem("userInfo", JSON.stringify(data));
    }catch(error){
        dispatch({
            type:USER_SIGNIN_FAIL,
            payload:
                error.response && error.response.data.message 
                ? error.response.data.message
                : error.message,
        });
    }
};

export const signout = () => async(dispatch) =>{
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({type:USER_SIGNOUT});
}
