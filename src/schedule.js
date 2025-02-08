import logo from './logo.svg';
import {GoogleLogin} from '@react-oauth/google';
import CustomCalendar from './CustomCalendar';

function Home()
{
    return (
        <div className="App">
        <header className="App-header">
          <CustomCalendar />
        </header>
      </div>
    )
}

export default Home;