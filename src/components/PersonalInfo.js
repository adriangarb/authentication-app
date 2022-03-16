import { useAuth} from '../context/authContext'
import Header from './Header'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import {db} from '../firebase'
function PersonalInfo () {
    const {loading,user} = useAuth()
    const [data,setData] = useState([])
    useEffect(()=>{
        async function loadData(){
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setData(docSnap.data())
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
    const [loadingData,setLoadingData] = useState(true)
    if(loading && loadingData) return <h1>Loading</h1>
    const handleNavigate = () =>{
        navigate('/changeinfo')
    }
    
    return (
    <>
    <Header/>
    <div className="App__personalInfo">
        <h2>Personal Info</h2>
        <h4>Basic info, like your name and photo</h4>
        <div className="App__personalInfo__card">
            <div className="App__personalInfo__card__header">
                <div>
                    <h3>Profile</h3>
                    <p>Some info may be visible to other people</p>
                </div>
                <button onClick={handleNavigate}>Edit</button>
            </div>
            <table>
                <tr>
                    <td><span>PHOTO</span></td>
                    <td><img src="https://www.fundaciocaixaltea.com/wp-content/uploads/2018/01/default-profile.png" alt="" /></td>
                </tr>
                <tr>
                    <td><span>NAME</span></td>
                    <td><p>{data.name}</p></td>
                </tr>
                <tr>
                    <td><span>BIO</span></td>
                    <td><p>{data.bio}</p></td>
                </tr>
                <tr>
                    <td><span>PHONE</span></td>
                    <td><p>{data.phone}</p></td>
                </tr>
                <tr>
                    <td><span>EMAIL</span></td>
                    <td><p>{data.email}</p></td>
                </tr>
                <tr>
                    <td><span>PASSWORD</span></td>
                    <td><p>{data.password && data.password.split('').map(p=> '*').join('')}</p></td>
                </tr>
            </table>
        </div>
    </div>
    </>
    
  )
}

export default PersonalInfo