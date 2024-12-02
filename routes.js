import { createWebHistory, createRouter} from "vue-router";
import TrangChu from "./components/pages/TrangChu.vue";
import DangKy from "./components/pages/DangKy.vue";
import DangNhap from "./components/pages/DangNhap.vue";
import GioHang from "./components/pages/GioHang.vue";
import TrangBlog from "./components/pages/TrangBlog.vue";
import TrangForums from "./components/pages/TrangForums.vue";
import TrangBando from "./components/pages/TrangBando.vue";
import NguoiDung from "./Users/NguoiDung.vue";
import addProducts from "./QuanTri/addProducts.vue";
import addUser from "./QuanTri/addUser.vue";
import addBanner from "./QuanTri/addBanner.vue";

const routes = [
    {
        name: 'TrangChu',
        component: TrangChu,
        path: '/'
    },
    {
        name: 'DangKy',
        component: DangKy,
        path: '/dang-ky'
    },
    {
        name: 'DangNhap',
        component: DangNhap,
        path: '/dang-nhap'
    },
    {
        name: 'GioHang',
        component: GioHang,
        path: '/cart'
    },
    {
        name: 'TrangBlog',
        component: TrangBlog,
        path: '/blog'
    },
    {
        name: 'TrangForums',
        component: TrangForums,
        path: '/forums'
    },
    {
        name: 'TrangBando',
        component: TrangBando,
        path: '/Trang-Bando'
    },
    {
        name: 'Products',
        component: addProducts,
        path: '/admin-products'
    },
    {
        name: 'NguoiDung',
        component: NguoiDung,
        path: '/user'
    },
    {
        name: 'Banner',
        component: addBanner,
        path: '/admin-banner'
    },
    {
        name: 'User',
        component: addUser,
        path: '/admin-user'
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;