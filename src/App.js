import logo from './logo.svg';
import './App.css';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId='649908937531-5hbia6mool2c4kjurd7q150p5n06vc1p.apps.googleusercontent.com'>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>

          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            } }
            onError={() => {
              console.log("didn't work");
            }}
          />
        </header>
      </div>
    </GoogleOAuthProvider>
  );
}



export default App;
