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
      height="130px" 
      witdh="130px"
      />

  )
}

export default Title