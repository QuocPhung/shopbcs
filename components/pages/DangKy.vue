<template>
    <div class="container ts">
        <div class="formdk">
            <h1 class="text-center">ĐĂNG KÝ TÀI KHOẢN</h1>
            <p class="text-center">Bạn đã có tài khoản ? Đăng nhập <a href="/dang-nhap" style="font-weight: bold;">tại đây</a></p>
            <h2 class="text-center">THÔNG TIN CÁ NHÂN</h2>
            <div>
                <!-- username -->
                <label for="">Tài khoản *</label>
                <input type="text" class="form-control" v-model="form.username" name="username" id="username" :class="{ 'is-invalid': errors.username }" required placeholder="Tài khoản">
                <div v-if="errors.username" style="color: red;">
                    {{ errors.username }}
                </div>
                
                <!-- Firstname -->

                <!-- <label for="">Họ *</label>
                <input type="text" class="form-control" v-model="form.lastName" placeholder="Họ" :class="{ 'is-invalid': errors.lastName }" required>
                <div v-if="errors.lastName" style="color: red;">
                    {{ errors.lastName }}
                </div> -->

                <!-- Lastname -->

                <!-- <label for="">Tên *</label>
                <input type="text" class="form-control" v-model="form.firstName" placeholder="Tên" :class="{ 'is-invalid': errors.firstName }" required>
                <div v-if="errors.firstName" style="color: red;">
                    {{ errors.firstName }}
                </div> -->

                <!-- Phone -->

                <!-- <label for="">Số điện thoại *</label>
                <input type="text" class="form-control" v-model="form.phoneNumber" placeholder="Số điện thoại" :class="{ 'is-invalid': errors.phoneNumber }" required>
                <div v-if="errors.phoneNumber" style="color: red;">
                    {{ errors.phoneNumber }}
                </div> -->

                <!-- Email -->
                <label for="">Email *</label>
                <input type="text" class="form-control" v-model="form.email" placeholder="Email" :class="{ 'is-invalid': errors.email }" required>
                <div v-if="errors.email" style="color: red;">
                    {{ errors.email }}
                </div>
                <!-- Password -->
                <div class="password-wrapper">
                    <label for="">Mật khẩu *</label>
                    <input :type="isPasswordVisible ? 'text' : 'password'" class="form-control" v-model="form.password" placeholder="Mật khẩu" :class="{ 'is-invalid': errors.password }" required>
                    <span @click="togglePasswordVisibility" class="eye-icon">
                        <i :class="isPasswordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
                    </span>
                </div>
                <div v-if="errors.password" style="color: red;">
                    {{ errors.password }}
                </div>
                
            </div>
            <button class="btn mt-3" @click="registerUser" @keyup.enter="registerUser">Đăng ký</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default{
    data(){
        return{
            username:'',
            // lastName:'',
            // firstName:'',
            // phoneNumber:'',
            email:'',
            password:'',
            isPasswordVisible: false,
            // element validate
            errors:{
                username:'',
                // lastName:'',
                // firstName:'',
                // phoneNumber:'',
                email:'',
                password:'',
            },
            form:{
                username:'',
                // lastName:'',
                // firstName:'',
                // phoneNumber:'',
                email:'',
                password:'',
            }
        }
    },
    methods:{
        // Con mắt ẩn hiện password
        togglePasswordVisibility() {
            this.isPasswordVisible = !this.isPasswordVisible; // Đổi trạng thái hiển thị mật khẩu
        },
        // SignUP
        async registerUser() {
            const formData = {
                username: this.form.username,
                password: this.form.password,
                email: this.form.email,
            };

            try {
                if (this.validateRegister()) {
                    const response = await axios.post('http://42.116.34.181/test/signup.php', formData);
                    if (response.data.status === 'success') {
                        Swal.fire({
                            position: "between",
                            icon: "success",
                            title: "Đăng ký thành công",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.$router.push('/dang-nhap'); // Điều hướng đến trang đăng nhập
                    } else {
                        Swal.fire({
                            position: "between",
                            icon: "error",
                            title: `${response.data.message}`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                }
            } catch (error) {
                console.error('Lỗi gọi API:', error);
                alert('Đã xảy ra lỗi, vui lòng thử lại sau.');
            }
        },
        validateRegister(){
            
            // Reset lỗi
            this.errors = {
                username:'',
                // lastName: '',
                // firstName: '',
                // phoneNumber: '',
                email: '',
                password: ''
            };
            // Validate từng trường
            if (!this.form.username){
                this.errors.username = "Tên đăng nhập không được để trống!";
            } else if (this.form.username.length <5){
                this.errors.username = "Tên đăng nhập quá ngắn cần ít nhất 5 kí tự!";
            } else if (this.form.username.length >16){
                this.errors.username = "Tên đăng nhập quá dài tối đa 16 kí tự!";
            }
            // if (!this.form.lastName){
            //     this.errors.lastName = "Họ không được để trống!";
            // }
            // if (!this.form.firstName){
            //     this.errors.firstName = "Tên không được để trống!";
            // }
            // if (!this.form.phoneNumber) {
            //     this.errors.phoneNumber = "Số điện thoại không được để trống!";
            // } 
            // else if (!/^(0[1-9]{1}[0-9]{8,9})$/.test(this.form.phoneNumber)) {
            //     this.errors.phoneNumber = "Số điện thoại không hợp lệ!";
            // } 
            // else if (this.form.phoneNumber.length < 10 || this.form.phoneNumber.length > 11) {
            //     this.errors.phoneNumber = "Số điện thoại phải có từ 10 đến 11 chữ số!";
            // } 
            if (!this.form.email){
                this.errors.email = "Email không được để trống!";
            } 
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)){
                this.errors.email = "Email không hợp lệ!";
            } 
            if (!this.form.password){
                this.errors.password = "Mật khẩu không được để trống!";
            } 
            else if (this.form.password.length < 6){
                this.errors.password = "Mật khẩu phải có ít nhất 6 ký tự!";
            } 
            else if (this.form.password.length >16){
                this.errors.password = "Mật khẩu quá dài tối đa 16 kí tự!"
            }
            
            
            // Kiểm tra nếu không có lỗi
            return Object.values(this.errors).every((error) => error === '');
        },
        goToProducts() {
            this.$emit('changePage', 'DangNhap');
        },        
    }
}
</script>
<style>
.ts{
    display: flex;
   justify-content: center;
    align-items: center; 
}
.formdk{
    justify-content: center;
    align-items: center;
    width: 500px;
    max-width: 500px;
    min-width: 400px;
    margin-top: 20px;
    border: 1px solid black;
    border-radius: 10px;
    padding: 20px;
}
.formdk button{
    background-color: rgb(50, 205, 108);
    color: #fff;
    width: 100%;
}
.formdk button:hover{
    color: black;
}
.is-invalid {
  border-color: red;
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