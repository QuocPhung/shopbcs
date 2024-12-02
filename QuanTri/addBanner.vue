<template>
    <div>
      <h1>Quản lý Banner</h1>
  
      <!-- Hiển thị thông báo -->
      <div v-if="message" :class="success ? 'success' : 'error'">
        {{ message }}
      </div>

      <!-- Danh sách các banner -->
      <div v-if="banner.length">
        <h2>Danh sách Banner</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên Banner</th>
              <th>Link Ảnh</th>
              <th>Ảnh</th>
              <th>Chỉnh Sửa</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="banner in banner" :key="banner.id">
              <td>{{ banner.id }}</td>
              <td>{{ banner.name }}</td>
              <td><a :href="banner.image" target="_blank">Xem ảnh</a></td>
              <td>
                <img
                  :src="banner.image"
                  alt="Banner Image"
                  style="width: 100px; height: auto; cursor: pointer;"
                  @click="editBanner(banner)"
                />
              </td>
              <td>
                <button style="margin: 10px;" @click="editBanner(banner)">Chỉnh sửa</button>
                <button style="margin: 10px;" @click="deleteBanner(banner.id)">Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
        
      <!-- Nút Thêm Banner -->
      <button style="margin: 20px;" @click="openFormModal">Thêm Banner</button>
  
      <!-- Form Thêm hoặc Chỉnh sửa Banner trong Modal -->
      <div v-if="isFormModalOpen" class="form-modal" @click="closeFormModal">
          <form @submit.prevent="submitBanner">
            <label for="name">Tên Banner</label>
            <input v-model="form.name" type="text" placeholder="Tên Banner" required />
  
            <label for="image">Link Ảnh</label>
            <input v-model="form.image" type="text" placeholder="Dán link ảnh ở đây" required />
  
            <button style="margin: 10px;" type="submit">{{ isEditing ? 'Cập nhật Banner' : 'Thêm Banner' }}</button>
            <button style="margin: 10px;" type="button" @click="closeFormModal">Đóng</button>
          </form>
        </div>
      </div>
  </template>
  
  
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        form: {
          id: null,
          name: '',
          image: '',  // Lưu trữ đường dẫn ảnh (URL)
        },
        banner: [], // Khởi tạo là mảng rỗng
        message: '',
        success: false,
        isEditing: false,
        isFormModalOpen: false, // Biến điều khiển modal form
      };
    },
  
    methods: {
      // Tải danh sách banner từ server
      async loadbanner() {
        try {
          const response = await axios.get('http://42.116.34.181/test/banner.php');
          
          if (Array.isArray(response.data.banner)) {
            this.banner = response.data.banner;
          } else {
            console.error('Dữ liệu banner không hợp lệ:', response.data.banner);
            this.banner = [];
          }
        } catch (error) {
          console.error(error);
          this.message = 'Không thể tải danh sách banner.';
          this.success = false;
          this.banner = [];
        }
      },
  
      // Thêm hoặc cập nhật banner
      async submitBanner() {
        if (!this.form.name || !this.form.image) {
          this.message = 'Vui lòng điền đầy đủ thông tin và nhập link ảnh!';
          this.success = false;
          return;
        }
  
        const url = this.isEditing
          ? `http://42.116.34.181/test/banner.php?id=${this.form.id}`
          : 'http://42.116.34.181/test/banner.php'; // Thêm mới hoặc chỉnh sửa
  
        try {
          const method = this.isEditing ? 'put' : 'post';
          const response = await axios({
            method,
            url,
            data: this.form,
          });
  
          if (response.data.status === 'success') {
            this.message = this.isEditing ? 'Cập nhật banner thành công!' : 'Thêm banner thành công!';
            this.success = true;
            this.resetForm();
            this.loadbanner(); // Tải lại danh sách banner sau khi thêm hoặc cập nhật
            this.closeFormModal(); // Đóng modal sau khi submit thành công
          } else {
            this.message = response.data.message || 'Lỗi khi thêm hoặc cập nhật banner.';
            this.success = false;
          }
        } catch (error) {
          this.message = error.response && error.response.data.message
            ? error.response.data.message
            : 'Có lỗi xảy ra khi gọi API';
          this.success = false;
        }
      },
  
      // Đặt form vào chế độ chỉnh sửa
      editBanner(banner) {
        this.form.id = banner.id;
        this.form.name = banner.name;
        this.form.image = banner.image;
        this.isEditing = true;
        this.openFormModal(); // Mở modal form khi chỉnh sửa
      },
  
      // Xóa banner
      async deleteBanner(bannerId) {
        if (confirm("Bạn có chắc muốn xóa banner này?")) {
            try {
          const response = await axios.delete('http://42.116.34.181/test/banner.php', {
            data: { bannerId: bannerId }, // Truyền bannerId trong phần data
          });
  
          if (response.data.status === 'success') {
            this.message = 'Banner đã được xóa thành công!';
            this.success = true;
            this.loadbanner(); // Tải lại danh sách sau khi xóa
          } else {
            this.message = response.data.message || 'Lỗi xóa banner.';
            this.success = false;
          }
        } catch (error) {
          console.error(error);
          this.message = 'Có lỗi xảy ra khi gọi API';
          this.success = false;
        }
        }
      },
  
      // Mở modal form
      openFormModal() {
        this.isFormModalOpen = true;
      },
  
      // Đóng modal form
      closeFormModal(event) {
        if (!event || event.target === event.currentTarget) {
          this.isFormModalOpen = false;
          this.resetForm();  // Reset form khi đóng modal
        }
      },
  
      // Reset form sau khi thêm hoặc cập nhật
      resetForm() {
        this.form = { id: null, name: '', image: '' };
        this.isEditing = false;
      }
    },
  
    mounted() {
      this.loadbanner(); // Tải danh sách banner khi trang được tải
    }
  };
  </script>
  
  

  <style scoped>
  form {
    max-width: 500px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #555;
  }
  
  input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
  }
  
  button {
    display: inline-block;
    padding: 12px;
    background-color: #28a745;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #218838;
  }
  
  button[type="button"] {
    background-color: #dc3545;
  }
  
  button[type="button"]:hover {
    background-color: #c82333;
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
  
  table {
    width: 100%;
    margin-top: 30px;
    border-collapse: collapse;
  }
  
  table th,
  table td {
    padding: 10px;
    text-align: center;
    border: 1px solid #ddd;
  }
  
  table th {
    background-color: #f4f4f4;
  }

.form-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center; /* Căn giữa theo chiều ngang */
  align-items: center; /* Căn giữa theo chiều dọc */
  z-index: 1000;
}

.form-modal .form-container {
  width: 100%;
  max-width: 500px;  /* Đặt chiều rộng tối đa của form */
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-sizing: border-box;  /* Đảm bảo padding không làm form bị lệch */
}

button {
  display: inline-block;
  padding: 12px;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="button"] {
  background-color: #dc3545;
}

button[type="button"]:hover {
  background-color: #c82333;
}

.close {
  font-size: 30px;
  color: black;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

.close:hover {
  color: red;
}
</style>
