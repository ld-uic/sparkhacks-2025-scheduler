import logo from './logo.svg';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login';
import Home from './home';


function App() {
  return (
    <GoogleOAuthProvider clientId='649908937531-5hbia6mool2c4kjurd7q150p5n06vc1p.apps.googleusercontent.com'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}



export default App;
