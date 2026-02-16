import React from 'react';
import {useNavigate} from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/');
    };

  return (
    <header className="header">
      <h1 onClick={navigateToHome}>Stenella Club de Fútbol</h1>
    </header>
  )
}

export default Header