import axios from "axios";
import cookie from "react-cookies";
// import cookie from "react-cookies"

const BASE_URL = "http://localhost:8080/ounetworksv/api/";

export const endpoints = {
  login: "v1/public/auth/login",
  register: "/v1/public/auth/register",
  posts: "/v1/private/posts/get",
  posts_create: "/v1/private/posts/create",
  profile_public: "/v1/public/profile/get",
  profile_private: ""
};

export const apiCaller = (endpoint, options = {}) => {
  const token = cookie.load("access-token")
    ? cookie.load("access-token")
    : null;


    console.log(token)
  // Kiểm tra nếu endpoint có chứa "public" thì thêm Authorization header
  const headers = {
    "Content-Type": "application/json",
    ...(endpoint.includes("private") && token
      ? { Authorization: `Bearer ${token}` }
      : {}),
    ...options.headers,
  };



  // Tạo instance của Axios với cấu hình
  const apiInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Nếu bạn cần gửi cookie cùng request
    headers: headers,
    ...options, // Gộp các tùy chọn khác như params, timeout, etc.
  });

  // Trả về một đối tượng với các phương thức của axios (get, post, etc.)
  return {
    get: (params) => apiInstance.get(endpoint, { params }),
    post: (data) => apiInstance.post(endpoint, data),
    put: (data) => apiInstance.put(endpoint, data),
    delete: (params) => apiInstance.delete(endpoint, { params }),
  };
};
