import React from 'react'
import logo from './logo.png';
import logoSlogan from './logoSlogan.png';

function Logo({width = '100px', idf= 'head',}) {
  if (idf=="head") {
    return (
      <img width={width} src={logo} alt="Logo" />
    )
  } else if (idf=="foot") {
    return (
      <img width={width} src={logoSlogan} alt="Logo" />
    )
  }
}

export default Logo