import React from 'react'
import devChallengesLogo from '../assets/devchallenges.svg'
import githubLogo from '../assets/Gihub.svg'
import twitterLogo from '../assets/Twitter.svg'
import googleLogo from '../assets/Google.svg'
import facebookLogo from '../assets/Facebook.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
function Login () {
  const [user,setUser] = useState({
    email:'',
    password:''
  })
  const handleInputChange = ({target: {name,value}}) =>{
    setUser({...user, [name]: value})
  }
  const {login} = useAuth()
  const navigate = useNavigate()
  const userLogin = async(event) =>{
    event.preventDefault();
    try {
      await login(user.email,user.password)
      navigate('/personalinfo')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <div className='App__register'>
          <div className="App__register__card">
              <img src={devChallengesLogo} alt=""/>
              <h3>Login</h3>
              <form onSubmit={userLogin}>
                <label>
                <i className="fa-solid fa fa-envelope"></i>
                  <input onChange={handleInputChange} type="email" name="email" placeholder="Email"/>
                </label>
                <label>
                <i className="fa-solid fa fa-lock"></i>
                  <input onChange={handleInputChange} type="password" name="password" placeholder="******"/>
                </label>
                <button>Login</button>
              </form>
              
              <span>or continue with these social profile</span>
              <div className='App__register__card__links'>
                  <img src={googleLogo} alt="" />
                  <img src={facebookLogo} alt="" />
                  <img src={twitterLogo} alt="" />
                  <img src={githubLogo} alt="" />
              </div>
              <span>Don’t have an account yet? <a href="/">Register</a></span>
          </div>
      </div>
    </>
    
  )
}

export default Login