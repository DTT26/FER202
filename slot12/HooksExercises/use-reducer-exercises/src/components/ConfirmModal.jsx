import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';

function ConfirmModal({ show, onHide, onConfirm, onCancel, title, message, type, confirmText, cancelText, showCancel, confirmVariant, cancelVariant }) {
  const getIconAndColor = () => {
    switch (type) {
      case 'warning':
        return { icon: FaExclamationTriangle, color: '#ffc107' };
      case 'success':
        return { icon: FaCheckCircle, color: '#28a745' };
      case 'danger':
        return { icon: FaTimesCircle, color: '#dc3545' };
      default:
        return { icon: FaInfoCircle, color: '#17a2b8' };
    }
  };

  const { icon: Icon, color } = getIconAndColor();

  return (
    <Modal 
      show={show} 
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center">
          <Icon 
            className="me-2" 
            style={{ color }} 
            size={20}
          />
          {title}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <div className="d-flex align-items-start">
          <Icon 
            className="me-3 mt-1" 
            style={{ color }} 
            size={24}
          />
          <div className="flex-grow-1">
            <p className="mb-0">{message}</p>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <div className="d-flex gap-2 w-100">
          {showCancel && (
            <Button 
              variant={cancelVariant}
              onClick={onCancel || onHide}
              className="flex-grow-1"
            >
              {cancelText}
            </Button>
          )}
          <Button 
            variant={confirmVariant}
            onClick={onConfirm || onHide}
            className="flex-grow-1"
          >
            {confirmText}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
