const sessionUser = sessionStorage.getItem('user')
console.log(sessionUser)
const user = sessionUser?JSON.parse(sessionUser): {
    name: '',
    logon: false,
}

export {user}