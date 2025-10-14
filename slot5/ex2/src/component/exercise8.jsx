import React, { useState } from "react";

export default function Exercise8() {
  // Controlled form state
  const [form, setForm] = useState({
    name: "",
    address: "",
    from: "Hà Nội",
    to: "Hà Nội",
    roundTrip: false,
    passengers: 1,
    budget: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleCheckbox(e) {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  }

  function validate() {
    const err = {};
    if (!form.name || form.name.trim().length < 5) {
      err.name = "Họ tên phải có ít nhất 5 ký tự.";
    }
    if (!form.address || form.address.trim().length < 5) {
      err.address = "Địa chỉ nên có ít nhất 5 ký tự.";
    }
    if (form.from === form.to) {
      err.route = "Nơi đi và nơi đến không nên trùng nhau.";
    }
    if (Number(form.passengers) <= 0) {
      err.passengers = "Số hành khách phải lớn hơn 0.";
    }
    return err;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      setSubmitted({ ...form, submittedAt: new Date().toISOString() });
    } else {
      setSubmitted(null);
    }
  }

  const selectOptions = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Hải Phòng"];

  return (
    <div style={{ maxWidth: 720, margin: "12px auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Exercise 8 — Form Control Demo</h1>

      <form onSubmit={handleSubmit} noValidate style={{ border: "1px solid #ddd", padding: 18, borderRadius: 6 }}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontWeight: 600 }}>Họ tên</label>
          {/* input-group: prepend icon + input + append currency example */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ padding: "8px 10px", background: "#f0f0f0", border: "1px solid #ddd", borderRight: "none", borderRadius: "4px 0 0 4px" }}>👤</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Họ tên"
              style={{ flex: 1, padding: 8, border: "1px solid #ddd", borderRadius: "0 4px 4px 0" }}
            />
            <span style={{ marginLeft: 8, padding: "8px 10px", background: "#fff", border: "1px solid #ddd", borderRadius: 4 }}>vnd</span>
          </div>
          <small style={{ color: "#888" }}>Phải nhập 5 ký tự, in hoa khi cần...</small>
          {errors.name && <div style={{ color: "#b42", marginTop: 6 }}>{errors.name}</div>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontWeight: 600 }}>Địa chỉ</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Địa chỉ"
            style={{ width: "100%", padding: 8, border: "1px solid #ddd", borderRadius: 4 }}
          />
          {errors.address && <div style={{ color: "#b42", marginTop: 6 }}>{errors.address}</div>}
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontWeight: 600 }}>Đi từ</label>
            <select name="from" value={form.from} onChange={handleChange} style={{ width: "100%", padding: 8, borderRadius: 4 }}>
              {selectOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontWeight: 600 }}>Đến</label>
            <select name="to" value={form.to} onChange={handleChange} style={{ width: "100%", padding: 8, borderRadius: 4 }}>
              {selectOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>
        {errors.route && <div style={{ color: "#b42", marginBottom: 12 }}>{errors.route}</div>}

        <fieldset style={{ marginBottom: 12, padding: 8, borderRadius: 4, border: "1px dashed #e8e8e8" }}>
          <legend style={{ fontWeight: 600 }}>Chọn chiều đi (Khứ hồi)</legend>
          <label style={{ display: "inline-flex", alignItems: "center", gap: 6, marginRight: 12 }}>
            <input type="checkbox" name="roundTrip" checked={form.roundTrip} onChange={handleCheckbox} /> Đi
          </label>
          <label style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <input type="checkbox" name="roundTrip" checked={form.roundTrip} onChange={(e) => setForm((p) => ({ ...p, roundTrip: !p.roundTrip }))} /> Về
          </label>
        </fieldset>

        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontWeight: 600 }}>Hành khách</label>
            <input type="number" name="passengers" value={form.passengers} min={1} onChange={handleChange} style={{ width: "100%", padding: 8, borderRadius: 4 }} />
            {errors.passengers && <div style={{ color: "#b42", marginTop: 6 }}>{errors.passengers}</div>}
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontWeight: 600 }}>Ngân sách (tùy chọn)</label>
            <input name="budget" value={form.budget} onChange={handleChange} placeholder="ví dụ: 200000" style={{ width: "100%", padding: 8, borderRadius: 4 }} />
          </div>
        </div>

        <button type="submit" style={{ background: "#0d6efd", color: "white", border: "none", padding: "10px 16px", borderRadius: 6, width: "100%" }}>
          Đặt vé
        </button>
      </form>

      <section style={{ marginTop: 18 }}>
        <h3>Live preview / Result</h3>
        {submitted ? (
          <div style={{ background: "#f6ffef", border: "1px solid #e1f5c4", padding: 12, borderRadius: 6 }}>
            <strong>Submitted at:</strong> {new Date(submitted.submittedAt).toLocaleString()}<br />
            <pre style={{ whiteSpace: "pre-wrap", marginTop: 8 }}>{JSON.stringify(submitted, null, 2)}</pre>
          </div>
        ) : (
          <div style={{ color: "#666" }}>Chưa có dữ liệu gửi — điền form ở trên và nhấn "Đặt vé" để gửi.</div>
        )}

        <div style={{ marginTop: 12 }}>
          <h4>Current form state</h4>
          <pre style={{ background: "#f8f8f8", padding: 12, borderRadius: 6 }}>{JSON.stringify(form, null, 2)}</pre>
        </div>
      </section>
    </div>
  );
}
