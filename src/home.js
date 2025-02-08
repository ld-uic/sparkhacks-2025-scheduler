import logo from './logo.svg';
import {GoogleLogin} from '@react-oauth/google';
import CustomCalendar from './CustomCalendar';

function Home()
{
    return (
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

          <CustomCalendar />
        </header>
      </div>
    )
}

export default Home;