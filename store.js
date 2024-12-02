import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,  // Lấy thông tin người dùng từ localStorage nếu có
    cart: JSON.parse(localStorage.getItem('cart')) || [] // Lấy giỏ hàng từ localStorage nếu có
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user; // Kiểm tra xem người dùng đã đăng nhập chưa
    },
    getUser(state) {
      return state.user; // Lấy thông tin người dùng
    },
    getCart(state) {
      return state.cart; // Lấy giỏ hàng
    },
    getCartCount(state) {
      return state.cart.reduce((total, item) => total + item.quantity, 0); // Tổng số lượng sản phẩm trong giỏ
    },
    getCartTotal(state) {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0); // Tổng giá trị giỏ hàng
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user; // Thiết lập thông tin người dùng
      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem('user', JSON.stringify(user));
    },
    setCart(state, cart) {
      state.cart = cart; // Thiết lập giỏ hàng
      // Lưu giỏ hàng vào localStorage khi có sự thay đổi
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    addToCart(state, product) {
      // Kiểm tra nếu có người dùng đăng nhập
      const user = JSON.parse(localStorage.getItem('user'));  // Lấy thông tin người dùng từ localStorage
  
      // Nếu người dùng đã đăng nhập, sử dụng user.id, nếu không, dùng user_id từ localStorage (hoặc để null)
      const userId = user ? user.id : null;
  
      const existingProductIndex = state.cart.findIndex(item => item.product_id === product.product_id);
  
      if (existingProductIndex > -1) {
        // Nếu sản phẩm đã có trong giỏ, tăng số lượng
        state.cart[existingProductIndex].quantity += 1;
      } else {
        // Nếu sản phẩm chưa có, thêm sản phẩm vào giỏ
        state.cart.push({
          ...product, 
          quantity: 1, 
          user_id: userId  // Lưu user_id vào sản phẩm
        });
      }
      
      // Cập nhật giỏ hàng vào localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart(state, productId) {
      // Xóa sản phẩm khỏi giỏ hàng
      state.cart = state.cart.filter(item => item.product_id !== productId);
      // Cập nhật giỏ hàng vào localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    updateQuantity(state, { productId, quantity }) {
      // Cập nhật số lượng sản phẩm trong giỏ
      const product = state.cart.find(item => item.product_id === productId);
      if (product) {
        product.quantity = quantity;
      }
      // Cập nhật giỏ hàng vào localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clearCart(state) {
      // Xóa tất cả sản phẩm trong giỏ hàng
      state.cart = [];
      // Cập nhật giỏ hàng vào localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    }
  },
  actions: {
    login({ commit }, user) {
      commit('setUser', user); // Đăng nhập và lưu thông tin người dùng
      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout({ commit }) {
      commit('setUser', null); // Đăng xuất
      commit('clearCart'); // Xóa giỏ hàng khi đăng xuất
      // Xóa thông tin người dùng khỏi localStorage
      localStorage.removeItem('user');
    },
    loadCart({ commit }, cart) {
      commit('setCart', cart); // Lưu giỏ hàng vào store
    },
    addProductToCart({ commit }, product) {
      commit('addToCart', product); // Thêm sản phẩm vào giỏ hàng
    },
    removeProductFromCart({ commit }, productId) {
      commit('removeFromCart', productId); // Xóa sản phẩm khỏi giỏ hàng
    },
    updateProductQuantity({ commit }, { productId, quantity }) {
      commit('updateQuantity', { productId, quantity }); // Cập nhật số lượng sản phẩm trong giỏ hàng
    }
  }
});

export default store;
