import React from 'react';

export default function BookingForm() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold text-white">Book Your Table</h2>
      </div>
      
      <form>
            <div className="row mb-4">
              <div className="col-md-4 mb-3">
                <input 
                  type="text" 
                  className="form-control py-3" 
                  placeholder="Your Name *"
                  style={{ backgroundColor: '#f5f5f5', border: 'none' }}
                />
              </div>
              <div className="col-md-4 mb-3">
                <input 
                  type="email" 
                  className="form-control py-3" 
                  placeholder="Your Email *"
                  style={{ backgroundColor: '#f5f5f5', border: 'none' }}
                />
              </div>
              <div className="col-md-4 mb-3">
                <select 
                  className="form-select py-3"
                  style={{ backgroundColor: '#f5f5f5', border: 'none' }}
                >
                  <option>Select a Service</option>
                  <option>Dine In</option>
                  <option>Take Away</option>
                  <option>Delivery</option>
                  <option>Catering</option>
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <textarea 
                className="form-control" 
                rows="6" 
                placeholder="Please write your comment"
                style={{ backgroundColor: '#f5f5f5', border: 'none', resize: 'none' }}
              ></textarea>
            </div>
            
            <div className="text-start">
              <button 
                type="submit" 
                className="btn btn-lg px-4 py-3 fw-bold text-dark"
                style={{ 
                  backgroundColor: 'yellow', 
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              >
                Send Message
              </button>
            </div>
          </form>
    </div>
  );
}