import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a href = "Login.js">
          login page
        </a>
      </header>
    </div>
  );
}

function Login() {
  return (
    <div className="login-container">
    <h2>Login</h2>
    <form action="login.php" method="POST">
      <div class="input-group">
        <label for="username">Username / Email</label>
        <input type="text" id="username" name="username" placeholder="Enter your username or email" required></input>
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" required></input>
      </div>

      <div class="input-group">
        <button type="submit">Login</button>
      </div>
      
      <div class="forgot-password">
        <a href="#">Forgot your password?</a>
      </div>
      
      <div class="signup-link">
        <p>Don't have an account? <a href="signup.html">Sign up here</a></p>
      </div>
    </form>
  </div>


  );
}

export default App;
