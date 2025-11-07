import React, { useMemo, useState } from 'react';
import { Table, Button, Image, Modal } from 'react-bootstrap';
import ConfirmModal from './ConfirmModal';

const UserTable = ({ users = [], filter = {}, onUpdateUser }) => {
  const [detailUser, setDetailUser] = useState(null);
  const [confirmBan, setConfirmBan] = useState(null);

  const filtered = useMemo(() => {
    let list = [...users];
    const s = (filter.search || '').toLowerCase();
    if (s) {
      list = list.filter((u) => (u.username || '').toLowerCase().includes(s) || (u.fullName || '').toLowerCase().includes(s));
    }
    if (filter.role && filter.role !== 'all') list = list.filter((u) => u.role === filter.role);
    if (filter.status && filter.status !== 'all') list = list.filter((u) => u.status === filter.status);
    if (filter.sort) {
      list.sort((a, b) => {
        const k = filter.sort;
        const va = (a[k] || '').toString().toLowerCase();
        const vb = (b[k] || '').toString().toLowerCase();
        return va < vb ? -1 : va > vb ? 1 : 0;
      });
    }
    return list;
  }, [users, filter]);

  const handleBan = (user) => {
    setConfirmBan(user);
  };

  const confirmBanNow = async () => {
    if (!confirmBan) return;
    await onUpdateUser(confirmBan.id, { status: 'locked' });
    setConfirmBan(null);
  };

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Username</th>
            <th>Full name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td style={{ width: 80 }}>
                {u.avatar ? (
                  <Image
                    src={u.avatar}
                    roundedCircle
                    style={{ width: 40, height: 40, objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/avt1.jpg';
                    }}
                  />
                ) : (
                  <div style={{ width: 40, height: 40, background: '#ddd', borderRadius: '50%' }} />
                )}
              </td>
              <td>{u.username}</td>
              <td>{u.fullName}</td>
              <td>{u.role}</td>
              <td>{u.status}</td>
              <td>
                <Button size="sm" variant="info" className="me-2" onClick={() => setDetailUser(u)}>
                  View Details
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleBan(u)} disabled={u.status === 'locked'}>
                  Ban Account
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={!!detailUser} onHide={() => setDetailUser(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {detailUser && (
            <div className="text-center">
              {detailUser.avatar ? (
                <Image
                  src={detailUser.avatar}
                  roundedCircle
                  style={{ width: 96, height: 96, objectFit: 'cover', marginBottom: 12 }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/avt1.jpg';
                  }}
                />
              ) : (
                <div style={{ width: 96, height: 96, background: '#ddd', borderRadius: '50%', margin: '0 auto 12px' }} />
              )}

              <div className="text-start">
                <p>
                  <strong>ID:</strong> {detailUser.id}
                </p>
                <p>
                  <strong>Username:</strong> {detailUser.username}
                </p>
                <p>
                  <strong>Full name:</strong> {detailUser.fullName}
                </p>
                <p>
                  <strong>Role:</strong> {detailUser.role}
                </p>
                <p>
                  <strong>Status:</strong> {detailUser.status}
                </p>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      <ConfirmModal
        show={!!confirmBan}
        title="Confirm Ban"
        message={`Are you sure you want to ban account ${confirmBan?.username}? This will set status to locked.`}
        onConfirm={confirmBanNow}
        onHide={() => setConfirmBan(null)}
      />
    </>
  );
};

export default UserTable;
