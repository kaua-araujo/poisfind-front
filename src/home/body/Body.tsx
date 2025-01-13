import React from 'react';
import './Body.css';

interface BodyProps {
    title: string
    x: number
    y: number
  }
  
  export default function Button({ title, x, y}: BodyProps) {
    return (
        <div className='cards'>
            <div className="card shadow">
                <div className="titleCard">
                    <h1>{title}</h1>
                </div>
                <div className="positions">
                    <p>Posição X: {x}</p>
                    <p>Posição Y: {y}</p>
                </div>
            </div>
        </div>
    );
  }