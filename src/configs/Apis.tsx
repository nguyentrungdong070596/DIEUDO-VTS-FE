import axios from "axios";
import { Cookies } from "react-cookie";

const SERVER_CONTEXT = "";
export const SERVER = "http://localhost:3966/api/v1";

// Định nghĩa các endpoint với SERVER_CONTEXT
export const endpoints = {
    // Home
    APICarousel: `${SERVER_CONTEXT}/home/carousel`,
    APIIntroduction: `${SERVER_CONTEXT}/home/introduction`,
    APIDichvu: `${SERVER_CONTEXT}/home/servicelist`,
    APINews: `${SERVER_CONTEXT}/home/news`,

    // Navigator
    APIHoaTieu: `${SERVER_CONTEXT}/hoatieu`,

    // Kế hoạch dẫn tàu sơ cua
    APIKehoachdantau: `${SERVER_CONTEXT}/kehoachdantau`,
    APISwitch: `${SERVER_CONTEXT}/switch`,

    // Maneuvering Draft
    APIManeuveringDraft: `${SERVER_CONTEXT}/maneuvering-draft`,

    // Service Price
    APIServicePrice: `${SERVER_CONTEXT}/product-price`,

    // Ship
    APIShip: `${SERVER_CONTEXT}/ship`,

    // Stream
    APIStream: `${SERVER_CONTEXT}/stream`,

    // Tide Calendar
    APITide: `${SERVER_CONTEXT}/tide-calendar`,

    // Items
    APIItems: `${SERVER_CONTEXT}/items`,

    // Authentication & Users
    APILogin: `${SERVER_CONTEXT}/login`,
    APICurrentUser: `${SERVER_CONTEXT}/current-user`,
    APIRegister: `${SERVER_CONTEXT}/users`,

    // Posts & Comments
    APIDetails: (idPost: number) => `${SERVER_CONTEXT}/posts/${idPost}/`,
    APIComments: (idPost: number) => `${SERVER_CONTEXT}/posts/${idPost}/comments/`,
    APIAddComment: `${SERVER_CONTEXT}/comments/`,
};


// Lấy token từ cookies
const cookies = new Cookies();
const token = cookies.get("token");

// Tạo axios instance có sẵn Authorization nếu có token
export const authApi = axios.create({
    baseURL: SERVER,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
});

// Axios mặc định không có token
const api = axios.create({
    baseURL: SERVER,
});

export default api;
