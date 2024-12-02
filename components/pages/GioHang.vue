<template>
  <div class="cart-container">
    <h2 style="text-align: center;">Giỏ Hàng</h2>

    <!-- Kiểm tra nếu giỏ hàng trống -->
    <div v-if="cart.length === 0">
      <p>Giỏ hàng của bạn trống.</p>
    </div>

    <!-- Hiển thị giỏ hàng nếu có sản phẩm -->
    <div v-else>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Giá</th>
            <th>Thành tiền</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cart" :key="item.product_id">
            <td><img :src="item.image" alt="product image" class="product-image"></td>
            <td>{{ item.name }}</td>
            <td>
              <input type="number" v-model.number="item.quantity" min="1" class="form-control" @input="updateTotal()">
            </td>
            <!-- Kiểm tra xem giá có hợp lệ hay không -->
            <td>{{ item.price ? item.price.toLocaleString() : 'Liên hệ' }} VND</td>
            <!-- Kiểm tra nếu giá và số lượng hợp lệ -->
            <td>{{ (item.quantity && item.price) ? (item.quantity * item.price).toLocaleString() : '0' }} VND</td>
            <td>
              <button @click="removeItem(index)" class="btn btn-danger">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Hiển thị tổng cộng và nút thanh toán -->
      <div class="d-flex justify-content-between">
        <h4>Tổng cộng: {{ totalAmount.toLocaleString() }} VND</h4>
        <button @click="checkout" class="btn btn-primary">Thanh toán</button>
      </div>
    </div>

    <!-- Hiển thị thông báo nếu chưa đăng nhập -->
    <div v-if="!isAuthenticated" class="alert alert-warning mt-3">
      Vui lòng đăng nhập để thanh toán.
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cart: [],      // Giỏ hàng
      totalAmount: 0 // Tổng số tiền
    };
  },
  computed: {
    // Kiểm tra nếu người dùng đã đăng nhập (qua localStorage hoặc Vuex)
    isAuthenticated() {
      const userId = localStorage.getItem('user_id');
      console.log('Kiểm tra user_id: ', userId);  // Log để kiểm tra user_id
      return !!userId;  // Kiểm tra trạng thái đăng nhập trong localStorage
    }
  },
  created() {
    this.loadCart();
  },
  methods: {
    // Lấy giỏ hàng từ localStorage hoặc cơ sở dữ liệu
    loadCart() {
        const userId = localStorage.getItem('user_id');
        if (userId) {
            this.fetchCartFromDatabase(userId);
        } else {
            this.cart = JSON.parse(localStorage.getItem('cart')) || [];
            this.updateTotal();
        }
    },

    fetchCartFromDatabase(userId) {
        axios.get(`http://42.116.34.181/test/cart.php?user_id=${userId}`)
            .then(response => {
                if (response.data.status === 'success') {
                    this.cart = response.data.cart;
                    this.updateTotal();
                }
            })
            .catch(error => {
                console.error('Lỗi khi lấy giỏ hàng từ server: ', error);
            });
    },

    updateTotal() {
        this.totalAmount = this.cart.reduce((total, item) => {
            const itemPrice = item.price || 0;
            return total + (item.quantity * itemPrice);
        }, 0);
        // Nếu người dùng chưa đăng nhập, lưu giỏ hàng vào localStorage
        if (!this.isAuthenticated) {
            localStorage.setItem('cart', JSON.stringify(this.cart));
        }
    },

    // Thêm sản phẩm vào giỏ hàng
    addToCart(product) {
      console.log('Sản phẩm được thêm vào giỏ hàng: ', product); // Log sản phẩm thêm vào giỏ hàng
      const existingProduct = this.cart.find(item => item.product_id === product.product_id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
      this.updateTotal();
    },

    // Xóa sản phẩm khỏi giỏ hàng
    removeItem(index) {
      console.log('Sản phẩm bị xóa khỏi giỏ hàng: ', this.cart[index]); // Log sản phẩm bị xóa
      this.cart.splice(index, 1);
      this.updateTotal();
    },

    // Thanh toán giỏ hàng
    async checkout() {
      const userId = localStorage.getItem('user_id');
      console.log('user_id khi thanh toán: ', userId); // Log user_id
      if (userId) {
        try {
          console.log('Giỏ hàng gửi lên server: ', this.cart); // Log giỏ hàng gửi lên server
          // Lưu giỏ hàng vào cơ sở dữ liệu khi người dùng đã đăng nhập
          const response = await axios.post('http://42.116.34.181/test/cart.php', {
            user_id: userId,
            cart: this.cart
          });
          console.log('Phản hồi từ server khi thanh toán: ', response.data); // Log phản hồi từ server
          if (response.data.status === 'success') {
            alert('Giỏ hàng đã được lưu vào cơ sở dữ liệu!');
          } else {
            alert('Có lỗi xảy ra khi lưu giỏ hàng.');
          }
        } catch (error) {
          console.error('Lỗi khi lưu giỏ hàng: ', error);
        }
      } else {
        alert('Vui lòng đăng nhập để thanh toán!');
      }
    }
  }
};
</script>

<style scoped>
.cart-container {
  margin-top: 50px;
}
.product-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
</style>
