<template>
    <div class="footer">
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
                        <li><a href="https://www.instagram.com/nguyen_dat24/"><i class="fa fa-instagram" style="font-size: 48px;"></i></a>
                            <a href="https://www.facebook.com/Cter.HuyPhan.731.110?locale=vi_VN"><i class="fa fa-facebook" style="font-size:48px;margin-left: 10px;"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="bq">© Bản quyền thuộc về Quốc Huy</div>
    </div> 
</template>
<script>
export default{
    name: 'FooterPage',
    data() {
        return {

        }
    }
}
</script>
<style>
/* Footer */
.footer {
    background-color: #1072BB;
    color: #fff;
    padding-top: 15px;
    margin-top: 10px;
    text-align: center;
}

/* Liên hệ */
.lh {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 10px;
}

.lh ul {
    list-style-type: none;
    padding: 0;
}

.lh li a {
    color: #fff;
    text-decoration: none;
}

.bq {
    background-color: #222222;
    color: #fff;
    text-align: center;
    padding: 10px;
}

</style>