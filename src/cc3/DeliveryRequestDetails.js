import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';

const DeliveryRequestDetails = () => {
  const { id } = useParams();
  const requests = JSON.parse(localStorage.getItem('requests')) || [];
  const request = requests[id];

  if (!request) {
    return <Container className="mt-5">Request not found</Container>;
  }

  return (
    <Container className="mt-5">
      <h2>Details de la Demande de Livraison</h2>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <th>Client</th>
            <td>{request.client}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{request.description}</td>
          </tr>
          <tr>
            <th>Statut</th>
            <td>{request.status}</td>
          </tr>
          <tr>
            <th>Adresse de départ</th>
            <td>{request.startAddress}</td>
          </tr>
          <tr>
            <th>Adresse de destination</th>
            <td>{request.destinationAddress}</td>
          </tr>
          <tr>
            <th>Coordonnées de livraison</th>
            <td>{request.deliveryCoordinates ? `${request.deliveryCoordinates[0]}, ${request.deliveryCoordinates[1]}` : 'N/A'}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default DeliveryRequestDetails;