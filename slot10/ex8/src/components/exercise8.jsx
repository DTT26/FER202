import React, { useState } from 'react';

export default function Exercise8() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    from: 'Hà Nội',
    to: 'Hà Nội',
    trip: 'one-way',
    outbound: false,
    inbound: false,
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const cities = ['Hà Nội','Hồ Chí Minh','Đà Nẵng','Huế','Khác'];

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function validate() {
    const err = {};
    if (!form.fullName || form.fullName.trim().length < 3) err.fullName = 'Phải nhập ít nhất 3 ký tự';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Email không hợp lệ';
    return err;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) {
      alert('Gửi form thành công:\n' + JSON.stringify(form, null, 2));
    }
  }

  return (
    <div className="exercise-container">
      <div className="top-alert">&nbsp;</div>
      <div className="form-card">
        <div className="form-title">Form đặt vé máy bay</div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label-compact">Họ tên</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-person" /></span>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                placeholder="Họ tên"
              />
              <span className="input-group-text input-suffix">vnd</span>
            </div>
            <div className="help-text">Phải nhập 5 ký tự, in hoa....</div>
          </div>

          <div className="mb-3">
            <label className="form-label-compact">Địa chỉ</label>
            <input name="address" value={form.address} onChange={handleChange} className="form-control" placeholder="" />
            <div className="help-text">Phải nhập 5 ký tự, in hoa....</div>
          </div>

          <div className="row mb-3">
            <div className="col-6">
              <label className="form-label-compact">Đi từ</label>
              <select name="from" value={form.from} onChange={handleChange} className="form-select">
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-6">
              <label className="form-label-compact">Đến</label>
              <select name="to" value={form.to} onChange={handleChange} className="form-select">
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label-compact">Chọn chiều đi (Khứ hồi)</label>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="outbound" name="outbound" checked={form.outbound} onChange={handleChange} />
              <label className="form-check-label" htmlFor="outbound">Đi</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="inbound" name="inbound" checked={form.inbound} onChange={handleChange} />
              <label className="form-check-label" htmlFor="inbound">Về</label>
            </div>
          </div>

          <div className="mb-3">
            <button type="submit" className="w-100 submit-btn">Đặt vé</button>
          </div>
        </form>
      </div>
    </div>
  );
}
