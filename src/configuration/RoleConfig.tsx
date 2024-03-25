const data = localStorage.getItem("user");
const user = data ? JSON.parse(data) : '';
export const getRole = () => {
    return user.role;
}
export const getUserId = () => {
    return user.id;
}