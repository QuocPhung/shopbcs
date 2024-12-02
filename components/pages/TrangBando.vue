<template>
  <div>
    <h1>Danh sách sản phẩm</h1>
    <div v-if="message" :class="{'success': success, 'error': !success}">
      {{ message }}
    </div>

    <!-- Thêm select để chọn danh mục -->
    <div style="text-align: center;">
      <label for="category">Chọn danh mục:</label>
      <select id="category" v-model="selectedCategory" @change="filterProducts">
          <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
          </option>
      </select>
    </div>

    <div v-if="filteredProducts.length > 0" class="product-items">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card">
        <img :src="product.image" alt="Product Image" class="product-image" v-if="product.image" />
        <h3>{{ product.name }}</h3>
        <p><strong>Giá: </strong>{{ product.price }} VND</p>
        <button @click="addToCart">Thêm vào giỏ hàng</button>
        <button @click="showProductDetails(product)" style="margin-top: 10px; background-color: #FF5622; color: #fff;">Xem chi tiết</button>
      </div>
    </div>
    <div v-else>
      <p>Không có sản phẩm nào để hiển thị.</p>
    </div>

    <!-- Modal chi tiết sản phẩm -->
    <div v-if="selectedProduct" class="product-modal">
      <div class="modal-content">
        <h3>Thông tin sản phẩm</h3>
        <img :src="selectedProduct.image" alt="Product Image" />
        <h4>{{ selectedProduct.name }}</h4>
        <p><strong>Giá: </strong>{{ selectedProduct.price }} VND</p>
        <p><strong>Mô tả: </strong>{{ selectedProduct.description }}</p>
        <button class="btn" style="background-color: rgb(50, 205, 108); color: #fff;" @click="closeProductDetails">Đóng</button>
      </div>
    </div>
  </div>
</template>

  
<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedProduct: null,
      products: [], // Danh sách sản phẩm từ API
      filteredProducts: [], // Danh sách sản phẩm sau khi lọc
      categories: [], // Danh sách danh mục
      selectedCategory: 'all', // Danh mục được chọn, mặc định là "all"
      message: "",
      success: false,
    };
  },
  created() {
    this.getProducts(); // Gọi API khi component được tạo
  },
  methods: {
    async getProducts() {
        try {
            const response = await axios.get("http://42.116.34.181/test/products.php"); // Đảm bảo đường dẫn đúng
            if (response.data.status === "success") {
                this.products = response.data.data;
                this.filteredProducts = this.products; // Hiển thị tất cả sản phẩm ban đầu

                // Lấy danh mục từ phản hồi API
                this.categories = response.data.categories; // Cập nhật danh mục từ API
                this.categories.unshift({ id: 'all', name: 'Tất cả' }); // Thêm lựa chọn "Tất cả"
            } else {
                this.message = "Không có sản phẩm";
                this.success = false;
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            this.message = "Có lỗi khi lấy dữ liệu";
            this.success = false;
        }
    },
    addToCart(product) {
        const user = JSON.parse(localStorage.getItem('user')); // Giả sử thông tin người dùng lưu trong localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || []; // Lấy giỏ hàng từ localStorage

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const productIndex = cart.findIndex(item => item.product_id === product.id);

        if (productIndex > -1) {
            // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
            cart[productIndex].quantity += 1;
        } else {
            // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
            cart.push({
                product_id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.image, // Nếu có ảnh sản phẩm
            });
        }

        // Lưu giỏ hàng vào localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Nếu người dùng đã đăng nhập, gửi giỏ hàng lên server
        if (user) {
            axios.post('/api/cart', {
                user_id: user.id,
                cart: cart
            })
            .then(() => {
                console.log('Giỏ hàng đã được lưu vào DB');
                this.message = 'Sản phẩm đã được thêm vào giỏ hàng!';
                this.success = true;
            })
            .catch(error => {
                console.error('Lỗi khi lưu giỏ hàng vào DB:', error);
                this.message = 'Lỗi khi lưu giỏ hàng vào cơ sở dữ liệu';
                this.success = false;
            });
        } else {
            // Nếu chưa đăng nhập, chỉ cần lưu giỏ hàng vào localStorage
            this.message = 'Sản phẩm đã được thêm vào giỏ hàng!';
            this.success = true;
        }
    },


    created() {
      this.getProducts(); // Gọi API để lấy sản phẩm kèm danh mục
          // Lấy giỏ hàng từ localStorage
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      this.cart = cart; // Giả sử bạn có biến `cart` để lưu trữ giỏ hàng
    },

    extractCategories() {
      // Lấy danh sách các danh mục duy nhất từ API phản hồi
      const categories = new Set(this.products.map(product => product.category_id));
      this.categories = Array.from(categories); // Chuyển đổi thành mảng

      // Thêm lựa chọn "Tất cả"
      this.categories.unshift("Tất cả");
    },



    filterProducts() {
        if (this.selectedCategory === "all") {
            this.filteredProducts = this.products; // Hiển thị tất cả sản phẩm nếu chọn "Tất cả"
        } else {
            this.filteredProducts = this.products.filter(product => product.category_id === this.selectedCategory);
        }
    },



    // addToCart(product) {
    //     // Assuming you have a cart array in data() to store cart items
    //     const existingProduct = this.cart.find(item => item.id === product.id);
    //     if (existingProduct) {
    //         existingProduct.quantity += 1; // Increase quantity if product already in cart
    //     } else {
    //         this.cart.push({...product, quantity: 1}); // Add new product with quantity
    //     }
    //     this.message = "Sản phẩm đã được thêm vào giỏ hàng!";
    //     this.success = true;
    // },
    showProductDetails(product) {
      this.selectedProduct = product; // Lưu sản phẩm được chọn để hiển thị
    },
    closeProductDetails() {
      this.selectedProduct = null; // Đóng modal chi tiết sản phẩm
    },
  },
};
</script>

