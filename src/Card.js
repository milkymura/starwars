import React, { Component } from 'react';
import './Card.css';

function Card({ name, image , birth_year, homeworld }) {
  return (
    <div className='card'>
      <div className='card-content'>
          <div className='card-name'>{name}</div>
          <img src={`http://localhost:3008/${image}`} alt='profile'/>
          <p>
              <span>Birthday:</span>
              <span>{ birth_year }</span>
          </p>
          <p>
              {/* Note that in order to get the homeworld's name, you have to get the planet name from a different endpoint than the people */}
              <span>Homeworld:</span>
              <span>{homeworld}</span>
          </p>
      </div>
    </div>
  )
}

export default Card;
