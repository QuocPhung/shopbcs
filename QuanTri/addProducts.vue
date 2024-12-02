<template>
    <div>
      <h1 style="text-align: center;">Quản lý sản phẩm</h1>
  
      <!-- Thông báo thành công hoặc lỗi -->
      <div v-if="message" :class="{'success': success, 'error': !success}">
          {{ message }}
      </div>
  
      <!-- Danh sách sản phẩm -->
      <table>
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Loại</th>
            <th>Stock</th>
            <th>Ảnh</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.category_name }}</td>
            <td>{{ product.stock }}</td>
            <td><a :href="product.image" target="_blank"><img :src="product.image" alt="Product Image" width="50" /></a></td>
            <td>
              <button style="margin: 10px;" @click="editProduct(product)">Sửa</button>
              <button style="margin: 10px;" @click="deleteProduct(product.id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Thêm sản phẩm Button -->
      <button style="margin: 10px;" @click="openModal">Thêm sản phẩm</button>
  
      <!-- Modal Form Thêm/Sửa Sản Phẩm -->
      <div class="modal" v-if="showModal" @click="closeModal">
        <div @click.stop="closeModal">
          <form @submit.prevent="isEdit ? updateProduct() : addProduct()">
            <label for="name">Tên sản phẩm</label>
            <input v-model="form.name" type="text" placeholder="Tên sản phẩm" required />
  
            <label for="description">Mô tả</label>
            <textarea v-model="form.description" placeholder="Mô tả sản phẩm"></textarea>
  
            <label for="price">Giá</label>
            <input v-model="form.price" type="number" placeholder="Giá sản phẩm" required />
  
            <label for="category">Loại</label>
            <select v-model="form.category">
              <option value="1">PC</option>
              <option value="2">Laptop</option>
              <option value="3">CPU</option>
              <option value="4">RAM</option>
              <option value="5">Ổ Cứng</option>
              <option value="6">VGA</option>
            </select>
  
            <label for="stock">Số lượng</label>
            <input v-model="form.stock" type="number" placeholder="Số lượng sản phẩm" />
  
            <label for="image">Đường dẫn ảnh</label>
            <input v-model="form.image" type="text" placeholder="URL ảnh sản phẩm" />
            
                  <!-- Thông báo thành công hoặc lỗi -->
            <div v-if="message" :class="{'success': success, 'error': !success}">
                {{ message }}
            </div>
  
            <button type="submit">{{ isEdit ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm' }}</button>
            <button style="font-size: medium;margin: 10px;" type="button" class="close" @click="closeModal">Đóng</button>
          </form>
        </div>
        </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        showModal: false,
        form: {
          name: '',
          description: '',
          price: '',
          image: '',
          category: '',
          stock: ''
        },
        products: [],
        message: '',
        success: false,
        isEdit: false,
        currentProductId: null,
      };
    },
    methods: {
        async getProducts() {
            try {
            const response = await axios.get('http://42.116.34.181/test/products.php');
            this.products = response.data.data;
            } catch (error) {
            console.error('Lỗi khi lấy sản phẩm:', error);
            }
        },
    
        async addProduct() {
            try {
                const formData = new FormData();
                for (let key in this.form) {
                formData.append(key, this.form[key]);
                }

                const response = await axios.post('http://42.116.34.181/test/products.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
                });

                // Kiểm tra phản hồi từ API
                console.log(response);  // Kiểm tra xem phản hồi có đúng không

                if (response.data.status === 'success') {
                this.message = 'Sản phẩm đã được thêm thành công!';
                this.success = true;
                this.getProducts();
                this.resetForm();
                this.closeModal();
                } else {
                this.message = 'Lỗi thêm sản phẩm!';
                this.success = false;
                }
            } catch (error) {
                console.error('Lỗi khi thêm sản phẩm:', error);
            }
        },


  
      editProduct(product) {
        this.isEdit = true;
        this.currentProductId = product.id;
        this.form = { ...product };
        this.showModal = true;
      },
      async updateProduct() {
        try {
            if (!this.validateForm()) {
                return; // Nếu validation không thành công, dừng lại
            }
            const response = await axios.put(`http://42.116.34.181/test/products.php?id=${this.currentProductId}`, this.form, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.data.status === 'success') {
                this.message = 'Sản phẩm đã được cập nhật!';
                this.success = true;
                this.getProducts();
                this.resetForm();
                this.closeModal();
            } else {
                this.message = `Lỗi cập nhật sản phẩm: ${response.data.message || 'Không rõ lý do'}`;
                this.success = false;
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật sản phẩm:', error);
            this.message = 'Có lỗi xảy ra khi cập nhật sản phẩm.';
            this.success = false;
        }
    },

      async deleteProduct(id) {
        if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
          try {
            const response = await axios.delete(`http://42.116.34.181/test/products.php?id=${id}`);
            if (response.data.status === 'success') {
              this.message = 'Sản phẩm đã được xóa!';
              this.success = true;
              this.getProducts();
            } else {
              this.message = 'Lỗi xóa sản phẩm!';
              this.success = false;
            }
          } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
          }
        }
      },
  
    resetForm() {
        this.form = { name: '', description: '', price: '', category: '', stock: '', image: '' };
        this.isEdit = false;  // Đặt trạng thái isEdit về false khi reset form
        this.currentProductId = null;  // Đặt lại currentProductId về null
    },
    validateForm() {
        // Kiểm tra tên sản phẩm (Không được để trống và dài từ 3 ký tự trở lên)
        if (!this.form.name || this.form.name.length < 3) {
            this.message = 'Tên sản phẩm phải có ít nhất 3 ký tự!';
            this.success = false;
            return false;
        }

        // Kiểm tra mô tả (Không được để trống)
        if (!this.form.description || this.form.description.length < 10) {
            this.message = 'Mô tả sản phẩm phải có ít nhất 10 ký tự!';
            this.success = false;
            return false;
        }

        // Kiểm tra giá (Phải là một số và lớn hơn 0)
        if (!this.form.price || isNaN(this.form.price) || parseFloat(this.form.price) <= 0) {
            this.message = 'Giá sản phẩm không hợp lệ!';
            this.success = false;
            return false;
        }

        // Kiểm tra danh mục (Phải chọn một danh mục)
        if (!this.form.category) {
            this.message = 'Vui lòng chọn một loại sản phẩm!';
            this.success = false;
            return false;
        }

        // Kiểm tra số lượng tồn kho (Phải là một số nguyên và lớn hơn hoặc bằng 0)
        if (!this.form.stock || isNaN(this.form.stock) || parseInt(this.form.stock) < 0) {
            this.message = 'Số lượng tồn kho phải là một số nguyên không âm!';
            this.success = false;
            return false;
        }

        return true; // Nếu tất cả các điều kiện đều hợp lệ
    },

  
      openModal() {
        this.showModal = true;
        this.resetForm(); // Reset form khi mở modal
      },
  
      closeModal(event) {
        if (!event || event.target === event.currentTarget) {
          this.showModal = false;
          this.resetForm();  // Reset form khi đóng modal
        }
      }
    },
    created() {
      this.getProducts();
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
  }
  
  table, th, td {
    border: 1px solid #ddd;
  }
  
  th, td {
    padding: 8px;
    text-align: center;
  }
  
  button {
    padding: 6px 12px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #218838;
  }

  button[type="button"] {
    color: #f9f9f9;
  background-color: #dc3545;
}

button[type="button"]:hover {
  background-color: #c82333;
  color: #f9f9f9;
}
  
  form {
    max-width: 500px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  textarea {
    resize: none;
    height: 100px;
  }
  
  .success {
    color: green;
    text-align: center;
    margin-top: 15px;
  }
  
  .error {
    color: red;
    text-align: center;
    margin-top: 15px;
  }
  
  img {
    max-width: 100px;
  }
  
  .modal {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1050;
  }
  
  .modal-body {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 8px;
  }
  
  .close {
    background: none;
    border: none;
    color: #aaa;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .close:hover {
    color: black;
  }
  </style>
  