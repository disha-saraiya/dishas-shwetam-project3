export default function AuthReducer(state = {isUserLoggedIn: false, user:null}, action){
    if(action.type === 'USER_LOGIN_SUCCESS'){
        console.log("Reached user login reducer"); 
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