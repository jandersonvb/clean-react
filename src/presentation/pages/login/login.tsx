import React from 'react'

import Styles from './login-styles.scss'

export const Login: React.FC = () => {
  console.log('Login sendo renderizado')

  return (
    <div className={Styles.login}>
      <h2>Login</h2>
    </div>
  )
}
