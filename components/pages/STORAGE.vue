<template>
    <div>
        <div class="container products my-3">
            <h1>Kho Phần Mềm</h1>
            <div>
                <label for="category">Chọn thể loại:</label>
                <select class="pick" v-model="selectedCategory">
                    <option value="all">Tất cả</option>
                    <option value="Office">Office</option>
                    <option value="Windows">Windows</option>
                    <option value="Package">Package</option>
                    <option value="Def">Diệt Virus</option>
                </select>
            </div>
            <div class="product-items">
                <div class="product-item" v-for="phanmem in filteredShops" @click="showProductDetails(phanmem)" :key="phanmem.id">
                    <img :src="require(`@/assets/pic/${phanmem.thum}`)" alt="">
                    <div class="product-item-text">
                        <h4>{{ phanmem.name }}</h4>
                        <p><span>{{ phanmem.price }}</span><sup>đ</sup></p>
                    </div>
                    <button @click.stop="addToCart(phanmem)">Thêm vào giỏ hàng</button>
                </div>
            </div>

            <div v-if="selectedProduct" class="product-modal">
                <div class="modal-content">
                    <h3>Thông tin sản phẩm</h3>
                    <img :src="getImageSrc(selectedProduct.thum)" alt="">
                    <h4>{{ selectedProduct.name }}</h4>
                    <p><span style="font-weight: bold;">Giá:</span> {{ formatPrice(selectedProduct.price) }} đ</p>
                    <p><span style="font-weight: bold;">Mô tả:</span> {{ selectedProduct.description }}</p>
                    <button class="btn" style="background-color: rgb(50, 205, 108);color: #fff;" @click="closeProductDetails">Đóng</button>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    export default{
        name:'PhanMem',
        props:['products'],
        data(){
            return{
                selectedProduct: null,
                selectedCategory: 'all',
                phanmems:[
                    { id: 1, thum: "office2010.jpg", name: "Office 2010", price: "1.000",category:"Office", description:"Microsoft Office 2010 (tên mã hóa: Office 14) là một phiên bản của bộ sản phẩm Microsoft Office dành cho hệ điều hành Microsoft Windows. Phiên bản này mang đến nhiều cải tiến về giao diện người dùng, bao gồm việc giới thiệu chế độ xem Backstage, giúp hợp nhất các tác vụ quản lý tài liệu về một vị trí duy nhất." },
                    { id: 2, thum: "visual C++.jpg", name: "Microsoft Visual All", price: "1.000",category:"Package", description:"đặt nhằm cung cấp các thành phần runtime cần thiết để chạy các ứng dụng C++ được phát triển bằng Visual Studio 2015, 2017, 2019 và 2022. Bộ cài đặt này là rất quan trọng để đảm bảo rằng các ứng dụng C++ có thể hoạt động đúng trên máy tính người dùng, vì nó bao gồm các thư viện cần thiết mà ứng dụng dựa vào."},
                    { id: 3, thum: "Win11iso.jpg", name: "Win 11 (iso)", price: "1.000",category:"Windows", description:"File ISO Windows 11 là tệp lưu trữ chứa tất cả dữ liệu và thông tin cần thiết để cài đặt hệ điều hành Windows 11 trên máy tính. Người dùng có thể tải file này từ trang web chính thức của Microsoft để tạo phương tiện cài đặt như USB hoặc DVD."},
                    { id: 4, thum: "Kas.jpg", name: "Kaspersky 2021", price: "1.000",category:"Def", description:"Kaspersky 2021 là một phần mềm bảo mật nổi tiếng cung cấp các giải pháp phòng chống virus, phần mềm gián điệp, chống lừa đảo và spam. Nó bảo vệ người dùng khỏi các cuộc tấn công từ malware và các mối đe dọa trực tuyến khác. Trong năm 2021, có khoảng 15.45% máy tính người dùng trên toàn thế giới đã trải qua ít nhất một cuộc tấn công malware, với Kaspersky đã chặn được hàng triệu cuộc tấn công này."},
                ]
            }
        },
        methods:{
            addToCart(phanmem) {
                this.$emit('addToCart', phanmem);
            },
            showProductDetails(phanmem) {
            this.selectedProduct = phanmem; // Lưu sản phẩm được chọn để hiển thị
            },
            closeProductDetails() {
                this.selectedProduct = null; // Đóng modal chi tiết sản phẩm
            },
            getImageSrc(thum) {
                return require(`@/assets/pic/${thum}`);
            },
            formatPrice(price) {
                return price.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Định dạng giá với dấu chấm
            },
        },
        computed:{
            filteredShops() {
                if (this.selectedCategory === 'all') {
                    return this.phanmems;
                }
                    return this.phanmems.filter(phanmem => phanmem.category === this.selectedCategory);
            }
        },
    }
</script>
<style>
.products{
    border: 1px solid #EFF0F3;
    border-radius: 5px;
}
h1{
    text-align: center;
    color: #FF5622;
}
.pick{
    margin: 5px;
    border-radius: 5px;
}
.product-items {
    display: flex;
    padding: 12px;
    flex-wrap: wrap;
}
.product-item {
    width: 19%;
    min-width: 200px;
    background-color: #fff;
    box-shadow: 0px 5px 10px gray;
    padding: 12px;
    margin-bottom: 12px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.product-item:hover {
    box-shadow: 0px 5px 10px rgba(0,0,0,0.2);
    transform: scale(1.05);
    transform: translateY(-5px);
}
.product-item img {
    border: 1px solid #2f2f2f;
    width: 100%;
    height: 50%;
    margin-bottom: 20px;
} 
.product-item-text h4 {
    font-size: 1rem;
}
.product-item button {
    margin-bottom: 12px;
    height: 30px;
    padding: 0 12px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
}
.product-item button:hover {
    background-color: greenyellow;
    transform: translateY(-5px);
    box-shadow: 0px 5px 10px gray;
}
.btn-added {
    background-color: gray;
    color: white;
    border: none;
    cursor: not-allowed;
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
}

.modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 50%;
    max-width: 600px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    animation: fadeIn 0.3s ease-out;
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