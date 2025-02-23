import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Dashbord.css';

const Dashboard = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <Container className=" mt-5">
      <h2 className="text-center">Bienvenue, {user?.email}</h2>
      <p className="text-center">Vous êtes connecté en tant que <strong>{user?.role}</strong>.</p>
      <div className="button-container mt-5">
        {user?.role === 'client' && (
          <Link to="/requests" className="btn btn-primary mt-3">Voir mes demandes de livraison</Link>
        )}

        {user?.role === 'livreur' && (
          <Link to="/requests" className="btn btn-success mt-3">Voir les demandes disponibles</Link>
        )}

        {user?.role === 'admin' && (
          <Link to="/admin" className="btn btn-info mt-3">Valider les livraisons</Link>
        )}

        <Link to="/map" className="btn btn-secondary mt-3">Voir la carte</Link>
      </div>
    </Container>
  );
};

export default Dashboard;
