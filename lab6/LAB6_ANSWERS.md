# LAB 6: TÌM HIỂU VỀ REDUX, REDUX THUNK VÀ REDUX TOOLKIT

## Câu 1: Redux Thunk là gì?

**Redux Thunk** là một middleware cho Redux cho phép viết các action creators trả về một **function** thay vì một action object.

### Vai trò trong xử lý tác vụ bất đồng bộ:
- Cho phép **delay việc dispatch action** cho đến khi nhận được kết quả từ API
- Có thể **dispatch nhiều actions** trong một async thunk (pending, fulfilled, rejected)
- Truy cập được `dispatch` và `getState` để tương tác với Redux store

### Tại sao không thể thực hiện trực tiếp trong Reducer?

**Reducers phải là pure functions:**
1. **Không có side effects** - Reducers chỉ được tính toán state mới dựa trên state cũ và action
2. **Đồng bộ** - Reducers phải return ngay lập tức, không được chứa logic bất đồng bộ
3. **Predictable** - Với cùng input, phải luôn trả về cùng output

```javascript
// ❌ SAI - Không được làm trong reducer
function reducer(state, action) {
  fetch('/api/data').then(data => ...); // Side effect!
  return newState;
}

// ✅ ĐÚNG - Sử dụng Redux Thunk
const fetchData = () => async (dispatch) => {
  dispatch({ type: 'FETCH_PENDING' });
  try {
    const data = await fetch('/api/data');
    dispatch({ type: 'FETCH_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_ERROR', payload: error });
  }
};
```

---

## Câu 2: 3 ưu điểm chính của Redux Toolkit (RTK)

### 1. **Giảm Boilerplate Code**
- Không cần định nghĩa action types, action creators riêng biệt
- `createSlice` tự động tạo actions và reducers
- Giảm 70-80% code so với Redux thuần

```javascript
// Redux thuần: ~30 dòng code
const INCREMENT = 'INCREMENT';
const increment = () => ({ type: INCREMENT });
function counterReducer(state = 0, action) { ... }

// RTK: ~10 dòng code
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1
  }
});
```

### 2. **Immutability tự động với Immer**
- Có thể "mutate" state trực tiếp (thực ra dùng Immer bên trong)
- Không cần spread operator `...`, Object.assign()
- Code dễ đọc, ít lỗi hơn

```javascript
// Redux thuần
return {
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      name: action.payload
    }
  }
};

// RTK - Đơn giản hơn nhiều!
state.user.profile.name = action.payload;
```

### 3. **Tích hợp sẵn Best Practices**
- **Redux DevTools** - Tự động cấu hình
- **Redux Thunk** - Đã tích hợp sẵn
- **createAsyncThunk** - Xử lý async logic chuẩn chỉnh
- **configureStore** - Setup middleware, enhancers tự động

---

## Câu 3: createSlice vs createReducer

### **createReducer:**
- Chỉ tạo **reducer function**
- Cần định nghĩa action types và action creators riêng
- Linh hoạt hơn nhưng verbose hơn

```javascript
const increment = createAction('counter/increment');

const counterReducer = createReducer(0, (builder) => {
  builder.addCase(increment, (state) => state + 1);
});
```

### **createSlice:**
- Tạo **cả reducer VÀ action creators** cùng lúc
- Tự động generate action types từ tên slice + reducer name
- Gom logic liên quan vào 1 chỗ (co-location)

```javascript
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1
  }
});

// Tự động có: counterSlice.actions.increment, counterSlice.reducer
```

### **Tại sao createSlice được khuyến khích?**

✅ **DRY Principle** - Không lặp lại code  
✅ **Co-location** - Logic liên quan ở cùng 1 nơi  
✅ **Type-safe** - Dễ tích hợp TypeScript  
✅ **Less boilerplate** - Ít code hơn, ít bugs hơn  
✅ **Convention over configuration** - Theo best practices mặc định

---

## Câu 4: Async Thunk cho Payments - Hoàn tiền (Refund)

### Khai báo createAsyncThunk:

```javascript
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const refundPayment = createAsyncThunk(
  'payments/refund',
  async (paymentId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/payments/${paymentId}/refund`);
      return response.data; // payload cho fulfilled
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
```

### 3 trạng thái (states) được tạo ra:

#### 1. **`pending`** - Đang xử lý
- **Khi nào:** Action được dispatch, trước khi async function hoàn thành
- **Action type:** `'payments/refund/pending'`
- **Sử dụng:** Hiển thị loading spinner, disable buttons

```javascript
extraReducers: (builder) => {
  builder.addCase(refundPayment.pending, (state) => {
    state.isLoading = true;
    state.error = null;
  });
}
```

#### 2. **`fulfilled`** - Thành công
- **Khi nào:** Async function return thành công
- **Action type:** `'payments/refund/fulfilled'`
- **Payload:** Giá trị được return từ async function
- **Sử dụng:** Cập nhật state với data mới, hiển thị thông báo thành công

```javascript
builder.addCase(refundPayment.fulfilled, (state, action) => {
  state.isLoading = false;
  const index = state.list.findIndex(p => p.id === action.payload.id);
  if (index !== -1) {
    state.list[index] = action.payload; // Cập nhật payment đã refund
  }
});
```

#### 3. **`rejected`** - Thất bại
- **Khi nào:** Async function throw error hoặc rejectWithValue()
- **Action type:** `'payments/refund/rejected'`
- **Payload:** Error message hoặc custom error từ rejectWithValue
- **Sử dụng:** Hiển thị error message, log lỗi

```javascript
builder.addCase(refundPayment.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload || action.error.message;
});
```

---

## Câu 5: User State Initialization

```javascript
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  isLoading: false,
  error: null
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Các reducers sẽ được định nghĩa ở đây
  }
});

export default usersSlice.reducer;
export const { } = usersSlice.actions;
```

### Giải thích cấu trúc state:

- **`list: []`** - Mảng chứa danh sách users
- **`isLoading: false`** - Trạng thái loading (dùng cho UI spinner)
- **`error: null`** - Lưu error message nếu có lỗi xảy ra

---

## Tổng kết

Lab 6 này giúp hiểu:
- Redux Thunk middleware và tại sao cần nó
- Ưu điểm vượt trội của Redux Toolkit
- Sự khác biệt giữa createSlice và createReducer
- Cách xử lý async actions với createAsyncThunk
- Cấu trúc state chuẩn cho Redux Toolkit

**Next:** Áp dụng vào bài tập thực hành Users và Payments!
