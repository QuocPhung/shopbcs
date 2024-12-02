<template>
    <div class="grid">
        <nav class="header_nav navbar navbar-expand-lg navbar-light">
            <!-- Logo & Toggler -->
            
            <button class="navbar-toggler" style="background-color: #EFF0F3;" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Navbar Menu -->
            <div class="collapse navbar-collapse" id="navbarNav" style="justify-content: center;">
                
                <ul class="navbar-nav ml-auto">
                    <li><a class="navbar-brand" href="/"><img v-for="(image,index) in images" :key="index" :src="image" :alt="image+index" width="50"></a></li>
                    <li class="nav-item"><a class="nav-link" href="/"><i class="fa fa-home"></i> HOME</a></li>
                    <li class="nav-item"><a class="nav-link" href="/trang-bando"><i class="fa fa-shopping-bag"></i> SHOP</a></li>
                    <li class="nav-item"><a class="nav-link" href="/forums"><i class="fa fa-newspaper-o"></i> FORUMS</a></li>
                    <!-- Dropdown Menu -->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="dropdownMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa fa-windows"></i> LINH KIỆN
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu">
                            <li><a class="dropdown-item" href="/">CPU</a></li>
                            <li><a class="dropdown-item" href="/">RAM</a></li>
                            <li><a class="dropdown-item" href="/">Ổ CỨNG</a></li>
                            <li><a class="dropdown-item" href="/">VGA</a></li>
                        </ul>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="/"><i class="fa fa-desktop"></i> Build PC</a></li>
                    <li class="nav-item"><a class="nav-link" href="/blog"><i class="fa fa-weixin"></i> BLOG</a></li>
                    
                    <!-- User Info -->
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item"><a class="nav-link" href="/cart"><i class="fa fa-shopping-cart"></i> GIỎ HÀNG ({{ cart.length }})</a></li>
                        <li class="nav-item" v-if="!isLoggedIn">
                            <a style="background-color: #4CAF50; margin-bottom: 10px;" class="nav-link btn text-white" href="/dang-nhap">Đăng Nhập</a>
                            <a style="background-color: #4CAF50; margin-left: 10px;" class="nav-link btn text-white" href="/dang-ky">Đăng Ký</a>
                        </li>
                    <li class="nav-item dropdown" v-else>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                            <a class="dropdown-item" href="#" @click="logout">Đăng Xuất</a>
                        </div>
                            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{ userInfo.username }}
                            </a>
                    </li>
                    <li class="nav-item dropdown"  v-if="userInfo && (userInfo.role === 'admin' || userInfo.role === 'manager')"
                    >
                        <a class="nav-link dropdown-toggle" href="#" id="dropdownMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Thêm dữ liệu
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu">
                            <li><a class="dropdown-item" href="/admin-products">Quản lý sản phẩm</a></li>
                            <li v-if="userInfo && userInfo.role === 'admin'"><a class="dropdown-item" href="/admin-user">Quản lý users</a></li>
                            <li><a class="dropdown-item" href="/admin-banner">Quản lý banner</a></li>
                        </ul>
                    </li>
                    </ul>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script>
export default {
    data() {
        return {
            images:[
                require('@/assets/pic/logo.png')
            ],
            isLoggedIn: false, // Kiểm tra trạng thái đăng nhập
            userInfo: null, // Thông tin người dùng đã đăng nhập
            cart: [],
        }
    },
    created() {
        // Kiểm tra trạng thái đăng nhập từ localStorage
        const userLogin = JSON.parse(localStorage.getItem("userLogin"));
        if (userLogin) {
            this.isLoggedIn = true;  // Đặt trạng thái đã đăng nhập
            this.userInfo = userLogin;  // Lưu thông tin người dùng
        }
    },
    computed: {
        user() {
            return this.$store.getters.user; // Lấy thông tin người dùng từ Vuex
        },
        isAuthenticated() {
            return this.$store.getters.isAuthenticated; // Kiểm tra xem người dùng đã đăng nhập hay chưa
        }
    },
    methods: {
        logout() {
        // Xóa trạng thái đăng nhập
            localStorage.removeItem("userLogin");
            this.isLoggedIn = false;
            this.userInfo = null;
            this.goTo();
        },
        reloadPage() {
            window.location.reload();
        },
        goTo() {
            this.$router.push('/');
        }, 
    }
}
</script>
<style>
/* Reset cơ bản */
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

/* Lớp chính bao quanh */
.grid {
    width: 100%;
    max-width: 100%;
    min-width: 200px;
    margin: 0 auto;
}

/* Header Navbar */
.header_nav {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center;
    background-color: #1072BA;
    color: #fff;
    padding: 0 15px;
}

.navbar-nav {
    list-style-type: none;
    padding-left: 0;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap; /* Đảm bảo đẹp trên màn hình nhỏ */
}

.nav-item {
    margin: 0 8px;
    position: relative;
    line-height: 60px;
}

/* Liên kết */
.nav-item a {
    color: #fff;
    font-size: 1.1rem;
    text-decoration: none;
    font-weight: 400;
    transition: color 0.2s ease-in-out;
}

.nav-item :hover {
    border-radius: 10px;
    background-color: #EFF0F3;
}

.nav-item a:hover {
    color: #333;
}

/* Logo */
.grid img {
    width: 40px;
    height: auto;
}

li.nav-item a {
    display: inline;
    justify-content: flex-end;
    border-radius: 10px;
    color: #fff;
}

/* Button */
.nav-item button {
    background-color: rgb(50, 205, 108);
    line-height: 20px;
    padding: 5px;
    border: 1px solid rgb(50, 205, 108);
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.nav-item button:hover,
.product-item img:hover {
    transform: translateY(-2px);
    box-shadow: 0px 2px 5px black;
    background-color: rgb(50, 205, 108);
}

/* Submenu */
.nav-item.dropdown .dropdown-menu {
    display: none;
    position: absolute;
    background-color: #EFF0F3;
    border: 1px solid black;
    top: 80%;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
    z-index: 1;
    padding: 5px 0;
}

.nav-item:hover .dropdown-menu {
    display: block;
}

.nav-item .dropdown-menu a {
    color: black;
    padding: 5px 15px;
    display: block;
    transition: color 0.2s ease-in-out;
}

.nav-item .dropdown-menu a:hover {
    color: #1072BA;
    background-color: rgba(0, 0, 0, 0.05);
}
/* Responsive */
@media (max-width: 768px) {
    /* Navbar */
    .header_nav {
        flex-wrap: wrap;
        padding: 10px;
    }

    .navbar-nav {
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
    }

    .nav-item {
        width: 100%;
        margin: 5px 0;
        line-height: normal;
        text-align: left;
    }

    .nav-item a {
        padding: 10px;
        display: block;
        font-size: 1rem;
    }

    /* Submenu */
    .nav-item.dropdown .dropdown-menu {
        position: static;
        box-shadow: none;
        border: none;
    }

    .nav-item .dropdown-menu li {
        width: 100%;
    }

    /* Footer */
    .lh {
        flex-direction: column;
        text-align: center;
    }
}
</style>