import devChallengesLogo from '../assets/devchallenges.svg'
import profilePic from '../assets/profile-pic.jpeg'
import {useState,useEffect} from 'react'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import {db} from '../firebase'
import {updateDoc,doc, getDoc} from 'firebase/firestore'

function Header() {
    const [isDropdownVissible, setIsDropdownVissible] = useState(false)
    const [image,setImage] = useState([])
    const [loadingData,setLoadingData] = useState(true)
    useEffect(()=>{
        async function loadData(){
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setImage(docSnap.data().photo)
                //console.log("Document data:", docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.error('no data found')
            }   
            setLoadingData(false)
        }
        loadData()
        
    },[])
    const navigate = useNavigate()
    const handleDropdown = ()=>{
        setIsDropdownVissible(!isDropdownVissible)
    }
    const {logout,user} = useAuth()

    const handleLogout = async() =>{
        await logout()
    }
    const handleGoProfile = () =>{
        navigate('/personalinfo')
    }
    if(loadingData) return <h1>Loading</h1>
    
    return (
        <div className="App__header">
            <img src={devChallengesLogo} alt="" />
            <div className='App__header__profile'>
                <div onClick={handleDropdown} className='App__header__profile__info'>
                    <img src={image} alt="" />
                    <span>Xanthe Neal</span>
                    <i className="fa-solid fa fa-caret-down"></i>
                </div>
                <div className={isDropdownVissible ? 'App__header__profile__dropdown__visible' : 'App__header__profile__dropdown'}>
                    <p onClick={handleGoProfile}><i className="fas fa-user-circle"/>My Profile</p>
                    <p><i className="fas fa-user-friends"></i>Group Chat</p>
                    <p onClick={handleLogout}><i className="fas fa-sign-out-alt"></i>Logout</p>
                </div>
            </div>
        </div>
  )
}

export default Header