import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  toggleAdminStatus,
  selectAllUsers,
  selectUsersLoading,
  selectUsersError,
  selectUsersByRole,
} from '../redux/slices/usersSlice';
import { Container, Table, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { FaUserShield, FaUser, FaToggleOn, FaToggleOff } from 'react-icons/fa';

const UserManagement = () => {
  const dispatch = useDispatch();
  
  // Sử dụng selectors để lấy data từ Redux store
  const users = useSelector(selectAllUsers);
  const isLoading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);
  
  // Selector có tham số - lấy admin users
  const adminUsers = useSelector(selectUsersByRole('admin'));
  
  const [filterRole, setFilterRole] = useState('all');

  // Fetch users khi component mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Handler toggle admin status
  const handleToggleAdmin = (userId) => {
    dispatch(toggleAdminStatus(userId));
  };

  // Filter users theo role
  const filteredUsers = filterRole === 'all' 
    ? users 
    : users.filter(u => u.role === filterRole);

  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Đang tải danh sách người dùng...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">
        <FaUserShield className="me-2" />
        Quản Lý Người Dùng - Redux Toolkit Demo
      </h2>

      {error && (
        <Alert variant="danger" dismissible>
          {error}
        </Alert>
      )}

      {/* Statistics */}
      <div className="mb-3 p-3 bg-light rounded">
        <h5>Thống kê:</h5>
        <p className="mb-1">
          <strong>Tổng số người dùng:</strong> {users.length}
        </p>
        <p className="mb-0">
          <strong>Số Admin:</strong> {adminUsers.length}
        </p>
      </div>

      {/* Filter */}
      <div className="mb-3">
        <Button
          variant={filterRole === 'all' ? 'primary' : 'outline-primary'}
          size="sm"
          className="me-2"
          onClick={() => setFilterRole('all')}
        >
          Tất cả
        </Button>
        <Button
          variant={filterRole === 'admin' ? 'primary' : 'outline-primary'}
          size="sm"
          className="me-2"
          onClick={() => setFilterRole('admin')}
        >
          Admin
        </Button>
        <Button
          variant={filterRole === 'user' ? 'primary' : 'outline-primary'}
          size="sm"
          onClick={() => setFilterRole('user')}
        >
          User
        </Button>
      </div>

      {/* Users Table */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Họ tên</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                Không có người dùng nào
              </td>
            </tr>
          ) : (
            filteredUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.fullName}</td>
                <td>
                  <Badge bg={user.role === 'admin' ? 'danger' : 'info'}>
                    {user.role === 'admin' ? (
                      <>
                        <FaUserShield /> Admin
                      </>
                    ) : (
                      <>
                        <FaUser /> User
                      </>
                    )}
                  </Badge>
                </td>
                <td>
                  <Badge
                    bg={
                      user.status === 'active'
                        ? 'success'
                        : user.status === 'blocked'
                        ? 'danger'
                        : 'warning'
                    }
                  >
                    {user.status}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant={user.role === 'admin' ? 'warning' : 'success'}
                    size="sm"
                    onClick={() => handleToggleAdmin(user.id)}
                  >
                    {user.role === 'admin' ? (
                      <>
                        <FaToggleOff /> Revoke Admin
                      </>
                    ) : (
                      <>
                        <FaToggleOn /> Make Admin
                      </>
                    )}
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Note */}
      <Alert variant="info" className="mt-4">
        <h6>📝 Demo Features:</h6>
        <ul className="mb-0">
          <li>
            <strong>createAsyncThunk:</strong> Fetch users từ API (pending, fulfilled, rejected)
          </li>
          <li>
            <strong>Synchronous Reducer:</strong> Toggle Admin Status (click button)
          </li>
          <li>
            <strong>Selectors:</strong> selectAllUsers, selectUsersByRole
          </li>
          <li>
            <strong>extraReducers:</strong> Xử lý 3 trạng thái async
          </li>
        </ul>
      </Alert>
    </Container>
  );
};

export default UserManagement;
