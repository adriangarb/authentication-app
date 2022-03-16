import Register from './components/Register'
import Login from './components/Login'
import PersonalInfo from './components/PersonalInfo'
import ChangeInfo from './components/ChangeInfo'
import PrivateRoute from './components/PrivateRoute'
import './index.scss'
import {
  Routes,
  Route
} from "react-router-dom";
import {AuthProvider} from './context/authContext'
function App() {
  return (
      <div className="App"> 
        <AuthProvider>
          <Routes>
            <Route exact path='/' element={<Register/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/personalinfo' element={<PrivateRoute><PersonalInfo/></PrivateRoute>}/>
            <Route exact path='/changeinfo' element={<PrivateRoute><ChangeInfo/></PrivateRoute>}/>
          </Routes>
        </AuthProvider> 
      </div>
  );
}

export default App;
