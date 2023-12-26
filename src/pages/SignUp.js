import React from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';
import Header from "../components/Header"

function SignUp() {
  return (
    <div>
      <Header />
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form className="signup-form">
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
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
