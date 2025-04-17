
import React from 'react';
import { Route } from 'react-router-dom';
import BrandStorefront from '../pages/brand/BrandStorefront';

// These routes should be imported and used in your main App.tsx file
const BrandRoutes = (
  <Route path="/brand/:brandSlug" element={<BrandStorefront />} />
);

export default BrandRoutes;
