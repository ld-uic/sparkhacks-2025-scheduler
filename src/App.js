import logo from './logo.png';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login';
import Home from './home';
import Schedule from './schedule';


function App() {
  return (
    <GoogleOAuthProvider clientId='649908937531-5hbia6mool2c4kjurd7q150p5n06vc1p.apps.googleusercontent.com'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/schedule" element={<Schedule/>} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}



export default App;
