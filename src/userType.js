export const userType = Object.freeze({
    client: "client",
    employee: "employee",
    none: "none"
})

export const getCurrentUser = () => {
    let user = localStorage.getItem('user')
    if (user != null) {
        return user
    }
    else {
        return userType.none
    }
}

export const setCurrentUser = (user) => {
    localStorage.setItem('user', user)
}