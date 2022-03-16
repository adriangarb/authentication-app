import { useState,useEffect } from 'react'
import {updateDoc,doc, getDoc} from 'firebase/firestore'
import {db,storage} from '../firebase'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
function ChangeInfo() {
  const {user} = useAuth()
  
  const [data,setData] = useState({})
  const [image,setImage] = useState(data.photo ? data.photo : null)
  const [loadingData,setLoadingData] = useState(true)
    useEffect(()=>{
        async function loadData(){
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setImage(docSnap.data().photo)
            } else {
                console.error('no data found')
            }   
            setLoadingData(false)
        }
        loadData()
        
    },[])
  const navigate = useNavigate()
  if(loadingData) return <h1>Loading</h1>  
  const handleInputChange = ({target: {name,value}}) =>{
    setData({...data, [name]: value})
  }
  const handleUploadData = async(e) =>{
    const file = e.target[0].files[0]
    handlePhoto(file)
    await updateDoc(doc(db, "users", user.uid), data);
    navigate('/personalinfo')
  }
  const handleGoBack = () => {
    navigate('/personalinfo')
  }
  const handlePhoto = (file) =>{
    if(!file) return;
    const storageRef = ref(storage,`files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef,file)
    uploadTask.on('state_changed',(snapshot)=>{
      const prog = Math.round(
        (snapshot.bytesTransferred/snapshot.totalBytes) *100
      )
    },
    (err)=> console.log(err),
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then(url=>{setData({...data, photo: url});console.log(url)})
    }
    )
  }
  return (
    <>
    <Header/>
    <div className='App__changeInfo'>
        <button onClick={handleGoBack}><i className="far fa fa-angle-left"></i>Back</button>
        <form onSubmit={handleUploadData} className='App__changeInfo__card'>
            <h2>Change Info</h2>
            <p>Changes will be reflected to every services</p>
            <div>
                <div className="App__changeInfo__card__imageProfile">
                  <input type="file" alt="" accept=".png, .jpg, .jpeg"/>
                  <img src={image} alt="" />
                </div>
                
                <p>CHANGE PHOTO</p>
            </div>
            <span>Name</span>
            <input onChange={handleInputChange}  placeholder='Enter your name...'name="name" type="text" />
            <span>Bio</span>
            <textarea onChange={handleInputChange} id="bio" cols="30" rows="10" name="bio" placeholder="Enter your bio..."></textarea>
            <span>Phone</span>
            <input onChange={handleInputChange} placeholder='Enter your phone...' name="phone" type="tel" />
            <button onClick={handleUploadData}>Save</button>
        </form>
    </div>
    </>
    
  )
}

export default ChangeInfo