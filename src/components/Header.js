import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="church-header">
      <div className="header-content">
        <div className="church-logo">
          <div className="cross-icon">✝</div>
          <h1>Ridgeways Pentecostal Church</h1>
        </div>
        <p className="church-tagline">"Where Prayer Changes Everything"</p>
      </div>
    </header>
  );
};

export default Header;