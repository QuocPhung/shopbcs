<template>
    <div class="container ts">
        <!-- Giao diện khi đã đăng nhập -->
        <div v-if="isLoggedIn" class="user-info">
            <h1>Xin chào, {{ userInfo.username }}</h1>
            
            <!-- Nếu là admin, hiển thị thêm phần quản lý -->
            <div v-if="userInfo.role === 'admin'">
                <button class="btn mt-3" @click="goToAdminDashboard">Quản lý sản phẩm</button>
            </div>
            
            <!-- Nếu là user, hiển thị phần trang cá nhân -->
            <div v-else>
                <button class="btn mt-3" @click="goToUserDashboard">Trang Cá Nhân</button>
            </div>

            <button style="background-color: rgb(50, 205, 108);" class="btn mt-3 logout" @click="logout">Đăng xuất</button>
        </div>
        
        <!-- Giao diện khi chưa đăng nhập -->
        <div v-else>
            <div class="formdn">
                <h1>Đăng nhập</h1>
                <label for="">Tài khoản</label>
                <input
                    type="text"
                    class="form-control"
                    v-model="form.username"
                    placeholder="Tài khoản"
                    required
                />
                <div v-if="errors.username" style="color: red;">
                    {{ errors.username }}
                </div>

                <div class="password-wrapper">
                    <label for="">Mật khẩu *</label>
                    <input
                        :type="isPasswordVisible ? 'text' : 'password'"
                        class="form-control"
                        v-model="form.password"
                        placeholder="Mật khẩu"
                        :class="{ 'is-invalid': errors.password }"
                        required
                    />
                    <span @click="togglePasswordVisibility" class="eye-icon">
                        <i :class="isPasswordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
                    </span>
                </div>

                <div v-if="errors.password" style="color: red;">
                    {{ errors.password }}
                </div>

                <div class="row">
                    <button class="btn mt-3" @click="login" v-on:keyup.enter="submit">Đăng nhập</button>
                    <button class="btn mt-3" @click="goTo">Đăng ký</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            isLoggedIn: false, // Kiểm tra trạng thái đăng nhập
            userInfo: null, // Thông tin người dùng đã đăng nhập
            username: '',
            password: '',
            isPasswordVisible: false,
            msgError: '',
            form: {
                username: '',
                password: '',
            },
            errors: {
                username: '',
                password: '',
            }
        };
    },
    created() {
        const userLogin = JSON.parse(localStorage.getItem("userLogin"));
        if (userLogin) {
            this.isLoggedIn = true;
            this.userInfo = userLogin; // Lưu thông tin người dùng
            // Lấy user_id từ localStorage khi người dùng đã đăng nhập
            this.loadCart();
        }
    },

    methods: {
        async login() {
            if (!this.validateLogin()) {
                console.error('Dữ liệu không hợp lệ');
                return;
            }

            const formData = {
                username: this.form.username,
                password: this.form.password,
            };

            try {
                // Gửi yêu cầu đăng nhập đến API PHP
                const response = await axios.post('http://42.116.34.181/test/signin.php', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const result = response.data;
                console.log(result);  // Kiểm tra phản hồi từ API

                if (result.status === 'success') {
                    // Kiểm tra lại dữ liệu trả về có đúng không
                    console.log(result.user);  // Kiểm tra thông tin người dùng
                    if (result.user && result.user.username) {
                        // Lưu thông tin đăng nhập vào localStorage
                        localStorage.setItem('userLogin', JSON.stringify(result.user));

                        // Lưu user_id vào localStorage
                        const userId = result.user.id;
                        localStorage.setItem('user_id', userId); // Lưu user_id vào localStorage

                        // Gán user_id cho tất cả sản phẩm trong giỏ hàng
                        const cart = JSON.parse(localStorage.getItem('cart')) || [];
                        cart.forEach(item => {
                            item.user_id = userId; // Gán user_id cho mỗi sản phẩm trong giỏ hàng
                        });
                        localStorage.setItem('cart', JSON.stringify(cart)); // Cập nhật lại giỏ hàng

                        // Cập nhật trạng thái đã đăng nhập
                        this.isLoggedIn = true;
                        this.userInfo = result.user;

                        // Hiển thị thông báo thành công
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: `${result.message}`,
                            showConfirmButton: false,
                            timer: 1500
                        });

                        // Lấy giỏ hàng của người dùng nếu có
                        this.loadCart();

                        // Điều hướng người dùng sau khi đăng nhập thành công
                        if (result.user.role === 'admin') {
                            this.$router.push('/').then(() => {
                                window.location.reload();
                            })
                        } else {
                            this.$router.push('/').then(() => {
                                window.location.reload();
                            })
                        }
                    } else {
                        console.error('Thông tin người dùng không hợp lệ');
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Thông tin người dùng không hợp lệ',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                } else {
                    // Hiển thị thông báo lỗi nếu đăng nhập không thành công
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: `${result.message}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } catch (error) {
                console.error('Lỗi gọi API:', error);
                alert('Đã xảy ra lỗi, vui lòng thử lại sau.');
            }
        },



        loadCart() {
            const userId = localStorage.getItem('user_id'); // Lấy user_id từ localStorage
            console.log('Kiểm tra user_id khi loadCart: ', userId); // Kiểm tra giá trị user_id

            if (userId) {
                // Nếu người dùng đã đăng nhập, lấy giỏ hàng từ cơ sở dữ liệu
                this.fetchCartFromDatabase(userId);
            } else {
                // Nếu chưa đăng nhập, lấy giỏ hàng từ localStorage
                this.cart = JSON.parse(localStorage.getItem('cart')) || [];
                console.log('Giỏ hàng từ localStorage: ', this.cart); // Log giỏ hàng từ localStorage
                this.updateTotal();
            }
        },


        fetchCartFromDatabase(userId) {
            axios.get(`http://42.116.34.181/test/cart.php?user_id=${userId}`)
                .then(response => {
                    console.log('Phản hồi từ server: ', response.data);
                    if (response.data.status === 'success') {
                        this.cart = response.data.cart;
                        this.updateTotal();
                    } else {
                        console.log('Giỏ hàng trống hoặc có lỗi');
                    }
                })
                .catch(error => {
                    console.error('Lỗi khi lấy giỏ hàng từ server: ', error);
                });
        },
        updateTotal() {
            console.log('Giỏ hàng hiện tại: ', this.cart); // Log giỏ hàng trước khi tính toán
            this.totalAmount = this.cart.reduce((total, item) => {
                const itemPrice = item.price || 0;  // Đảm bảo giá trị mặc định nếu price không hợp lệ
                return total + (item.quantity * itemPrice);
            }, 0);

            console.log('Tổng số tiền sau khi tính toán: ', this.totalAmount); // Log tổng số tiền
            // Lưu giỏ hàng vào localStorage nếu người dùng chưa đăng nhập
            if (!this.isAuthenticated) {
                localStorage.setItem('cart', JSON.stringify(this.cart));
            }
        },

        logout() {
            // Xóa trạng thái đăng nhập
            localStorage.removeItem("userLogin");
            this.isLoggedIn = false;
            this.userInfo = null;
            this.$router.push('/');
        },

        togglePasswordVisibility() {
            this.isPasswordVisible = !this.isPasswordVisible;
        },

        validateLogin() {
            this.errors = {
                username: '',
                password: '',
            };

            let isValid = true;

            if (!this.form.username) {
                this.errors.username = "Tên đăng nhập không được để trống!";
                isValid = false;
            }

            if (!this.form.password) {
                this.errors.password = "Mật khẩu không được để trống!";
                isValid = false;
            }

            return isValid;
        },

        goToAdminDashboard() {
            this.$router.push('/admin');
        },

        goToUserDashboard() {
            this.$router.push('/user');
        },

        goTo() {
            this.$router.push('/dang-ky');
        },
    }
};
</script>

<style>
.ts{
    display: flex;
   justify-content: center;
    align-items: center; 
}
.formdn,.logout{
    
    width: 500px;
    max-width: 500px;
    margin-top: 20px;
    border: 1px solid black;
    border-radius: 10px;
    padding: 20px;
}
.formdn button,.logout{
    background-color: rgb(50, 205, 108);
    color: #fff;
    width: 100%;
}
.formdn button,.logout:hover{
    color: black;
}
.password-wrapper{
    position: relative;
}
.eye-icon {
  position: absolute;
  right: 10px;
  top: 70%;
  transform: translateY(-50%);
  cursor: pointer;
}
.eye-icon i {
  font-size: 18px;
}
</style>