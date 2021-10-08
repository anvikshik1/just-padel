const initial = {
    loggedUserDetails: [],
    logged: false
}

const LoginReducers = (log = initial, action) => {
    switch (action.type) {
        case "LOGIN":
            const { refreshToken, userRole, userId, userName } = action.payload;
            return {
                ...log,
                loggedUserDetails: [
                    ...log.loggedUserDetails,
                    {
                        userId: userId,
                        username: userName,
                        token: refreshToken,
                        role: userRole
                    }
                ],
                logged:true
            }
        default:
            return log;
    }

}

export default LoginReducers;