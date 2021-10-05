export const loginUser = (email, password) => {
    return {
        type: "LOGIN",
        payload: {
            email: email,
            password: password
        }
    }
}