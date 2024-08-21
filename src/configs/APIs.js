import axios from "axios"
// import cookie from "react-cookies"

const BASE_URL = 'http://26.83.215.211:8080/ounetworksv/api/'

export const endpoints = {
    'login': '/v1/public/auth/login',
    'register': '/v1/public/auth/register',
    'posts': '/v1/private/posts/get',
}

// export const authAPIs = () => {
//     return axios.create({
//         baseURL: BASE_URL,
//         headers: {
//             'Authorization': cookie.load("access-token")
//         }
//     })
// }

export default axios.create({
    baseURL: BASE_URL
});