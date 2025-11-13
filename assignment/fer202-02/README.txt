FER202-02 PRACTICAL EXAMINATION
Personal Budget Management Application
=========================================

INSTALLED PACKAGES:
-------------------
- react: ^18.3.1
- react-dom: ^18.3.1
- react-scripts: 5.0.1
- @reduxjs/toolkit: ^2.5.0
- react-redux: ^9.2.0
- react-router-dom: ^7.1.3
- bootstrap: ^5.3.3
- react-bootstrap: ^2.10.7
- bootstrap-icons: ^1.11.3
- axios: ^1.7.9
- json-server: ^1.0.0-beta.3

HOW TO RUN:
-----------

1. Install dependencies:
   npm install

2. Start JSON Server (in terminal 1):
   npx json-server --watch db.json --port 3001

3. Start React application (in terminal 2):
   npm start

4. Access the application:
   - Open browser at http://localhost:3000
   - Login with credentials from db.json:
     * Username: anhnv, Password: 123456
     * Username: TamNT, Password: 123456

FEATURES:
---------
- User authentication (login/logout)
- Add new expenses with validation
- Edit existing expenses
- Delete expenses with confirmation
- Filter expenses by category
- Real-time total calculation
- VND currency formatting (e.g., 2,720,000 ₫)
- Date format: DD-MM-YYYY
- Redux Toolkit for state management
- Responsive design with Bootstrap

PROJECT STRUCTURE:
------------------
src/
  components/       - Reusable UI components
  pages/            - Page components (Login, Home)
  redux/            - Redux store and slices
  services/         - API service layer
  
db.json             - JSON Server database

NOTES:
------
- Make sure JSON Server is running on port 3001 before starting the app
- The application uses Redux Toolkit for state management (requirement for 10/10)
- All CRUD operations update the backend (db.json) and Redux state in real-time
