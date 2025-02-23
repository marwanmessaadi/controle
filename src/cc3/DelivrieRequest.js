import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Form, Button, Table, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TestMap from './GoogleMaps';
import './DeliveryRequests.css'; // Import the custom CSS file

const DeliveryRequests = () => {
  const { user } = useSelector(state => state.auth);
  const [requests, setRequests] = useState(JSON.parse(localStorage.getItem('requests')) || []);
  const [description, setDescription] = useState('');
  const [startAddress, setStartAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [deliveryCoordinates, setDeliveryCoordinates] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = { 
      client: user.email, 
      description, 
      status: 'En attente', 
      startAddress, 
      destinationAddress,
      deliveryCoordinates
    };
    const updatedRequests = [...requests, newRequest];

    setRequests(updatedRequests);
    localStorage.setItem('requests', JSON.stringify(updatedRequests));
    setDescription('');
    setStartAddress('');
    setDestinationAddress('');
    setDeliveryCoordinates(null);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <h2 className="text-center mb-4">Demandes de Livraison</h2>

          {user.role === 'client' && (
            <Form onSubmit={handleSubmit} className="mb-4">
              <Form.Group className="mb-3">
                <Form.Label>Description du colis</Form.Label>
                <Form.Control 
                  type="text" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  required 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Adresse de départ</Form.Label>
                <Form.Control 
                  type="text" 
                  value={startAddress} 
                  onChange={(e) => setStartAddress(e.target.value)} 
                  required 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Adresse de destination</Form.Label>
                <Form.Control 
                  type="text" 
                  value={destinationAddress} 
                  onChange={(e) => setDestinationAddress(e.target.value)} 
                  required 
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100">Poster</Button>
            </Form>
          )}

          <Table striped bordered hover className="mt-4">
            <thead className="table-dark">
              <tr>
                <th>Client</th>
                <th>Description</th>
                <th>Statut</th>
                <th>Adresse de départ</th>
                <th>Adresse de destination</th>
                <th>Coordonnées de livraison</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.filter(req => req.status !== 'Rejeté').map((req, index) => (
                <tr key={index}>
                  <td>{req.client}</td>
                  <td>{req.description}</td>
                  <td>{req.status}</td>
                  <td>{req.startAddress}</td>
                  <td>{req.destinationAddress}</td>
                  <td>{req.deliveryCoordinates ? `${req.deliveryCoordinates[0]}, ${req.deliveryCoordinates[1]}` : 'N/A'}</td>
                  <td>
                    <Link to={`/delivery-request/${index}`} className="btn btn-info btn-sm">Voir les détails</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md={4}>
          <TestMap setDeliveryCoordinates={setDeliveryCoordinates} />
        </Col>
      </Row>
    </Container>
  );
};

export default DeliveryRequests;
