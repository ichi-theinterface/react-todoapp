import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';
import Header from "../components/Header"
import { signUp } from '../utilities/apiService';

function SignUp() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
      setUserData({...userData, [e.target.name]: e.target.value});
  }
  
  const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          const data = await signUp(userData); // Use the signUp function from apiService
          console.log('User created:', data);
          // Handle success (e.g., show message, redirect, etc.)
      } catch (error) {
          console.error('Error creating user:', error);
          // Handle errors (e.g., show error message)
      }
  }

  return (
    <div>
      <Header />
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="username" 
            value={userData.username} 
            onChange={handleChange} 
            placeholder="Username" 
            required 
          />
          <input 
            type="email" 
            name="email" 
            value={userData.email} 
            onChange={handleChange} 
            placeholder="Email" 
            required 
          />
          <input 
            type="password" 
            name="password" 
            value={userData.password} 
            onChange={handleChange} 
            placeholder="Password" 
            required 
          />
          <input 
            type="password" 
            name="confirmPassword" 
            onChange={handleChange} 
            placeholder="Confirm Password" 
            required 
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
