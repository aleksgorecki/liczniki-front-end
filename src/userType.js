export const userType = Object.freeze({
    client: Symbol("client"),
    employee: Symbol("employee"),
    none: Symbol("none")
})

export const getCurrentUser = () => {
    localStorage.getItem('user')
}

export const setCurrentUser = (user) => {
    localStorage.setItem('user', user)
}