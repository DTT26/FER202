// Multi-step Wizard Component for Profile Creation

import React, { useState } from 'react';
import { Modal, Button, Form, ProgressBar, InputGroup } from 'react-bootstrap';

export default function Wizard({ onClose }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    avatar: null,
    username: '',
    password: '',
    confirm: '',
    secretQuestion: "What is your first pet's name?",
    answer: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const steps = ['About', 'Account', 'Address'];

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === 'file' ? (files && files[0] ? files[0] : null) : value;
    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const validateStep = (stepIndex) => {
    const newErrors = {};
    
    if (stepIndex === 0) {
      if (!formData.firstName || formData.firstName.trim() === '') newErrors.firstName = 'First name is required';
      if (!formData.lastName || formData.lastName.trim() === '') newErrors.lastName = 'Last name is required';
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email is required';
      if (!formData.phone || formData.phone.trim() === '') newErrors.phone = 'Phone is required';
      if (!formData.age || formData.age.trim() === '') newErrors.age = 'Age is required';
    }
    
    if (stepIndex === 1) {
      if (!formData.username || formData.username.trim() === '') newErrors.username = 'Username is required';
      if (!formData.password) newErrors.password = 'Password is required';
      if (!formData.confirm) newErrors.confirm = 'Confirm password is required';
      if (formData.password && formData.confirm && formData.password !== formData.confirm) {
        newErrors.confirm = 'Passwords do not match';
      }
      if (!formData.answer || formData.answer.trim() === '') newErrors.answer = 'Answer is required';
    }
    
    if (stepIndex === 2) {
      if (!formData.street || formData.street.trim() === '') newErrors.street = 'Street is required';
      if (!formData.city || formData.city.trim() === '') newErrors.city = 'City is required';
      if (!formData.state || formData.state.trim() === '') newErrors.state = 'State is required';
      if (!formData.zip || formData.zip.trim() === '') newErrors.zip = 'Zip code is required';
      if (!formData.country || formData.country.trim() === '') newErrors.country = 'Country is required';
    }
    
    return newErrors;
  };

  const nextStep = () => {
    const validationErrors = validateStep(step);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      if (step < steps.length - 1) {
        setStep(step + 1);
      }
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleFinish = () => {
    const validationErrors = validateStep(step);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      alert('Profile created successfully!\n' + JSON.stringify(formData, null, 2));
      if (onClose) onClose();
    }
  };

  const getProgress = () => {
    const progressValues = [33, 67, 100];
    return progressValues[step] || 0;
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <h5 className="mb-3">
              <i className="bi bi-person-circle me-2"></i>
              About Information
            </h5>
            <Form.Group className="mb-3">
              <Form.Label>First Name *</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-person"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  isInvalid={!!errors.firstName}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Last Name *</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-person-fill"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                  isInvalid={!!errors.lastName}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-envelope"></i>
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  isInvalid={!!errors.email}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Phone *</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-telephone"></i>
                </InputGroup.Text>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  isInvalid={!!errors.phone}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Age *</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-calendar-event"></i>
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Enter age"
                  isInvalid={!!errors.age}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.age}
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Avatar</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-image"></i>
                </InputGroup.Text>
                <Form.Control
                  type="file"
                  name="avatar"
                  onChange={handleInputChange}
                  accept="image/*"
                />
              </InputGroup>
            </Form.Group>
          </div>
        );

      case 1:
        return (
          <div>
            <h5 className="mb-3">
              <i className="bi bi-lock me-2"></i>
              Account Information
            </h5>
            
            <Form.Group className="mb-3">
              <Form.Label>Username *</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-person-badge"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Password *</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-key"></i>
                </InputGroup.Text>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  isInvalid={!!errors.password}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </Button>
              </InputGroup>
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password *</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-key"></i>
                </InputGroup.Text>
                <Form.Control
                  type={showConfirm ? 'text' : 'password'}
                  name="confirm"
                  value={formData.confirm}
                  onChange={handleInputChange}
                  placeholder="Confirm password"
                  isInvalid={!!errors.confirm}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  <i className={`bi ${showConfirm ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </Button>
              </InputGroup>
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.confirm}
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Secret Question *</Form.Label>
              <Form.Select
                name="secretQuestion"
                value={formData.secretQuestion}
                onChange={handleInputChange}
              >
                <option>What is your first pet's name?</option>
                <option>What is your mother's maiden name?</option>
                <option>What was your first car?</option>
                <option>What city were you born in?</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Answer *</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-question-circle"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="answer"
                  value={formData.answer}
                  onChange={handleInputChange}
                  placeholder="Enter your answer"
                  isInvalid={!!errors.answer}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.answer}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        );

      case 2:
        return (
          <div>
            <h5 className="mb-3">
              <i className="bi bi-geo-alt me-2"></i>
              Address Information
            </h5>
            
            <Form.Group className="mb-3">
              <Form.Label>Street *</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-signpost"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  placeholder="Enter street address"
                  isInvalid={!!errors.street}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.street}
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>City *</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-building"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                  isInvalid={!!errors.city}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.city}
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>State *</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-map"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Enter state"
                  isInvalid={!!errors.state}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.state}
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Zip Code *</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-mailbox"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  placeholder="Enter zip code"
                  isInvalid={!!errors.zip}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.zip}
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Country *</Form.Label>
              <Form.Select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                isInvalid={!!errors.country}
              >
                <option value="">Select country</option>
                <option value="vietnam">Vietnam</option>
                <option value="usa">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="canada">Canada</option>
                <option value="australia">Australia</option>
                <option value="other">Other</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.country}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Modal show={true} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-person-circle me-2"></i>
          Build Your Profile
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <div className="mb-4">
          <div className="d-flex justify-content-between mb-2">
            <small>Progress</small>
            <small>{getProgress()}%</small>
          </div>
          <ProgressBar 
            now={getProgress()} 
            variant="info" 
            striped 
            animated
            style={{ height: '20px' }}
          />
        </div>

        <div className="mb-3">
          <div className="d-flex">
            {steps.map((stepName, index) => (
              <div 
                key={stepName}
                className={`flex-fill text-center p-2 ${index === step ? 'bg-primary text-white' : 'bg-light'} ${index === 0 ? 'rounded-start' : index === steps.length - 1 ? 'rounded-end' : ''}`}
              >
                <i className={`bi ${index === 0 ? 'bi-person-circle' : index === 1 ? 'bi-lock' : 'bi-geo-alt'} me-1`}></i>
                {stepName}
              </div>
            ))}
          </div>
        </div>

        {renderStepContent()}
      </Modal.Body>
      
      <Modal.Footer>
        <Button 
          variant="secondary" 
          onClick={prevStep}
          disabled={step === 0}
        >
          Previous
        </Button>
        
        {step < steps.length - 1 ? (
          <Button variant="primary" onClick={nextStep}>
            Next
          </Button>
        ) : (
          <Button variant="success" onClick={handleFinish}>
            Finish
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}