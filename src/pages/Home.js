import React from 'react';
import "./Home.css";
import Header from '../components/Header';

function Home() {
  return (
    <div>
      <Header />
      <h1 className="home-header">Welcome to ToDo App!</h1>
      <p className="description">
        Manage your tasks efficiently with our easy-to-use interface. 
        Keep track of your daily to-dos, set reminders, and accomplish more.
      </p>
    </div>
  );
}

export default Home;
