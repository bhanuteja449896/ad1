import React from 'react'

const LoginPage = () => {
  return (
    <div className="main">
        <div className="login-page">
            <div className="form">
                <form className="login-form">
                    <input type="text" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <button>login</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default LoginPage