<style scoped>
.products {
    border: 1px solid #EFF0F3;
    border-radius: 5px;
    padding: 15px;
    background-color: #f9f9f9;
}

h1 {
    text-align: center;
    color: #FF5622;
    margin-bottom: 20px;
}

.message {
    padding: 10px;
    margin: 10px 0;
    text-align: center;
    border-radius: 5px;
    font-size: 1.1rem;
}

.success {
    background-color: #4CAF50;
    color: white;
}

.error {
    background-color: #FF5622;
    color: white;
}

/* select */
select {
    width: 20%;
    padding: 10px;
    margin: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.product-items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Đảm bảo mỗi sản phẩm chiếm tối thiểu 220px */
    gap: 20px; /* Khoảng cách giữa các sản phẩm */
    padding: 10px;
    justify-content: center; /* Căn giữa các sản phẩm nếu không đủ cột */
}

.product-card {
    width: 300px;
    background-color: #F8F9FA;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    text-align: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    padding: 15px;
}

.product-card:hover {
    transform: translateY(-10px); /* Cải thiện hiệu ứng hover */
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
}

.product-image {
    width: 100%;
    height: 300px; /* Giảm chiều cao hình ảnh */
    object-fit: cover;
    margin-bottom: 15px;
    border-radius: 5px;
}

.product-card h3 {
    font-size: 1.2rem;
    color: #333;
    margin: 10px 0;
}

.product-card p {
    font-size: 1rem;
    color: #555;
}

.product-card strong {
    font-weight: bold;
    color: #333;
}

.product-card button {
    margin-top: 15px;
    height: 40px;
    padding: 0 20px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #50C878;
    color: white;
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.product-card button:hover {
    background-color: #45a04a;
    transform: scale(1.05);
}

.product-card button:active {
    transform: scale(0.98);
}

/* modal sản phẩm */


.product-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 60%;
    max-width: 700px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.3s ease-out;
}

.modal-content img {
    width: 100%;
    max-height: 300px;
    object-fit: contain;
    margin-bottom: 20px;
}

.modal-content h3 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 15px;
}

.modal-content p {
    font-size: 1.1rem;
    color: #333;
    line-height: 1.6;
    margin-bottom: 20px;
}

.modal-content button {
    background-color: #50C878;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.modal-content button:hover {
    background-color: #45a04a;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.8);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

  </style>
  