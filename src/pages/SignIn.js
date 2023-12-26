import React from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';
import Header from "../components/Header"

function SignIn() {
  return (
    <div>
      <Header />
      <div className="signin-container">
        <h1>Sign In</h1>
        <form className="signin-form">
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
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
