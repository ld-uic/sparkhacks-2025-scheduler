import logo from './logo.png';
import {GoogleLogin} from '@react-oauth/google';
import CustomCalendar from './CustomCalendar';

function Home()
{
    return (
        <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="schedule"
            target="_blank"
            rel="noopener noreferrer"
          >
              No redirect? Click here!
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
    )
}

export default Home;