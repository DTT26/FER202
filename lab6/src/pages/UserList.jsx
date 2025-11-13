import React, { useEffect, useState } from 'react';
import NavigationHeader from '../components/NavigationHeader';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';
import * as api from '../services/api';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({ search: '', role: 'all', status: 'all', sort: 'username' });
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { user: currentUser, setUser } = useAuth();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.getUsers();
        setUsers(data || []);
      } catch (err) {
        console.error('Failed to load users', err);
      }
    };
    load();
  }, []);

  const handleFilterChange = (f) => {
    setFilter(f);
  };

  const handleUpdateUser = async (id, patch) => {
    try {
      const updated = await api.updateUser(id, patch);
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updated } : u)));
        // if we updated the currently logged-in user, sync auth context/localStorage
        if (currentUser && currentUser.id === updated.id) {
          try {
            setUser(updated);
          } catch (e) {}
        }
      showToast({ title: 'Updated', message: `User ${updated.username} updated`, bg: 'success' });
    } catch (err) {
      console.error('Update failed', err);
      showToast({ title: 'Error', message: 'Failed to update user', bg: 'danger' });
    }
  };

  return (
    <>
      <NavigationHeader />
      <Container className="mt-4">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 className="mb-0">User Management</h4>
          <div>
            <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => navigate('/home')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
        <UserFilter onChange={handleFilterChange} initial={filter} />
        <UserTable users={users} filter={filter} onUpdateUser={handleUpdateUser} />
      </Container>
    </>
  );
};

export default UserList;
