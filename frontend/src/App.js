import logo from './logo.svg';
import './App.css';
import { Routes, Route} from "react-router-dom";
import Home from './components/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import EditForm from './pages/EditForm';
import DeleteForm from './pages/DeleteForm';
import Pdf from './pages/Pdf';
import Loginex from './pages/Loginex';
import StudentRegister from './pages/StudentRegister';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/addstudent" element={<AddStudent/>}/>
        <Route path="/editform/:id" element={<EditForm/>}/>
        <Route path="/deleteform" element={<DeleteForm/>}/>
        <Route path="/Pdf" element={<Pdf/>}/>
        <Route path="/loginex" element={<Loginex/>}/>
        <Route path="/studentlogin" element={<StudentRegister/>}/>
      </Routes>
     
    </div>
  );
}

export default App;
