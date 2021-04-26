export default function AuthReducer(state = {isUserLoggedIn: null, user:null}, action){
    if(action.type === 'USER_LOGIN_SUCCESS'){
        return{
           ...state, 
            isUserLoggedIn: true, 
            user: action.data
        }
    }else if(action.type === 'USER_LOGIN_ERROR' || action.type === 'USER_LOGOUT_SUCCESS'){
        return{
            ...state, 
            isUserLoggedIn: false, 
            user:action.data
        }
    }
    return state
}