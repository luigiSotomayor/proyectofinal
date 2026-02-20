import React from 'react'
import "../styles/Button.css";

const Button = ({ text, onClick, type }) => {
  return (
    <button type={type} onClick={onClick} className='button'>{text}</button>
  )
}

export default Button