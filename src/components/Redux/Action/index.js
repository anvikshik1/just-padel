export const loginUser = (token, role, id, username) => {
    return {
        type: "LOGIN",
        payload: {
            refreshToken: token,
            userRole: role,
            userId: id,
            userName: username,
        }
    }
}