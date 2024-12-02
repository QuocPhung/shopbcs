<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <div id="app">
    <!--Header-->
    <!-- <div class="grid">
        <nav class="header_nav navbar navbar-expand-lg navbar-light">
            
            <button class="navbar-toggler" style="background-color: #EFF0F3;" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav" style="justify-content: center;">
                
                <ul class="navbar-nav ml-auto">
                    <li><a class="navbar-brand" href="/"><img src="./assets/pic/logo.png" alt="Logo" width="50"></a></li>
                    <li class="nav-item"><a class="nav-link" href="/"><i class="fa fa-home"></i> HOME</a></li>
                    <li class="nav-item"><a class="nav-link" href="/trang-bando"><i class="fa fa-shopping-bag"></i> SHOP</a></li>
                    <li class="nav-item"><a class="nav-link" href="/forums"><i class="fa fa-newspaper-o"></i> FORUMS</a></li>

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
                    <li class="nav-item"><a class="nav-link" href="/"><i class="fa fa-gamepad"></i> GAME HOT</a></li>
                    <li class="nav-item"><a class="nav-link" href="/blog"><i class="fa fa-weixin"></i> BLOG</a></li>
                    
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item"><a class="nav-link" href="/gio-hang"><i class="fa fa-shopping-cart"></i> GIỎ HÀNG ({{ cart.length }})</a></li>
                        <li class="nav-item" v-if="!isLoggedIn">
                            <a style="background-color: #4CAF50; margin-bottom: 10px;" class="nav-link btn text-white" href="/dang-nhap">Đăng Nhập</a>
                            <a style="background-color: #4CAF50; margin-left: 10px;" class="nav-link btn text-white" href="/dang-ky">Đăng Ký</a>
                        </li>
                    <li class="nav-item dropdown" v-else>
                        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{ userInfo.username }}
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                            <a class="dropdown-item" href="#" @click="logout">Đăng Xuất</a>
                        </div>
                    </li>
                    </ul>
                </ul>
            </div>
        </nav>
    </div> -->
    <header-page/>

    <!--Body-->
    <div style="background-color: #EFF0F3;">
        <router-view></router-view>
    </div>
    

    <!--Footer-->
    <!-- <div class="footer">
            <div class="lh container">
                <div class="col-sm-3">
                    <p>Địa chỉ: Tây Mỗ, Nam Từ Liêm, Hà Nội</p>
                    <p>SĐT: 0678910JQK</p>
                    <p>Email: shoppcgaming@gmail.com</p>
                </div>
                <div class="col-sm-3">
                    <ul>
                        <h5>CHÍNH SÁCH</h5>
                        <li><a href="/">Trang chủ</a></li>
                        <li><a href="#">Giới thiệu</a></li>
                        <li><a href="/trang-bando">Sản phẩm</a></li>
                        <li><a href="#">Liên hệ</a></li>
                        <li><a href="#">Kiểm tra</a></li>
                    </ul>
                </div>
                <div class="col-sm-3">
                    <ul>
                        <h5>HỖ TRỢ KHÁCH HÀNG</h5>
                        <li><a href="#">Tìm kiếm</a></li>
                        <li><a href="#">Chính sách bảo mật</a></li>
                        <li><a href="#">Điều khoản dịch vụ</a></li>
                        <li><a href="#">Hưỡng dẫn kiểm tra đơn hàng</a></li>
                    </ul>
                </div>
                <div class="col-sm-3">
                    <ul>
                        <h5>LIÊN HỆ VỚI CHÚNG TÔI</h5>
                        <li><a href=""><i class="fa fa-instagram" style="font-size: 48px;"></i></a>
                            <a href="https://www.facebook.com/Cter.HuyPhan.731.110?locale=vi_VN"><i class="fa fa-facebook" style="font-size:48px;margin-left: 10px;"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="bq">© Bản quyền thuộc về Quốc Huy</div>
    </div> -->
    <footer-page/>
    
  </div>

</template>
<script>
import HeaderPage from './components/pages/HeaderPage.vue';
import FooterPage from './components/pages/FooterPage.vue';
export default{
    name: 'App',
    components: {
        HeaderPage,
        FooterPage
    },
    data() {
        return {
            
        }
    },
    
    computed: {
        
    },
    methods: {
        
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
</style>