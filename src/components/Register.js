import devChallengesLogo from '../assets/devchallenges.svg'
import githubLogo from '../assets/Gihub.svg'
import twitterLogo from '../assets/Twitter.svg'
import googleLogo from '../assets/Google.svg'
import facebookLogo from '../assets/Facebook.svg'
import {useState} from 'react'
import {useAuth} from '../context/authContext'
import {useNavigate} from 'react-router-dom'
import { doc, setDoc } from "firebase/firestore";
import {db} from '../firebase'

function Register() {
  const imageDefault = 'https://www.fundaciocaixaltea.com/wp-content/uploads/2018/01/default-profile.png'
  const [userInfo,setUser] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const {signup} = useAuth()
  const userRegister = async(event) =>{
    event.preventDefault();
    const data = {
      email: userInfo.email,
      photo: imageDefault,
      bio: '',
      phone:'',
      name: ''
    }
    try {
      await signup(userInfo.email,userInfo.password).then(userCredentials => setDoc(doc(db, "users", userCredentials.user.uid), data))
      navigate('/personalinfo')
    } catch (error) {
      console.error(error)
    }
  }
  const handleInputChange = ({target: {name,value}}) =>{
    setUser({...userInfo, [name]: value})
  }
  return (
    <>
    <div className='App__register'>
        <div className="App__register__card">
            <img src={devChallengesLogo} alt=""/>
            <h3>Join thousands of learners from around the world</h3>
            <p>Master web development by making real-life projects. There are multiple paths for you to choose</p>
            <form onSubmit={userRegister}>
              <label>
              <i className="fa-solid fa fa-envelope"></i>
                <input onChange={handleInputChange} type="email" name="email" placeholder="Email"/>
              </label>
              <label>
              <i className="fa-solid fa fa-lock"></i>
                <input onChange={handleInputChange} name="password" type="password" placeholder="******"/>
              </label>
              <button>Start coding</button>
            </form>
            <span>or continue with these social profile</span>
            <div className='App__register__card__links'>
                <img src={googleLogo} alt="" />
                <img src={facebookLogo} alt="" />
                <img src={twitterLogo} alt="" />
                <img src={githubLogo} alt="" />
            </div>
            <span>Already a member? <a href="/login">Login</a></span>
        </div>
    </div>
    </>
  )
}

export default Register