import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';
import Header from "../components/Header"
import { login } from '../utilities/apiService';

function SignIn() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
      setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const data = await login(credentials);
          console.log('Login successful:', data);
          localStorage.setItem('token', data.token);
          navigate('/dashboard');
      } catch (error) {
          console.error('Error during login:', error);
          // Handle errors (e.g., show error message)
      }
  }

  return (
    <div>
      <Header />
      <div className="signin-container">
        <h1>Sign In</h1>
        <form className="signin-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="username" 
            value={credentials.username} 
            onChange={handleChange} 
            placeholder="Username" 
            required 
          />
          <input 
            type="password" 
            name="password" 
            value={credentials.password} 
            onChange={handleChange} 
            placeholder="Password" 
            required 
          />
          <button type="submit">Sign In</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
