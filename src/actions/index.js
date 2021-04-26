export const userLogin = (user) => {
    console.log("User login action"); 
    return{
        type: 'USER_LOGIN_SUCCESS', 
        data: user       
    }
}

export const userLoginError = (user) => {
    return{
        type: 'USER_LOGIN_ERROR', 
        data:user       
    }
}

export const userLogout = (user) => {
    return{
        type: 'USER_LOGOUT_SUCCESS',
        data:user    
    }
}




