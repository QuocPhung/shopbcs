<template>
  <div>
    <h1 style="text-align: center;">Quản lý Người Dùng</h1>

    <!-- Hiển thị thông báo -->
    <div v-if="message" :class="success ? 'success' : 'error'">
      {{ message }}
    </div>

    <!-- Danh sách các người dùng -->
    <div v-if="users.length">
      <h2>Danh sách Người Dùng</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Chỉnh Sửa</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.roles }}</td>
            <td>
              <button @click="editUser(user)">Chỉnh sửa</button>
            </td>
            <td>
              <button @click="deleteUser(user.id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Nút Thêm Người Dùng -->
    <button style="margin: 10px;" @click="openFormModal" class="add-button">Thêm Người Dùng</button>


    <!-- Form Thêm hoặc Chỉnh sửa Người Dùng -->
    <div v-if="isFormModalOpen" class="modal">
      <div class="modal-body">
      <form @submit.prevent="submitUser" class="form-container">
        <label for="username">Username</label>
        <input v-model="form.username" type="text" placeholder="Tên người dùng" required />

        <label for="email">Email</label>
        <input v-model="form.email" type="email" placeholder="Email" required />

        <label for="password">Mật khẩu</label>
        <input v-model="form.password" type="password" placeholder="Mật khẩu" required />

        <label for="role">Role</label>
        <select v-model="form.role" :disabled="!form.role">
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
        </select>


        <button type="submit">{{ isEditing ? 'Cập nhật người dùng' : 'Thêm người dùng' }}</button>
        <button type="button" @click="closeFormModal">Đóng</button>
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
      form: {
        id: null,
        username: '',
        email: '',
        password: '',
        role: 'user', // Mặc định là 'user'
      },
      users: [], // Danh sách người dùng
      message: '',
      success: false,
      isEditing: false, // Kiểm tra chế độ chỉnh sửa
      isFormModalOpen: false, // Biến điều khiển việc hiển thị form
    };
  },

  methods: {
    // Tải danh sách người dùng từ server
    async loadUsers() {
      try {
        const response = await axios.get('http://42.116.34.181/test/users.php'); // URL để lấy dữ liệu người dùng
        this.users = response.data.users || [];
      } catch (error) {
        console.error(error);
        this.message = 'Không thể tải danh sách người dùng.';
        this.success = false;
      }
    },

    // Mở modal để chỉnh sửa hoặc thêm người dùng
    openFormModal() {
      this.isFormModalOpen = true;
    },

    // Đóng modal form
    closeFormModal() {
      this.isFormModalOpen = false;
      this.resetForm();
    },

    // Đặt form vào chế độ chỉnh sửa
    editUser(user) {
      this.form.id = user.id;
      this.form.username = user.username;
      this.form.email = user.email;
      this.form.password = ''; // Mật khẩu không được lấy khi chỉnh sửa
      this.form.role = user.roles || 'user'; // Đảm bảo rằng form.role luôn có giá trị hợp lệ
      this.isEditing = true;
      this.openFormModal();
    },


    // Reset form khi thêm hoặc chỉnh sửa
    resetForm() {
      this.form = {
        id: null,
        username: '',
        email: '',
        password: '',
        role: 'user',
      };
      this.isEditing = false;
    },

    // Thêm hoặc cập nhật người dùng
    async submitUser() {
      if (!this.form.username || !this.form.email || !this.form.password) {
        this.message = 'Vui lòng điền đầy đủ thông tin.';
        this.success = false;
        return;
      }

      const url = this.isEditing
        ? `http://42.116.34.181/test/users.php?id=${this.form.id}`
        : 'http://42.116.34.181/test/users.php'; // URL thêm mới hoặc chỉnh sửa người dùng

      try {
        const method = this.isEditing ? 'put' : 'post';
        const response = await axios({
          method,
          url,
          data: this.form,
        });

        if (response.data.status === 'success') {
          this.message = this.isEditing ? 'Cập nhật thành công!' : 'Thêm người dùng thành công!';
          this.success = true;
          this.loadUsers(); // Tải lại danh sách người dùng
          this.closeFormModal(); // Đóng modal
        } else {
          this.message = response.data.message || 'Có lỗi khi thêm hoặc cập nhật người dùng.';
          this.success = false;
        }
      } catch (error) {
        console.error(error);
        this.message = 'Có lỗi xảy ra khi gọi API';
        this.success = false;
      }
    },

    // Xóa người dùng
    async deleteUser(userId) {
      try {
        const response = await axios.delete('http://42.116.34.181/test/users.php', {
          data: { id: userId }, // Truyền id của người dùng cần xóa
        });

        if (response.data.status === 'success') {
          this.message = 'Người dùng đã được xóa thành công!';
          this.success = true;
          this.loadUsers(); // Tải lại danh sách người dùng
        } else {
          this.message = response.data.message || 'Lỗi khi xóa người dùng.';
          this.success = false;
        }
      } catch (error) {
        console.error(error);
        this.message = 'Có lỗi xảy ra khi gọi API';
        this.success = false;
      }
    },
  },

  mounted() {
    this.loadUsers(); // Tải danh sách người dùng khi trang được tải
  },
};
</script>

<style scoped>
/* Nút Thêm Người Dùng */
.add-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.add-button:hover {
  background-color: #0056b3;
}

/* Modal */
.modal {
  display: none; /* Ban đầu ẩn modal */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Nền mờ */
  z-index: 1050;
  justify-content: center;
  align-items: center;
  display: flex; /* Sử dụng flex để căn giữa */
}

/* Modal Body */
.modal-body {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease-out;
}

/* Đảm bảo rằng form được căn giữa và đẹp */
form {
  display: flex;
  flex-direction: column;
}

label {
  margin: 10px 0 5px;
  font-weight: bold;
}

input, select {
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
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

/* Cải tiến cho bảng */
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

/* Animation for modal opening */
@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}


</style>
