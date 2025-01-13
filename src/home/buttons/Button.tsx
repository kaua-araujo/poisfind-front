import React from 'react';
import './Button.css';

interface ButtonProps {
    nome: string;    
    classe?: string;   
  }
  
  export default function Button({ nome, classe }: ButtonProps) {
    return (
      <button className={`button ${classe}`} role="button">
        {nome}
      </button>
    );
  }