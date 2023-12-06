// src/App.js
import React from 'react';
import AdminPage from './AdminPage';
import UserPage from './UserPage.jsx';
import Contact from './contact.jsx';
const App = () => {
  return (
    <>
    
      <UserPage />
      <Contact/>
      <AdminPage/>
    </>
  );
};

export default App;
