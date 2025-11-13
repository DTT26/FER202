# Lab 6: Redux Toolkit - Hướng Dẫn Sử Dụng

## 📚 Mục Lục

1. [Giới thiệu](#giới-thiệu)
2. [Cài đặt](#cài-đặt)
3. [Cấu trúc Project](#cấu-trúc-project)
4. [Hướng dẫn chạy](#hướng-dẫn-chạy)
5. [Tính năng](#tính-năng)
6. [Demo Pages](#demo-pages)

---

## 🎯 Giới thiệu

Lab 6 này demo đầy đủ các tính năng của **Redux Toolkit**:

- ✅ **Redux Thunk** - Xử lý async operations
- ✅ **createSlice** - Tạo reducers và actions
- ✅ **createAsyncThunk** - Xử lý async actions (pending, fulfilled, rejected)
- ✅ **Reselect Selectors** - Memoized selectors
- ✅ **Synchronous + Asynchronous Reducers**
- ✅ **Error Handling** - rejectWithValue

---

## 📦 Cài đặt

```bash
# Cài đặt dependencies
npm install

# Packages được cài:
# - @reduxjs/toolkit
# - react-redux
# - reselect
```

---

## 📁 Cấu trúc Project

```
src/
├── redux/
│   ├── store.js                    # Redux Store configuration
│   └── slices/
│       ├── usersSlice.js          # Users state management
│       └── paymentsSlice.js       # Payments state management
│
├── components/
│   ├── UserManagement.jsx         # Demo Users với Redux
│   └── PaymentManagement.jsx      # Demo Payments với Redux
│
├── pages/
│   └── ReduxDashboard.jsx         # Dashboard chính
│
└── App.js                          # Redux Provider setup
```

---

## 🚀 Hướng dẫn chạy

### Bước 1: Chạy JSON Server (Terminal 1)

```bash
npm run serve:json
```

- Port: **3001**
- API Endpoints:
  - `GET/POST http://localhost:3001/users`
  - `GET/POST http://localhost:3001/payments`

### Bước 2: Chạy React App (Terminal 2)

```bash
npm start
```

- Port: **3000**
- URL: `http://localhost:3000`

### Bước 3: Truy cập Demo

1. **Redux Dashboard:** `http://localhost:3000/redux`
2. **User Management:** `http://localhost:3000/users/redux`
3. **Payment Management:** `http://localhost:3000/payments/redux`

---

## ✨ Tính năng

### 1️⃣ User Management (Bài tập 1)

**File:** `src/redux/slices/usersSlice.js`

#### ✅ Async Thunks

- `fetchUsers` - Lấy danh sách users từ API
- `createUser` - Tạo user mới
- `updateUser` - Cập nhật user
- `deleteUser` - Xóa user

#### ✅ Synchronous Reducers

- `toggleAdminStatus` - Toggle role admin/user
- `toggleUserStatus` - Thay đổi status
- `clearError` - Xóa error message

#### ✅ Selectors

```javascript
selectAllUsers              // Lấy tất cả users
selectUsersLoading          // Loading state
selectUsersError            // Error state
selectUsersByRole(role)     // Filter theo role
selectUsersByStatus(status) // Filter theo status
selectUserById(userId)      // Lấy user theo ID
```

---

### 2️⃣ Payment Management (Bài tập 2)

**File:** `src/redux/slices/paymentsSlice.js`

#### ✅ Async Thunks

- `fetchPayments` - Lấy danh sách payments
- `createPayment` - **Tạo payment mới** (Bài tập 2.1)
  - Xử lý lỗi 402: "Tài khoản không đủ tiền" (Bài tập 2.2)
- `refundPayment` - **Hoàn tiền** (Câu 4)
  - 3 trạng thái: pending, fulfilled, rejected

#### ✅ Reselect Selectors (Bài tập 2.3)

```javascript
selectSuccessfulPayments       // Filter payments có status: 'SUCCESS'
selectTotalAmount              // Tổng tiền tất cả payments
selectSuccessfulTotalAmount    // Tổng tiền payments SUCCESS
selectPaymentsByUserId(userId) // Filter theo userId
selectPaymentsBySemester(sem)  // Filter theo semester
```

---

## 🖥️ Demo Pages

### 1. Redux Dashboard (`/redux`)

- Trang chủ giới thiệu các demo
- Links đến User Management và Payment Management
- Hướng dẫn sử dụng

### 2. User Management (`/users/redux`)

**Tính năng:**

- ✅ Hiển thị danh sách users
- ✅ Filter theo role (All, Admin, User)
- ✅ Toggle Admin Status (click button)
- ✅ Thống kê số users, số admin
- ✅ Loading spinner khi fetch data
- ✅ Error handling

**Demo:**

- Async Thunk: `fetchUsers`
- Sync Reducer: `toggleAdminStatus`
- Selectors: `selectAllUsers`, `selectUsersByRole`

### 3. Payment Management (`/payments/redux`)

**Tính năng:**

- ✅ Hiển thị danh sách payments
- ✅ Tạo payment mới (form)
- ✅ Refund payment
- ✅ Thống kê: Tổng payments, Successful, Tổng tiền
- ✅ Error handling (402: Tài khoản không đủ tiền)

**Demo:**

- Async Thunk: `createPayment`, `refundPayment`
- Reselect: `selectSuccessfulPayments`, `selectTotalAmount`
- Error handling: `rejectWithValue`

---

## 🔧 Redux DevTools

### Cài đặt Extension

- **Chrome:** [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- **Firefox:** [Redux DevTools](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)

### Sử dụng

1. Mở Redux DevTools trong browser
2. Xem **Actions** được dispatch
3. Xem **State changes** theo thời gian
4. Time-travel debugging

### Actions bạn sẽ thấy:

```
users/fetchUsers/pending
users/fetchUsers/fulfilled
users/toggleAdminStatus

payments/createPayment/pending
payments/createPayment/fulfilled
payments/createPayment/rejected (nếu lỗi 402)

payments/refund/pending
payments/refund/fulfilled
payments/refund/rejected
```

---

## 📝 Câu hỏi lý thuyết (Câu 1-5)

Xem file **`LAB6_ANSWERS.md`** để đọc chi tiết câu trả lời:

1. Redux Thunk là gì? Tại sao cần?
2. 3 ưu điểm của Redux Toolkit
3. createSlice vs createReducer
4. Async Thunk cho Refund Payment
5. User State Initialization

---

## 📖 Tài liệu tham khảo

- [Redux Toolkit Official Docs](https://redux-toolkit.js.org/)
- [Redux Thunk](https://github.com/reduxjs/redux-thunk)
- [Reselect](https://github.com/reduxjs/reselect)
- [createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk)

---

## 🎓 Kết luận

Lab 6 này đã demo đầy đủ:

✅ **Bài tập 1:** User Management với createAsyncThunk + Sync Reducers  
✅ **Bài tập 2:** Payment Management với error handling + Reselect  
✅ **Câu 4:** refundPayment với 3 trạng thái  
✅ **Câu 5:** User state initialization

**Chúc bạn học tốt! 🚀**
