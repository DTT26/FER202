// Account Management Page Component

import React, { useState } from 'react';
import Wizard from '../components/Wizard';
import { Container, Button, Card } from 'react-bootstrap';

export default function AccountPage({ onNavigate }) {
  const [showWizard, setShowWizard] = useState(false);

  return (
    <Container className="mt-5">
      <Card className="shadow">
        <Card.Body className="text-center py-5">
          <i className="bi bi-person-circle" style={{ fontSize: '5rem', color: '#007bff' }}></i>
          <h1 className="mb-3 mt-3">Account Management</h1>
          <p className="lead text-muted mb-4">
            Manage your personal information and account settings
          </p>
          
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => setShowWizard(true)}
            className="px-5"
          >
            <i className="bi bi-person-plus me-2"></i>
            Build Your Profile
          </Button>

          <div className="mt-4">
            <small className="text-muted">
              Click button phía trên để tạo profile mới với wizard 3 bước
            </small>
          </div>
        </Card.Body>
      </Card>

      {showWizard && <Wizard onClose={() => setShowWizard(false)} />}
    </Container>
  );
}