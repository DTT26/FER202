import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import axios from 'axios';

const API_URL = 'http://localhost:3001/payments';

// Initial State
const initialState = {
  payments: [],
  isLoading: false,
  error: null,
};

// ============================================================
// ASYNC THUNKS
// ============================================================

/**
 * Fetch all payments from API
 */
export const fetchPayments = createAsyncThunk(
  'payments/fetchPayments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Không thể tải danh sách thanh toán'
      );
    }
  }
);

/**
 * BÀI TẬP 2.1: Tạo Thanh Toán Mới (POST /api/payments)
 * Thao tác GHI (WRITE Operation)
 */
export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      // Ensure date exists on payment (if form didn't supply it) - use YYYY-MM-DD
      const payload = { ...paymentData };
      if (!payload.date) {
        payload.date = new Date().toISOString().split('T')[0];
      }

      const response = await axios.post(API_URL, payload);

      // Nếu thành công, return payment data
      return response.data;
    } catch (error) {
      // BÀI TẬP 2.2: Xử lý lỗi tùy chỉnh
      // Nếu status code là 402 (Payment Required)
      if (error.response?.status === 402) {
        return rejectWithValue('Tài khoản không đủ tiền');
      }
      
      // Các lỗi khác
      return rejectWithValue(
        error.response?.data?.message || 'Không thể tạo thanh toán mới'
      );
    }
  }
);

/**
 * Update payment
 */
export const updatePayment = createAsyncThunk(
  'payments/updatePayment',
  async ({ id, paymentData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Không thể cập nhật thanh toán'
      );
    }
  }
);

/**
 * Delete payment
 */
export const deletePayment = createAsyncThunk(
  'payments/deletePayment',
  async (paymentId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${paymentId}`);
      return paymentId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Không thể xóa thanh toán'
      );
    }
  }
);

/**
 * CÂU 4: Refund Payment (Hoàn tiền)
 * Action bất đồng bộ để hoàn tiền một giao dịch
 */
export const refundPayment = createAsyncThunk(
  'payments/refund',
  async (paymentId, { rejectWithValue }) => {
    try {
      // Giả sử API có endpoint POST /api/payments/:id/refund
      const response = await axios.post(`${API_URL}/${paymentId}/refund`);
      return response.data; // payload cho fulfilled
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Không thể hoàn tiền'
      );
    }
  }
);

// ============================================================
// SLICE
// ============================================================

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    /**
     * Synchronous reducers
     */
    clearError: (state) => {
      state.error = null;
    },

    /**
     * Update payment status locally (synchronous)
     */
    updatePaymentStatus: (state, action) => {
      const { paymentId, status } = action.payload;
      const payment = state.payments.find((p) => p.id === paymentId);
      
      if (payment) {
        payment.status = status;
      }
    },
  },

  // ============================================================
  // EXTRA REDUCERS - Xử lý Async Actions
  // ============================================================
  extraReducers: (builder) => {
    // -----------------
    // FETCH PAYMENTS
    // -----------------
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.payments = action.payload;
        state.error = null;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Đã xảy ra lỗi';
      })

    // -----------------
    // CREATE PAYMENT (BÀI TẬP 2.1)
    // -----------------
      .addCase(createPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        // Thêm payment mới vào mảng payments
        state.payments.push(action.payload);
        state.error = null;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.isLoading = false;
        // BÀI TẬP 2.2: Hiển thị lỗi tùy chỉnh
        state.error = action.payload || 'Không thể tạo thanh toán';
      })

    // -----------------
    // UPDATE PAYMENT
    // -----------------
      .addCase(updatePayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.payments.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.payments[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Không thể cập nhật thanh toán';
      })

    // -----------------
    // DELETE PAYMENT
    // -----------------
      .addCase(deletePayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.payments = state.payments.filter((p) => p.id !== action.payload);
        state.error = null;
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Không thể xóa thanh toán';
      })

    // -----------------
    // REFUND PAYMENT (CÂU 4)
    // Xử lý 3 trạng thái: pending, fulfilled, rejected
    // -----------------
      .addCase(refundPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refundPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        // Cập nhật payment đã được refund
        const index = state.payments.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.payments[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(refundPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Không thể hoàn tiền';
      });
  },
});

// ============================================================
// SELECTORS
// ============================================================

// Basic selectors
export const selectAllPayments = (state) => state.payments.payments;
export const selectPaymentsLoading = (state) => state.payments.isLoading;
export const selectPaymentsError = (state) => state.payments.error;

/**
 * BÀI TẬP 2.3: RESELECT SELECTOR
 * Selector để lấy các thanh toán có status: 'SUCCESS'
 * Sử dụng createSelector từ reselect để memoization
 */
export const selectSuccessfulPayments = createSelector(
  [selectAllPayments], // Input selectors
  (payments) => {
    // Output selector - chỉ chạy lại khi payments thay đổi
    return payments.filter((payment) => payment.status === 'SUCCESS');
  }
);

/**
 * Selector lấy payments theo userId
 */
export const selectPaymentsByUserId = (userId) =>
  createSelector([selectAllPayments], (payments) =>
    payments.filter((payment) => payment.userId === userId)
  );

/**
 * Selector lấy payment theo ID
 */
export const selectPaymentById = (paymentId) => (state) =>
  state.payments.payments.find((payment) => payment.id === paymentId);

/**
 * Selector tính tổng tiền của tất cả payments
 */
export const selectTotalAmount = createSelector(
  [selectAllPayments],
  (payments) => payments.reduce((total, payment) => total + payment.amount, 0)
);

/**
 * Selector tính tổng tiền của successful payments
 */
export const selectSuccessfulTotalAmount = createSelector(
  [selectSuccessfulPayments],
  (successfulPayments) =>
    successfulPayments.reduce((total, payment) => total + payment.amount, 0)
);

/**
 * Selector lấy payments theo semester
 */
export const selectPaymentsBySemester = (semester) =>
  createSelector([selectAllPayments], (payments) =>
    payments.filter((payment) => payment.semester === semester)
  );

// ============================================================
// EXPORTS
// ============================================================

// Export actions
export const { clearError, updatePaymentStatus } = paymentsSlice.actions;

// Export reducer
export default paymentsSlice.reducer;
