<template>
    <div id="products">
        <div class="slideshow-container">
            <div v-if="banner && banner.length > 0" class="slideshow-container">
                <div 
                    class="slide" 
                    v-for="(item, index) in banner" 
                    :key="index" 
                    v-show="currentSlide === index">
                    <img 
                    :src="item.image" 
                    style="border-radius: 20px; margin-top: 10px;" 
                    alt="Slideshow image" />
                </div>
            </div>


        
            <!-- Next and previous buttons -->
            <a class="prev" @click="prevSlide">&#10094;</a>
            <a class="next" @click="nextSlide">&#10095;</a>
        
            <!-- Dots/bullets -->
            <div class="dots">
            <span v-for="(image, index) in images" :key="index" class="dot" :class="{ active: currentSlide === index }" @click="goToSlide(index)"></span>
            </div>
        </div>

        <div v-if="message" :class="{'success': success, 'error': !success}">
          {{ message }}
        </div>
  
        <div v-if="products.length > 0" class="product-items">
            <div v-for="product in products" :key="product.id" class="product-card">
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
      <!-- Click xem sản phẩm -->
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
import axios from 'axios';


export default{
    data(){
        return{
            products: [],
            banner: [], // Danh sách banner lấy từ API
            selectedProduct: null,
            message: '',
            success: false,
            currentSlide: 0,
        }
    },
    created() {
      this.getProducts();  // Gọi API khi component được tạo
      this.loadBanner();  // Gọi API khi component được tạo
    },
    methods:{
        async getProducts() {
            try {
            const response = await axios.get('http://42.116.34.181/test/products.php');  // Đảm bảo đường dẫn đúng
            if (response.data.status === 'success') {
                this.products = response.data.data; // Gán danh sách sản phẩm vào mảng products
            } else {
                this.message = 'Không có sản phẩm';
                this.success = false;
            }
            } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            this.message = 'Có lỗi khi lấy dữ liệu';
            this.success = false;
            }
        },

        async loadBanner() {
            try {
                const response = await axios.get('http://42.116.34.181/test/banner.php');
                if (response.data.status === 'success') {
                this.banner = response.data.banner || [];  // Ensure banner is always an array
                } else {
                this.banner = []; // If there's an error, set an empty array
                this.message = 'Không có banner';
                this.success = false;
                }
            } catch (error) {
                console.error(error);
                this.banner = [];  // Fallback to an empty array on error
                alert('Không thể tải danh sách banner.');
            }
        },

        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.banner.length; // Sử dụng banner thay vì images
        },
        prevSlide() {
            this.currentSlide = (this.currentSlide - 1 + this.banner.length) % this.banner.length; // Sử dụng banner thay vì images
        },
        goToSlide(index) {
            this.currentSlide = index; // Sử dụng banner thay vì images
        },
        showProductDetails(product) {
            this.selectedProduct = product; // Lưu sản phẩm được chọn để hiển thị
        },
        closeProductDetails() {
            this.selectedProduct = null; // Đóng modal chi tiết sản phẩm
        },
    },
    mounted() {
        this.loadBanner(); // Tải danh sách banner khi trang được tải
        setInterval(this.nextSlide, 3000); // Chuyển slide tự động mỗi 3 giây
    },
}
</script>
<style>
.products{
    border: 1px solid #EFF0F3;
    border-radius: 5px;
}
.tieude{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.tieude h1{
    color: #FF5622;
}
.tieude a{
    color: black;
    text-decoration: none;
    font-weight: 500;
}
.tieude a:hover{
    color: #FF5622;
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
.btn-added {
    background-color: gray;
    color: white;
    border: none;
    cursor: not-allowed;
}
.slideshow-container {
  position: relative;
  max-width: 80%; /* Ensure full width */
  height: 400px; /* Fixed height for the banner */
  margin: auto;
  overflow: hidden; /* Hide overflowed images */
}

.slide {
  display: flex;
  width: 100%;
  height: 100%; /* Ensure the slide takes full height */
}

.slide img {
  width: 100%;
  height: 100%; /* Make the image fill the container */
  object-fit: cover; /* Prevent image distortion by maintaining aspect ratio */
  border-radius: 20px;
}

.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
  text-decoration: none;
}
.prev {
    left: 85px;
}
.next {
  right: 85px;
  border-radius: 3px 0 0 3px;
}

.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}

.dots {
  text-align: center;
  position: absolute;
  bottom: 15px;
  width: 100%;
}

.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active, .dot:hover {
  background-color: #717171;
}

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