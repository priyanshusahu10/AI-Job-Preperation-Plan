import React, { useState } from 'react'
import { useNavigate, Link } from "react-router"
import "./Login.css"
import { useAuth } from "../Hooks/useAuth"
import Loading from "./Loading/Loading.jsx"

const Login = () => {

  const { loading, handleLogin } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setError(false)
      await handleLogin({ email, password })
      navigate('/generate-report')
    } catch (err) {

    }
  }


  if (loading) {
    return (
      <>
        <Loading />
      </>
    )
  }

  return (
    <div className="login-page">


      {/* Logo */}

      <div className="logo">

        <div className="logo-icon">
          ✣
        </div>

        <h2>
          Prep<span>AI</span>
        </h2>

      </div>




      {/* Login Card */}

      <div className="login-card">


        <h1>
          Welcome back
        </h1>


        <p className="subtitle">
          Sign in to continue your preparation
        </p>



        <form>


          <label>
            Email address
          </label>


          <input
            onChange={(e) => { setEmail(e.target.value) }}
            type="email"
            placeholder="example@example.com"
          />



          <label>
            Password
          </label>



          <div className="password-box">


            <input
              onChange={(e) => { setPassword(e.target.value) }}
              type="password"

              placeholder="Enter your password"

            />



          </div>


          <button className='login-button' onClick={handleSubmit}>
            Sign In →
          </button>



        </form>



      </div>

      <div className="signup-link">

        Don't have an account?

        <span>
          <Link to={'/register'}>
            Create account
          </Link>
        </span>

      </div>



    </div>

  );
};


export default Login