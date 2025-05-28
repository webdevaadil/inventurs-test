import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
const Login = () => {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const navigate = useNavigate()
    
    const handledata = async (e) => {
        e.preventDefault();
        setError('');
        // Dummy login logic
        if (username === 'user' && password === 'password') {
            navigate('/');
        } else {
            setError('Invalid username or password.');
        }
        alert("Login successfully")


    }


return (
  <div className="container py-4 d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-sm p-4 w-100" style={{ maxWidth: '400px' }}>
        <h2 className="card-title text-center mb-4 h4 text-dark">Login</h2>
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handledata}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              placeholder="user"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="password"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-muted mt-4 small">
          Use username: <span className="fw-bold">user</span> and password: <span className="fw-bold">password</span>
        </p>
      </div>
    </div>
)
}

export default Login
