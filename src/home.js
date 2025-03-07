import logo from "./logo.png";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user data exists in cookies on page load
  useEffect(() => {
    const storedFirstName = Cookies.get("first_name");
    const storedEmail = Cookies.get("email");

    if (storedFirstName && storedEmail) {
      setIsLoggedIn(true);
      setUser({ firstName: storedFirstName, email: storedEmail });
    }
  }, []);

  // Handle Google Login success
  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("User Info:", decoded);

    // Store user info in cookies
    Cookies.set("first_name", decoded.given_name, { expires: 7 });
    Cookies.set("last_name", decoded.family_name, { expires: 7 });
    Cookies.set("email", decoded.email, { expires: 7 });

    // Update state
    setUser({ firstName: decoded.given_name, email: decoded.email });
    setIsLoggedIn(true);
  };

  // Handle Logout
  const handleLogout = () => {
    // Clear cookies
    Cookies.remove("first_name");
    Cookies.remove("last_name");
    Cookies.remove("email");

    // Reset state
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <br />Have you ever experienced trouble with your business scheduler?  😒
          <br />Despite it being well designed, when it comes to the user experience,
          <br />you have to jump through several hoops just to find your schedule. 🥲😱
          <br /><br />So we decided to fix that. 👌
          <br />With "Whale of a Time", we offer a simple, minimalist design to access your schedule,
          <br />as well as additional features that businesses, 😊
          <br />from big and small, would be able to utilize. 😮😆
        </p>

        {isLoggedIn ? (
          <div>
            <h3>Welcome, {user.firstName}!</h3>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log("Login failed")} />
        )}

        <a className="App-link" href="schedule" target="_blank" rel="noopener noreferrer">
          Go to schedule!
        </a>
      </header>
    </div>
  );
}

export default Home;
