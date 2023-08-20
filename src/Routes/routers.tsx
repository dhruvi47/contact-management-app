
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import ContactsPage from '../components/ContactsPage';
import ChartsAndMapsPage from '../pages/ChartsAndMapsPage';

const AppRoutes: React.FC = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<ContactsPage />} />
            <Route path="/charts-maps" element={<ChartsAndMapsPage />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
};

export default AppRoutes;
