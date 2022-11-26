
export const saveLoggedUser = (user) => {
    sessionStorage.setItem("loggedUser", JSON.stringify(user));
}


export const getLoggedUser = () => {

    if (sessionStorage.getItem("loggedUser"))
        return JSON.parse(sessionStorage.getItem("loggedUser"));
    else return null;

}

export const logOutUSer = () => {
    sessionStorage.clear();
}