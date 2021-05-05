// src/Title.js
import { isObject } from 'lodash';
import React from 'react'
import './Title.css';
import logo from './header-img.png';

function Title() {
  return (
      <img
      src={logo}
      className='Logo'
      height="100px" 
      witdh="100px"
      />

  )
}

export default Title