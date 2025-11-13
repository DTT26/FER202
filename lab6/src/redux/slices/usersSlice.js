import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/users';

// Initial State
const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

// ============================================================
// ASYNC THUNKS
// ============================================================

/**
 * Fetch all users from API
 * Xử lý thao tác đọc (READ)
 */
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Không thể tải danh sách người dùng'
      );
    }
  }
);

/**
 * Create a new user
 */
export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Không thể tạo người dùng mới'
      );
    }
  }
);

/**
 * Update user
 */
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Không thể cập nhật người dùng'
      );
    }
  }
);

/**
 * Delete user
 */
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${userId}`);
      return userId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Không thể xóa người dùng'
      );
    }
  }
);

// ============================================================
// SLICE
// ============================================================

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    /**
     * THAO TÁC CỤC BỘ (Synchronous Reducer)
     * Toggle Admin Status - Chuyển đổi role giữa 'admin' và 'user'
     */
    toggleAdminStatus: (state, action) => {
      const userId = action.payload;
      const user = state.list.find((u) => u.id === userId);
      
      if (user) {
        // Toggle giữa 'admin' và 'user'
        user.role = user.role === 'admin' ? 'user' : 'admin';
      }
    },

    /**
     * Toggle user status (active, blocked, locked)
     */
    toggleUserStatus: (state, action) => {
      const { userId, newStatus } = action.payload;
      const user = state.list.find((u) => u.id === userId);
      
      if (user) {
        user.status = newStatus;
      }
    },

    /**
     * Clear error message
     */
    clearError: (state) => {
      state.error = null;
    },
  },

  // ============================================================
  // EXTRA REDUCERS - Xử lý Async Actions
  // ============================================================
  extraReducers: (builder) => {
    // -----------------
    // FETCH USERS
    // -----------------
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Đã xảy ra lỗi';
      })

    // -----------------
    // CREATE USER
    // -----------------
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list.push(action.payload);
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Không thể tạo người dùng';
      })

    // -----------------
    // UPDATE USER
    // -----------------
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.list.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Không thể cập nhật người dùng';
      })

    // -----------------
    // DELETE USER
    // -----------------
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = state.list.filter((u) => u.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Không thể xóa người dùng';
      });
  },
});

// ============================================================
// EXPORTS
// ============================================================

// Export actions
export const { toggleAdminStatus, toggleUserStatus, clearError } = usersSlice.actions;

// Export selectors
export const selectAllUsers = (state) => state.users.list;
export const selectUsersLoading = (state) => state.users.isLoading;
export const selectUsersError = (state) => state.users.error;

// Selector lấy users theo role
export const selectUsersByRole = (role) => (state) =>
  state.users.list.filter((user) => user.role === role);

// Selector lấy users theo status
export const selectUsersByStatus = (status) => (state) =>
  state.users.list.filter((user) => user.status === status);

// Selector lấy user theo ID
export const selectUserById = (userId) => (state) =>
  state.users.list.find((user) => user.id === userId);

// Export reducer
export default usersSlice.reducer;
