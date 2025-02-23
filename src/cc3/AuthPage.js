import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, signupSuccess } from './authSlice';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css'; // Import the custom CSS file
import Home from './Home';

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', role: 'client' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === formData.email);

    if (userExists) {
      setError('User already exists');
      return;
    }

    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    dispatch(signupSuccess(formData));
    navigate('/dashboard');
  };

  const handleLogin = () => {
    dispatch(loginStart());
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === formData.email && user.password === formData.password);

    // Check for admin credentials
    if (formData.email === 'admin@gmail.com' && formData.password === '1234') {
      const adminUser = { email: 'admin@gmail.com', role: 'admin' };
      dispatch(loginSuccess(adminUser));
      navigate('/admin-dashboard');
    } else if (user) {
      dispatch(loginSuccess(user));
      navigate('/dashboard');
    } else {
      dispatch(loginFailure('Invalid credentials'));
      setError('Invalid credentials');
    }
  };

  return (
    <Container fluid className="auth-container">
      <Home />
      <Row className="justify-content-center align-items-center">
        <Col md={8}>
          <div className="card mb-3">
            <div className="row g-0 d-flex align-items-center">
              <div className="col-lg-4 d-none d-lg-flex">
                <img src="https://png.pngtree.com/thumb_back/fh260/back_our/20190619/ourmid/pngtree-courier-recruitment-poster-background-material-image_133159.jpg" alt="Trendy Pants and Shoes"
                  className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5" />
              </div>
              <div className="col-lg-8">
                <div className="card-body py-5 px-md-5">
                  <h2 className="text-center mb-4">{isSignup ? "Inscription" : "Connexion"}</h2>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" name="email" required onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Mot de passe</Form.Label>
                      <Form.Control type="password" name="password" required onChange={handleChange} />
                    </Form.Group>

                    {isSignup && (
                      <Form.Group className="mb-3">
                        <Form.Label>Type de compte</Form.Label>
                        <Form.Select name="role" onChange={handleChange}>
                          <option value="client">Client</option>
                          <option value="livreur">Livreur</option>
                        </Form.Select>
                      </Form.Group>
                    )}

                    <button type="submit" className="btn btn-primary btn-block w-100" >{isSignup ? "S'inscrire" : "Se connecter"}</button>
                  </Form>

                  <Button variant="link" onClick={() => setIsSignup(!isSignup)}>
                    {isSignup ? "Déjà un compte ? Se connecter" : "Créer un compte"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage;
