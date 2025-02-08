import logo from './logo.png';
import {GoogleLogin} from '@react-oauth/google';
import CustomCalendar from './CustomCalendar';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';


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
              const decoded = jwtDecode(credentialResponse.credential); // Decode the token

              console.log("First Name:", decoded.given_name);
              console.log("Last Name:", decoded.family_name);
              console.log("Email:", decoded.email);

              Cookies.set("first_name", decoded.given_name, { expires: 7 });
              Cookies.set("last_name", decoded.family_name, { expires: 7 });
              Cookies.set("email", decoded.email, { expires: 7 });
  
              console.log("User details stored in cookies!");

            } }
            onError={() => {
              console.log("Google Login Failed.");
            }}
          />
        </header>
      </div>
    )
}

export default Home;