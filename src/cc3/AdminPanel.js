import React, { useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const AdminPanel = () => {
  const [requests, setRequests] = useState(JSON.parse(localStorage.getItem('requests')) || []);

  const handleApprove = (index) => {
    const updatedRequests = [...requests];
    updatedRequests[index].status = 'Approuve';
    setRequests(updatedRequests);
    localStorage.setItem('requests', JSON.stringify(updatedRequests));
  };

  const handleReject = (index) => {
    const updatedRequests = [...requests];
    updatedRequests[index].status = 'Rejete';
    setRequests(updatedRequests);
    localStorage.setItem('requests', JSON.stringify(updatedRequests));
  };

  return (
    <Container className="mt-5" key="admin-panel-container">                     {/* div btari9a akhera */}
      <h2>Validation des Livraisons</h2>
      <Table striped bordered hover className="mt-3">                 {/* table btari9a akhera */}
        <thead>
          <tr>
            <th>Client</th>
            <th>Description</th>
            <th>Statut</th>
            <th>address de livraison </th>
            <th>address de depart</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, index) => (
            <tr key={index}>
              <td>{req.client}</td>
              <td>{req.description}</td>
              <td>{req.status}</td>
              <td>{req.startAddress}</td>
              <td>{req.destinationAddress}</td>
              <td>
                <Button variant="info" onClick={() => handleApprove(index)}>✔</Button>{' '}
                <Button variant="danger" onClick={() => handleReject(index)}>✖</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminPanel;
