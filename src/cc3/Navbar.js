import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './authSlice';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">         {/* nav btari9a akhera */}
      <Navbar.Brand as={Link} to="/"> Delivery App</Navbar.Brand>   {/* as={Link} to="/" 3la 7ssab ila bghiti tdir link */}
      <Nav className="ml-auto">
        {user ? (
          <>
            <Nav.Link as={Link} to="/dashboard"> Dashboard</Nav.Link>
            <Button variant="outline-light" onClick={() => dispatch(logout())}> Déconnexion</Button>
          </>
        ) : (
          <Nav.Link as={Link} to="/auth"> Connexion</Nav.Link>
        )}
      </Nav>

    </Navbar>
  );
};

export default Navigation;
