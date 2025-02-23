import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import AuthPage from './AuthPage';
import Dashboard from './Dashbord';
import AdminPanel from './AdminPanel';
import DeliveryRequests from './DelivrieRequest';
import TestMap from './GoogleMaps';
import PrivateRoute from './PrivateRoute';
import Navigation from './Navbar';
import DeliveryRequestDetails from './DeliveryRequestDetails';
import './App.css';
import Home from './Home';

function App() {
  const { user } = useSelector(state => state.auth);

  return (
    <div className="bg-image">
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route path='/home' element={<Home />} ></Route>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute adminOnly={true}><AdminPanel /></PrivateRoute>} />
          <Route path="/requests" element={<PrivateRoute><DeliveryRequests /></PrivateRoute>} />
          <Route path="/map" element={<TestMap />} />
          <Route path="*" element={user ? <Dashboard /> : <AuthPage />} />
          <Route path="/delivery-request/:id" element={<DeliveryRequestDetails />} />
        </Routes>
      </Router>
    </>
    </div>
  );
}

export default App;
